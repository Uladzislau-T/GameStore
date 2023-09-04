using catalog.Models.Dto;
using catalog.Models.Requests;

namespace catalog.Models.Interfaces
{
  public interface IProductRepository
  {
    Task<ResponseProductDto> GetProducts(RequestProduct request);
  }
}