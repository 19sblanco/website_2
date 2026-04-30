using System.Text.Json;

namespace WebServer.Tests
{
    public class WeatherTests
    {
        [Fact]
        public void WeatherForcast_EachForecastHasExpectedProperties()
        {
            var weather = new Weather();

            var result = weather.WeatherForcast();
            var doc = JsonDocument.Parse(result);

            foreach (var element in doc.RootElement.EnumerateArray())
            {
                Assert.True(element.TryGetProperty("Date", out _));
                Assert.True(element.TryGetProperty("TemperatureC", out _));
                Assert.True(element.TryGetProperty("Summary", out _));
                Assert.True(element.TryGetProperty("TemperatureF", out _));
            }
        }
    }
}
