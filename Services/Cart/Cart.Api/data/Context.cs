using cart.Models;
using Microsoft.EntityFrameworkCore;

namespace cart.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        public DbSet<CartItem> CartItem { get; set; }
        public DbSet<Cart> Cart { get; set; }
    }    
}
