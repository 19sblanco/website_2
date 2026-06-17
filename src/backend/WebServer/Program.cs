using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebServer;
using WebServer.Entities;

// create the builder
var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseMySql(
        connectionString,
        new MySqlServerVersion(new Version(8, 0, 33))
    )
);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<IWeather, Weather>();

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

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.MapControllers();

if (builder.Configuration.GetValue<bool>("MigrateDatabase"))
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<MyDbContext>();
    context.Database.Migrate();
}

app.Run();
