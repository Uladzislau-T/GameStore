namespace cart.Models
{

  public class Cart
  {
    public int Id { get; set; }
    public int BuyerId { get; set; }

    public List<CartItem> Items { get; set; }

    public Cart()
    {

    }

    public Cart(int customerId)
    {
        BuyerId = customerId;
    }
  }
}