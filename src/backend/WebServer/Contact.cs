namespace WebServer;

/// <summary>
/// Starter entity mapped to the contacts table. Rename properties, add columns,
/// or duplicate this file as a template for event_logs and traffic_logs.
/// </summary>
public class Contact
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    // FK to traffic_logs.id — add a TrafficLog navigation property when that entity exists.
    public int? TrafficId { get; set; }

    public DateTime CreatedAt { get; set; }
}
