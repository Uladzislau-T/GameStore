using AutoMapper;
using cart.Data;
using cart.Models;
using Grpc.Core;
using Microsoft.EntityFrameworkCore;

namespace cart.Connections.Grpc
{
  public class GrpcCartService : GrpcCart.GrpcCartBase
  {
    private readonly Context _context;
    private readonly IMapper _mapper;

    public GrpcCartService(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public override async Task<CartResponse> GetAllCarts(GetAllCartsRequest request, ServerCallContext context)
    {
      
        var response = new CartResponse();
        var carts = await _context.Cart.ToListAsync();

        foreach (var cart in carts)
        {          
          var grpcCart = new GrpcCartModel() {
            Id = cart.Id,
            BuyerId = cart.BuyerId,
          };

          grpcCart.Items.AddRange(ConvertToGrpcCartItem(cart.Items));

          // response.Carts.Add(_mapper.Map<GrpcCartModel>(cart));
          response.Carts.Add(grpcCart);
        }

        return response;
    }

    private List<GrpcCartItemModel> ConvertToGrpcCartItem(ICollection<CartItem> items)
    {
      decimal NanoFactor = 1_000_000_000;
      List<GrpcCartItemModel> grpcItems = new();

      foreach (var item in items)
      {
        var units = decimal.ToInt64(item.UnitPrice);

        grpcItems.Add(new GrpcCartItemModel() {
          Id = item.Id,
          ProductId = item.ProductId,
          ProductName = item.ProductName,
          UnitPrice = new DecimalValue() {Units = units, Nanos = decimal.ToInt32((item.UnitPrice - units) * NanoFactor)},
          Quantity = item.Quantity,
          PictureUrl = item.PictureUrl
        });
      }

      return grpcItems;
    }
  }
}