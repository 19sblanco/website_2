namespace WebServer.Entities;

/// <summary>
/// Lookup table for trackable user actions. EventLogs references these rows.
/// </summary>
public class Events
{
    public int Id { get; set; }

    public string Event { get; set; } = string.Empty;

    public ICollection<EventLogs> EventLogs { get; set; } = [];
}