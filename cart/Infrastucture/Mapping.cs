using AutoMapper;
using cart;
using cart.Models;

namespace PlatformService.Profiles
{
    public class CartMapping : Profile
    {
        public CartMapping()
        {            
            CreateMap<Cart, GrpcCartModel>();
        }
    }
}