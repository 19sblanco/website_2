using Microsoft.EntityFrameworkCore;

namespace WebServer;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {
    }
}
