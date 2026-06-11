namespace WebServer.Entities;

public class EventLogs
{
    public int Id { get; set; }

    public int EventId { get; set; }

    /// <summary>
    /// Optional context for an event — e.g. project slug when Event is "clicked_project".
    /// </summary>
    public string? Detail { get; set; }

    public int? TrafficId { get; set; }

    public DateTime CreatedAt { get; set; }

    public Events Event { get; set; } = null!;

    public TrafficLogs? Traffic { get; set; }
}