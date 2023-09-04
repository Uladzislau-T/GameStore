

using catalog.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

class CatalogBrandEntityTypeConfiguration: IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        // builder.ToTable("CatalogBrand");

        // builder.HasKey(ci => ci.Id);

        // builder.Property(ci => ci.Id)
        //     .UseHiLo("catalog_brand_hilo")
        //     .IsRequired();

        // builder.Property(cb => cb.Brand)
        //     .IsRequired()
        //     .HasMaxLength(100);


        builder
        .HasMany(c => c.Genres)
        .WithMany(s => s.Products)
        .UsingEntity(j => j.ToTable("product_genres"));

        builder
        .HasMany(c => c.Features)
        .WithMany(s => s.Products)
        .UsingEntity(j => j.ToTable("product_features"));

        builder
        .HasMany(c => c.Platforms)
        .WithMany(s => s.Products)
        .UsingEntity(j => j.ToTable("product_platforms"));


    }
}