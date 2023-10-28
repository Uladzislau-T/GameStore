using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace cart.Models
{
  public class CartItem
  {
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public string PictureUrl { get; set; }

    [JsonIgnore]
    public int CartId { get; set; }
    [JsonIgnore]
    public Cart? Cart { get; set; }

  //   public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
  //   {
  //       var results = new List<ValidationResult>();

  //       if (Quantity < 1)
  //       {
  //           results.Add(new ValidationResult("Invalid number of units", new[] { "Quantity" }));
  //       }

  //       return results;
  //   }
  }
}