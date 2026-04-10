using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebServer
{
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
        public IActionResult GetWeather() {
            string result = _weatherService.WeatherForcast();
            return Ok(result);
        }
    }
}
