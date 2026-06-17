using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace WebServer;

public class SmtpContactEmailSender(ContactEmailOptions options, ILogger<SmtpContactEmailSender> logger)
    : IContactEmailSender
{
    private readonly ContactEmailOptions _options = options;
    private readonly ILogger<SmtpContactEmailSender> _logger = logger;

    public async Task SendContactEmailsAsync(string name, string email, string message)
    {
        using var client = new SmtpClient();
        await client.ConnectAsync(_options.SmtpHost, _options.SmtpPort, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_options.Username, _options.Password);

        try
        {
            await SendNotificationAsync(client, name, email, message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact notification email to {ToAddress}", _options.ToAddress);
        }

        try
        {
            await SendAutoReplyAsync(client, name, email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact auto-reply email to {SubmitterEmail}", email);
        }

        await client.DisconnectAsync(true);
    }

    private async Task SendNotificationAsync(
        SmtpClient client,
        string name,
        string email,
        string message)
    {
        var (subject, body) = ContactEmailContent.BuildNotification(name, email, message);
        var mimeMessage = new MimeMessage();
        mimeMessage.From.Add(MailboxAddress.Parse(_options.FromAddress));
        mimeMessage.To.Add(MailboxAddress.Parse(_options.ToAddress));
        mimeMessage.ReplyTo.Add(new MailboxAddress(name, email));
        mimeMessage.Subject = subject;
        mimeMessage.Body = new TextPart("plain") { Text = body };

        await client.SendAsync(mimeMessage);
    }

    private async Task SendAutoReplyAsync(SmtpClient client, string name, string email)
    {
        var (subject, body) = ContactEmailContent.BuildAutoReply(name);
        var mimeMessage = new MimeMessage();
        mimeMessage.From.Add(MailboxAddress.Parse(_options.FromAddress));
        mimeMessage.To.Add(MailboxAddress.Parse(email));
        mimeMessage.Subject = subject;
        mimeMessage.Body = new TextPart("plain") { Text = body };

        await client.SendAsync(mimeMessage);
    }
}
