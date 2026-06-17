namespace WebServer;

public interface IContactEmailSender
{
    Task SendContactEmailsAsync(string name, string email, string message);
}
