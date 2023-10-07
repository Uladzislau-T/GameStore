

using AutoMapper;
using catalog.Models;
using catalog.Models.Dto;

namespace catalog.Profiles
{
  public class CategoryProfile: Profile
  {
    public CategoryProfile()
    {
      CreateMap<ResponseCategoriesDto, GrpcCategoriesModel>();
      CreateMap<Genre, GrpcCategoryModel>();
      CreateMap<Feature, GrpcCategoryModel>();
      CreateMap<Platform, GrpcCategoryModel>();
      
    }
  }
}