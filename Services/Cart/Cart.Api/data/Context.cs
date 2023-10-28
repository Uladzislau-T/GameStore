using cart.Models;
using Microsoft.EntityFrameworkCore;

namespace cart.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
            // Database.EnsureDeleted();

            Database.EnsureCreated();
        }

        public DbSet<CartItem> CartItem { get; set; }
        public DbSet<Cart> Cart { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Cart>()
            .HasMany(c => c.Items)
            .WithOne(i => i.Cart)
            .HasForeignKey(i => i.CartId);
        }
    }    
}
