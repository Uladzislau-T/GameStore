#nullable disable
using Microsoft.EntityFrameworkCore;
using cart.Models;

namespace cart.Data
{
    public static class PrepDb
    {
        public static void PrepPopulation(IApplicationBuilder app, bool isProd)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            SeedData(serviceScope.ServiceProvider.GetService<Context>(), isProd);
        }

        private static void SeedData(Context context, bool isProd)
        {
            if (isProd)
            {
                Console.WriteLine("--> Attempting to apply migrations...");
                try
                {
                    context.Database.Migrate();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"--> Could not run migrations: {ex.Message}");
                }
            }

            if (!context.Cart.Any())
            {
                Console.WriteLine("Creating dummy Data");

                context.Cart.Add(
                    new Cart() { 
                      BuyerId = 1, 
                      Items = new List<CartItem>() {
                        new CartItem() {
                          Id = 1,
                          ProductId = 1,
                          ProductName = "Gothic",
                          UnitPrice = 7.50m,
                          Quantity = 1,
                          PictureUrl = ""
                        }
                      }}
                );

                context.SaveChanges();
            }
            else
            {
                Console.WriteLine("DbData already exists");
            }
        }
    }
}