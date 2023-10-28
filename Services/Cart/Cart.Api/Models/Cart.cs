using System.ComponentModel.DataAnnotations;

namespace cart.Models
{

  public class Cart
  {
    [Key]
    public int ClientId { get; set; }
    public decimal TotalPrice { get; set; }
    public List<CartItem> Items { get; set; }
  }
}