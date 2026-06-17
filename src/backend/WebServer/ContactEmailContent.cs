namespace WebServer;

public static class ContactEmailContent
{
    public static (string Subject, string Body) BuildNotification(
        string name,
        string email,
        string message) =>
    (
        Subject: $"New contact form message from {name}",
        Body: $"""
            Name: {name}
            Email: {email}

            Message:
            {message}
            """
    );

    public static (string Subject, string Body) BuildAutoReply(string name) =>
    (
        Subject: $"Thanks for reaching out, {name}",
        Body: $"""
            Hi {name},

            Thanks for contacting me through my website. I've received your message and will get back to you as soon as I can.

            — Steven Blanco
            """
    );
}
