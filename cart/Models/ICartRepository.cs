namespace cart.Models{

  public interface ICartRepository
  {
    Task<Cart> GetCartAsync(string customerId);
    IEnumerable<string> GetUsers();
    Task<Cart> UpdateCArtAsync(Cart cart);
    Task<bool> DeleteCartAsync(string id);
  }
}