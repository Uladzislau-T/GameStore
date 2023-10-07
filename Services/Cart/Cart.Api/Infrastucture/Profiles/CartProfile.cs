using AutoMapper;
using cart.Models;

namespace cart.Infrastructure.Profiles
{
    public class CartMapping : Profile
    {
        public CartMapping()
        {            
            CreateMap<Cart, GrpcCartModel>();
        }
    }
}