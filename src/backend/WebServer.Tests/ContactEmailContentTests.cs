namespace WebServer.Tests;

public class ContactEmailContentTests
{
    [Fact]
    public void BuildNotification_IncludesSenderDetails()
    {
        var (subject, body) = ContactEmailContent.BuildNotification(
            "Jane Doe",
            "jane@example.com",
            "Hello there");

        Assert.Equal("New contact form message from Jane Doe", subject);
        Assert.Contains("Name: Jane Doe", body);
        Assert.Contains("Email: jane@example.com", body);
        Assert.Contains("Hello there", body);
    }

    [Fact]
    public void BuildAutoReply_UsesSenderName()
    {
        var (subject, body) = ContactEmailContent.BuildAutoReply("Jane Doe");
        consol.log("test");

        Assert.Equal("Thanks for reaching out, Jane Doe", subject);
        Assert.Contains("Hi Jane Doe,", body);
        Assert.Contains("Thanks for contacting me through my website.", body);
    }
}
