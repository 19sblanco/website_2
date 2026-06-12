using Microsoft.EntityFrameworkCore;

namespace WebServer.Entities;

public class MyDbContext(DbContextOptions<MyDbContext> options) : DbContext(options)
{
    public const int EventClickedResume = 1;
    public const int EventClickedProject = 2;
    public const int EventClickedCopyEmail = 3;

    public DbSet<Contact> Contacts => Set<Contact>();
    public DbSet<Events> Events => Set<Events>();
    public DbSet<EventLogs> EventLogs => Set<EventLogs>();
    public DbSet<TrafficLogs> TrafficLogs => Set<TrafficLogs>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>(entity =>
        {
            entity.ToTable("contacts");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.Message)
                .IsRequired();

            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime(6)")
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");

            entity.HasOne(e => e.Traffic)
                .WithMany(t => t.Contacts)
                .HasForeignKey(e => e.TrafficId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<TrafficLogs>(entity =>
        {
            entity.ToTable("traffic_logs");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.SessionId)
                .HasMaxLength(64)
                .IsRequired();

            entity.Property(e => e.UserAgent)
                .HasMaxLength(512)
                .IsRequired();

            entity.Property(e => e.Referer)
                .HasMaxLength(2048)
                .IsRequired();

            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime(6)")
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");
        });

        modelBuilder.Entity<Events>(entity =>
        {
            entity.ToTable("events");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Event)
                .HasMaxLength(64)
                .IsRequired();

            entity.HasIndex(e => e.Event)
                .IsUnique();

            entity.HasData(
                new Events { Id = EventClickedResume, Event = "clicked_resume" },
                new Events { Id = EventClickedProject, Event = "clicked_project" },
                new Events { Id = EventClickedCopyEmail, Event = "clicked_copy_email" }
            );
        });

        modelBuilder.Entity<EventLogs>(entity =>
        {
            entity.ToTable("event_logs");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Detail)
                .HasMaxLength(255);

            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime(6)")
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");

            entity.HasOne(e => e.Event)
                .WithMany(ev => ev.EventLogs)
                .HasForeignKey(e => e.EventId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Traffic)
                .WithMany(t => t.EventLogs)
                .HasForeignKey(e => e.TrafficId)
                .OnDelete(DeleteBehavior.SetNull);
        });
    }
}
