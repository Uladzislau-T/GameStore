namespace cart.Models{

  public interface ICartRepository
  {
    Task<IEnumerable<Cart>> GetAllCartAsync();
    Task<Cart> GetCartBySessionIdAsync(string session);
    Task<Cart> GetCartByClientIdAsync(int clientId);
    Task<Cart> UpdateCartAsync(Cart cart);
    Task<bool> DeleteCartAsync(string id);
  }
}