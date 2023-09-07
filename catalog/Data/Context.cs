#nullable disable
using catalog.Extentions;
using catalog.Models;
using Microsoft.EntityFrameworkCore;

namespace catalog.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
            
        }

        public DbSet<Product> Product { get; set; }
        public DbSet<Genre> Genre { get; set; }
        public DbSet<Feature> Feature { get; set; }
        public DbSet<Platform> Platform { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
                builder.ApplyConfiguration(new CatalogBrandEntityTypeConfiguration());

                builder.UseSnakeCaseNames();        
        }    
    }
}
