namespace WebServer;

public class LoggingContactEmailSender(ILogger<LoggingContactEmailSender> logger) : IContactEmailSender
{
    private readonly ILogger<LoggingContactEmailSender> _logger = logger;

    public Task SendContactEmailsAsync(string name, string email, string message)
    {
        var notification = ContactEmailContent.BuildNotification(name, email, message);
        var autoReply = ContactEmailContent.BuildAutoReply(name);

        _logger.LogInformation(
            "Contact email (notification) — Subject: {Subject}\n{Body}",
            notification.Subject,
            notification.Body);
        _logger.LogInformation(
            "Contact email (auto-reply to {Email}) — Subject: {Subject}\n{Body}",
            email,
            autoReply.Subject,
            autoReply.Body);

        return Task.CompletedTask;
    }
}
