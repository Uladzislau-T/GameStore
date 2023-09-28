using System.Runtime.Serialization;

namespace catalog.Models
{
  public enum SortProduct
  {
    [EnumMember(Value = "ALL")]
    All,
    NewReleases,
    [EnumMember(Value = "Alpha")]
    Alphabetical,
    PriceHightoLow,
    PriceLowtoHigh
  }
}