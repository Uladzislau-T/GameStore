
using AutoMapper;
using catalog.Models;
using catalog.Models.Dto;

namespace catalog.Profiles
{
  public class ProductProfile: Profile
  {
    public ProductProfile()
    {
      CreateMap<Product, ProductDto>();
        // .ForMember(m => m.Genres, opt => opt.MapFrom(src => src.))
      CreateMap<Genre, string>()
        .ConvertUsing(obj => obj.Name);
      CreateMap<Feature, string>()
        .ConvertUsing(obj => obj.Name);
      CreateMap<Platform, string>()
        .ConvertUsing(obj => obj.Name);
    }
  }
}