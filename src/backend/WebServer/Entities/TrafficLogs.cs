namespace WebServer.Entities;

public class TrafficLogs
{
    public int Id { get; set; }

    public string SessionId { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public ICollection<EventLogs> EventLogs { get; set; } = [];

    public ICollection<Contact> Contacts { get; set; } = [];
}