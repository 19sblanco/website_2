using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebServer;
using WebServer.Entities;

// create the builder
var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<MyDbContext>(options =>
{
    if (builder.Environment.IsEnvironment("Testing"))
    {
        options.UseInMemoryDatabase("WebServerTests");
    }
    else
    {
        options.UseMySql(
            connectionString,
            new MySqlServerVersion(new Version(8, 0, 33)));
    }
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.Configure<ContactEmailOptions>(
    builder.Configuration.GetSection("ContactEmail"));
builder.Services.AddSingleton<IContactEmailSender>(sp =>
{
    var opts = sp.GetRequiredService<IOptions<ContactEmailOptions>>().Value;
    var loggerFactory = sp.GetRequiredService<ILoggerFactory>();
    return string.IsNullOrWhiteSpace(opts.Password)
        ? new LoggingContactEmailSender(loggerFactory.CreateLogger<LoggingContactEmailSender>())
        : new SmtpContactEmailSender(opts, loggerFactory.CreateLogger<SmtpContactEmailSender>());
});

builder.Services.AddControllers();

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.OnRejected = async (context, cancellationToken) =>
    {
        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
        {
            context.HttpContext.Response.Headers.RetryAfter =
                ((int)retryAfter.TotalSeconds).ToString();
        }

        await context.HttpContext.Response.WriteAsync(
            "Too many requests. Please try again later.",
            cancellationToken);
    };

    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString()
                ?? httpContext.Request.Headers.Host.ToString(),
            factory: _ => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 10,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0,
            }));
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();

app.UseRateLimiter();

app.MapGet("/health", () => Results.Ok()).DisableRateLimiting();

app.MapControllers();

if (builder.Configuration.GetValue<bool>("MigrateDatabase"))
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<MyDbContext>();
    context.Database.Migrate();
}

app.Run();

public partial class Program;
