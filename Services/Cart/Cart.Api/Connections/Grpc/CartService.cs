using cart.Models;
using Grpc.Core;
using Services.Common;

namespace cart.Connections.Grpc
{
  public class CartService : GrpcCart.GrpcCartBase
  {
    private readonly ICartRepository _repository;    
    private readonly ILogger<CartService> _logger;

    public CartService(ICartRepository repository, ILogger<CartService> logger)
    {
      _repository = repository;
      _logger = logger;
    }

    public override async Task<GrpcCartsResponse> GetAllCarts(GrpcGetAllCartsRequest request, ServerCallContext context)
    {
      context.Status = new Status(StatusCode.OK, $"Basket with id do exist");
      var response = new GrpcCartsResponse();

      var carts = await _repository.GetAllCartAsync();

      foreach (var cart in carts)
      {          
        var units = decimal.ToInt64(cart.TotalPrice);

        var grpcCart = new GrpcCartModel() {
          ClientId = cart.ClientId,
          TotalPrice = new DecimalValue() {Units = units, Nanos = decimal.ToInt32((cart.TotalPrice - units) * CommonConsts.NanoFactor)}
        };

        grpcCart.Items.AddRange(ConvertToGrpcCartItem(cart.Items));
        response.Carts.Add(grpcCart);
      }
      return response;
    }

    public override async Task<GrpcCartResponse> GetCartByClient(GrpcGetCartRequest request, ServerCallContext context)
    {      
      var response = new GrpcCartResponse();
      var cart = await _repository.GetCartByClientIdAsync(request.Id);
      
      var units = decimal.ToInt64(cart.TotalPrice);

      var grpcCart = new GrpcCartModel() {
        ClientId = cart.ClientId,
        TotalPrice = new DecimalValue() {Units = units, Nanos = decimal.ToInt32((cart.TotalPrice - units) * CommonConsts.NanoFactor)},
      };

      grpcCart.Items.AddRange(ConvertToGrpcCartItem(cart.Items));
      
      response.Cart = grpcCart;

      return response;    
    }

    public override async Task<GrpcUpdateCartResponse> UpdateCart(GrpcUpdateCartRequest request, ServerCallContext context)
    {      
      var response = new GrpcUpdateCartResponse();

      var cart = new Cart() {
        ClientId = request.Cart.ClientId,
        TotalPrice = request.Cart.TotalPrice.Units + request.Cart.TotalPrice.Nanos / CommonConsts.NanoFactor,
        Items = new List<CartItem>()
      };
    
      var cartItems = ConvertToCartItem(request.Cart.Items);

      cart.Items.AddRange(cartItems);

      await _repository.UpdateCartAsync(cart);

      var units = decimal.ToInt64(cart.TotalPrice);
      var grpcCart = new GrpcCartModel() {
        ClientId = cart.ClientId,
        TotalPrice = new DecimalValue() {Units = units, Nanos = decimal.ToInt32((cart.TotalPrice - units) * CommonConsts.NanoFactor)},
      };

      grpcCart.Items.AddRange(ConvertToGrpcCartItem(cart.Items));
      
      response.Cart = grpcCart;

      return response;    
    }

    private List<GrpcCartItemModel> ConvertToGrpcCartItem(ICollection<CartItem> items)
    {
      List<GrpcCartItemModel> grpcItems = new();

      foreach (var item in items)
      {
        var units = decimal.ToInt64(item.UnitPrice);

        grpcItems.Add(new GrpcCartItemModel() {
          ProductId = item.ProductId,
          ProductName = item.ProductName,
          UnitPrice = new DecimalValue() {Units = units, Nanos = decimal.ToInt32((item.UnitPrice - units) * CommonConsts.NanoFactor)},
          Quantity = item.Quantity,
          PictureUrl = item.PictureUrl
        });
      }

      return grpcItems;
    }

    private List<CartItem> ConvertToCartItem(ICollection<GrpcCartItemModel> grpcItems)
    {
      List<CartItem> Items = new();

      foreach (var item in grpcItems)
      {
        Items.Add(new CartItem() {
          ProductId = item.ProductId,
          ProductName = item.ProductName,
          UnitPrice = item.UnitPrice.Units + item.UnitPrice.Nanos / CommonConsts.NanoFactor,
          Quantity = item.Quantity,
          PictureUrl = item.PictureUrl
        });
      }

      return Items;
    }
  }
}