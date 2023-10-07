using AutoMapper;
using catalog;
using catalog.Data;
using catalog.Models.Dto;
using catalog.Models.Interfaces;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Microsoft.EntityFrameworkCore;

namespace cart.Connections.Grpc 
{
  public class CatalogService : GrpcCatalog.GrpcCatalogBase
  {
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;
    private readonly ILogger _logger;

    public CatalogService(IProductRepository productRepository, ICategoryRepository categoryRepository, IMapper mapper, ILogger<CatalogService> logger)
    {
      _productRepository = productRepository;
      _categoryRepository = categoryRepository;
      _mapper = mapper;
      _logger = logger;
    }

    public override async Task<GrpcProductDtosResponse> GetProductByIds(GrpcProductIdsRequest request, ServerCallContext context)
    {
      _logger.LogInformation("Begin grpc call CatalogService.GetProductByIds");
      if (request.Ids == null || request.Ids.Count == 0)
        {
            context.Status = new Status(StatusCode.FailedPrecondition, "Ids collection must contain at least one id");
            return null;
        }

      var response = new GrpcProductDtosResponse();


      var products = await _productRepository.GetProductByIds(request.Ids);

      var responseItems = ConvertToGrpcProductItem(products);
    
      response.ProductDtos.AddRange(responseItems);

      return response;
    }

    public override async Task<GrpcCategoriesResponse> GetAllCategories(GrpcCategoriesRequest request, ServerCallContext context)
    {           
      var response = new GrpcCategoriesResponse();

      var catetegories = await _categoryRepository.GetAllCategoriesAsync();

      response.Categories = _mapper.Map<GrpcCategoriesModel>(catetegories);

      return response;
    }

    private IEnumerable<GrpcProductDtoModel> ConvertToGrpcProductItem(IEnumerable<ProductDto> products)
    {
      decimal NanoFactor = 1_000_000_000;
      List<GrpcProductDtoModel> grpcItems = new();

      foreach (var product in products)
      {
        var units = decimal.ToInt64(product.Price);

        var model = new GrpcProductDtoModel() {
          Id = (int)product.Id,
          Title = product.Title,
          Author = product.Author,
          Description = product.Description,
          Price = new DecimalValue() {Units = units, Nanos = decimal.ToInt32((product.Price - units) * NanoFactor)},
          TimeCreated = product.TimeCreated.ToTimestamp(),
          PreviewImage = product.PreviewImage,
          MainImage = product.MainImage,
        };

        model.Genres.AddRange(product.Genres);
        model.Features.AddRange(product.Features);
        model.Platforms.AddRange(product.Platforms);

        grpcItems.Add(model);
      }

      return grpcItems;
    }        
  }
}