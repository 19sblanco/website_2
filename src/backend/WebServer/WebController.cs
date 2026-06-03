using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            return Ok(result);
        }

        [HttpPost("contact")]
        public IActionResult PostContact(ContactRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest("Name, email, and message are required.");
            }

            // In a real application, this is where you'd save the message, send an email,
            // or forward it to your notification service.
            Console.WriteLine($"Contact request received from {request.Name} <{request.Email}>: {request.Message}");

            return Ok(new { message = "Contact request received." });
        }
    }
}
