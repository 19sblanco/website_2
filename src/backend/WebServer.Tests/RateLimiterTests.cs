using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace WebServer.Tests;

public class RateLimiterTests(RateLimiterWebApplicationFactory factory) : IClassFixture<RateLimiterWebApplicationFactory>
{
    private readonly HttpClient _client = factory.CreateClient();

    [Fact]
    public async Task Visit_Returns429_AfterTenRequestsPerMinute()
    {
        var body = new { sessionId = "rate-limit-test" };

        for (var i = 0; i < 10; i++)
        {
            var response = await _client.PostAsJsonAsync("/api/web/visit", body);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        var limited = await _client.PostAsJsonAsync("/api/web/visit", body);
        Assert.Equal(HttpStatusCode.TooManyRequests, limited.StatusCode);
        Assert.True(limited.Headers.Contains("Retry-After"));

        var text = await limited.Content.ReadAsStringAsync();
        Assert.Contains("Too many requests", text);
    }
}

public class RateLimiterWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.UseSetting("MigrateDatabase", "false");
    }
}
