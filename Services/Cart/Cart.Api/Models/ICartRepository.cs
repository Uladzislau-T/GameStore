namespace cart.Models{

  public interface ICartRepository
  {
    Task<Cart> GetCartBySessionAsync(string session);
    Task<Cart> GetCartByClientAsync(int clientId);
    Task<Cart> UpdateCartAsync(Cart cart);
    Task<bool> DeleteCartAsync(string id);
  }
}