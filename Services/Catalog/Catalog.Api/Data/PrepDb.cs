using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using catalog.Models;
using catalog.Models.Dto;
using Microsoft.EntityFrameworkCore;

namespace catalog.Data
{
  class PrepDb
  {
    public static async void PrepPopulation(IApplicationBuilder app, bool isProd)
    {
      using var serviceScope = app.ApplicationServices.CreateScope();
      await SeedData(serviceScope.ServiceProvider.GetService<Context>(), isProd);
    }

    private static async Task SeedData(Context context, bool isProd)
    {      

      Console.WriteLine("Creating dummy Data");

      // if (isProd)
      // {
          Console.WriteLine("--> Attempting to apply migrations...");
          try
          {
              context.Database.Migrate();
          }
          catch (Exception ex)
          {
              Console.WriteLine($"--> Could not run migrations: {ex.Message}");
          }
      // }


      using FileStream fs = new FileStream("db.json", FileMode.Open);

      var options = new JsonSerializerOptions
      {
          PropertyNameCaseInsensitive = true
      };

      var categoriesData = await JsonSerializer.DeserializeAsync<CategoriesWrapper>(fs, options);

      if(!context.Genre.Any())
      {
        Console.WriteLine("Creating dummy Genres");

        foreach (var genre in categoriesData.Categories.Genres)
        {          
          await context.Genre.AddAsync(new Genre {
            Name = genre
          });
        }

        await context.SaveChangesAsync();
      }

      if(!context.Feature.Any())
      {
        Console.WriteLine("Creating dummy Features");

        foreach (var genre in categoriesData.Categories.Features)
        {          
          await context.Feature.AddAsync(new Feature {
            Name = genre
          });
        }

        await context.SaveChangesAsync();
      }

      if(!context.Platform.Any())
      {
        Console.WriteLine("Creating dummy Platforms");

        foreach (var genre in categoriesData.Categories.Platforms)
        {          
          await context.Platform.AddAsync(new Platform {
            Name = genre
          });
        }

        await context.SaveChangesAsync();
      }

      if (!context.Product.Any())
      {
        //moving the index for reading the file to the beginning
        fs.Position = 0;
        var productData = await JsonSerializer.DeserializeAsync<ProductDtoWrapper>(fs, options);        

        Console.WriteLine("Creating dummy Products");
        
        foreach (var data in productData.products)
        {
          var genres = await context.Genre.Where(g => data.Genres.Contains(g.Name)).ToListAsync();
          var features = await context.Feature.Where(g => data.Features.Contains(g.Name)).ToListAsync();
          var platforms = await context.Platform.Where(g => data.Platforms.Contains(g.Name)).ToListAsync();

          await context.Product.AddAsync(new Product {
            Title = data.Title,
            Author = data.Author,
            Description = data.Description,
            Price = data.Price,
            TimeCreated = data.TimeCreated,
            PreviewImage = data.PreviewImage,
            MainImage = data.MainImage,
            Genres = genres,
            Features = features,
            Platforms = platforms
          });
        }

        await context.SaveChangesAsync();
      }
      else
      {
        Console.WriteLine("DbData already exists");
      }
    }
  }
}