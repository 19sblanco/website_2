using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebServer.Entities;

namespace WebServer;

public class ContactRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}

public class VisitRequest
{
    public string SessionId { get; set; } = string.Empty;
}

public class EventRequest
{
    [JsonPropertyName("event")]
    public string? Event { get; set; }

    [JsonPropertyName("eventId")]
    public int? EventId { get; set; }

    [JsonPropertyName("detail")]
    public string? Detail { get; set; }
}

[Route("api/[controller]")]
[ApiController]
public class WebController(
    MyDbContext db,
    IContactEmailSender emailSender,
    ILogger<WebController> logger) : ControllerBase
{
    private readonly MyDbContext _db = db;
    private readonly IContactEmailSender _emailSender = emailSender;
    private readonly ILogger<WebController> _logger = logger;

    [HttpPost("visit")]
    public async Task<IActionResult> PostVisit([FromBody] VisitRequest request)
    {
        var sessionId = request.SessionId;
        if (string.IsNullOrWhiteSpace(sessionId))
        {
            sessionId = Request.Headers["X-Session-Id"].FirstOrDefault() ?? Guid.NewGuid().ToString();
        }

        if (sessionId.Length > 64)
        {
            sessionId = sessionId[..64];
        }

        var traffic = new TrafficLogs
        {
            SessionId = sessionId,
        };

        _db.TrafficLogs.Add(traffic);
        await _db.SaveChangesAsync();

        return Ok(new { trafficId = traffic.Id, sessionId });
    }

    [HttpPost("contact")]
    public async Task<IActionResult> PostContact(ContactRequest request)
    {
        if (request == null
            || string.IsNullOrWhiteSpace(request.Name)
            || string.IsNullOrWhiteSpace(request.Email)
            || string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest("Name, email, and message are required.");
        }

        var trafficId = await ResolveTrafficIdAsync();

        var contact = new Contact
        {
            Name = request.Name,
            Email = request.Email,
            Message = request.Message,
            TrafficId = trafficId,
        };

        _db.Contacts.Add(contact);
        await _db.SaveChangesAsync();

        try
        {
            await _emailSender.SendContactEmailsAsync(
                request.Name, request.Email, request.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact emails for {ContactId} {TrafficId}", contact.Id, trafficId);
        }

        return Ok(new { message = "Contact request received." });
    }

    [HttpPost("event")]
    public async Task<IActionResult> PostEvent([FromBody] EventRequest request)
    {
        if (request == null)
        {
            return BadRequest("Event name or event id is required.");
        }

        Events? evt = null;
        if (!string.IsNullOrWhiteSpace(request.Event))
        {
            evt = await _db.Events.FirstOrDefaultAsync(e => e.Event == request.Event);
            if (evt == null)
            {
                return NotFound(new { error = $"Unknown event: {request.Event}" });
            }
        }
        else if (request.EventId.HasValue)
        {
            evt = await _db.Events.FirstOrDefaultAsync(e => e.Id == request.EventId.Value);
            if (evt == null)
            {
                return NotFound(new { error = $"Unknown event id: {request.EventId}" });
            }
        }
        else
        {
            return BadRequest("Event name or event id is required.");
        }

        var trafficId = await ResolveTrafficIdAsync();

        var detail = request.Detail?.Trim();
        if (string.IsNullOrWhiteSpace(detail))
        {
            detail = null;
        }
        else if (detail.Length > 255)
        {
            detail = detail[..255];
        }

        var eventLog = new EventLogs
        {
            EventId = evt.Id,
            Detail = detail,
            TrafficId = trafficId,
        };

        _db.EventLogs.Add(eventLog);
        await _db.SaveChangesAsync();

        return Ok(new { eventLogId = eventLog.Id });
    }

    private async Task<int?> ResolveTrafficIdAsync()
    {
        if (Request.Headers.TryGetValue("X-Traffic-Id", out var trafficHeader)
            && int.TryParse(trafficHeader.FirstOrDefault(), out var trafficId))
        {
            return await _db.TrafficLogs.AnyAsync(t => t.Id == trafficId) ? trafficId : null;
        }

        var sessionId = Request.Headers["X-Session-Id"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(sessionId))
        {
            return null;
        }

        return await _db.TrafficLogs
            .Where(t => t.SessionId == sessionId)
            .OrderByDescending(t => t.Id)
            .Select(t => (int?)t.Id)
            .FirstOrDefaultAsync();
    }
}
