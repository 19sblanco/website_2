using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebServer.Entities;

namespace WebServer
{
    public class ContactRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }

    [Route("api/[controller]")]
    [ApiController]
    public class WebController : ControllerBase
    {
        private readonly IWeather _weatherService;

        public WebController(IWeather weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet("weatherforecast")]
        public IActionResult GetWeather()
        {
            string result = _weatherService.WeatherForcast();
            return Content(result, "application/json");
        }

        [HttpPost("contact")]
        public IActionResult PostContact(ContactRequest request)
        {
            if (request == null
                || string.IsNullOrWhiteSpace(request.Name)
                || string.IsNullOrWhiteSpace(request.Email)
                || string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest("Name, email, and message are required.");
            }

            var context = HttpContext.RequestServices.GetRequiredService<MyDbContext>();
            var contact = new WebServer.Entities.Contact
            {
                Name = request.Name,
                Email = request.Email,
                Message = request.Message,
                TrafficId = context.TrafficLogs.FirstOrDefault(t => t.SessionId == HttpContext.Session.Id)?.Id ?? null,
            };
            context.Contacts.Add(contact);
            context.SaveChanges();

            // In a real application, this is where you'd save the message, send an email,
            // or forward it to your notification service.
            Console.WriteLine($"Contact request received from {request.Name} <{request.Email}>: {request.Message}");

            return Ok(new { message = "Contact request received." });
        }
    }
}
