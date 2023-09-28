using System.ComponentModel.DataAnnotations;

namespace catalog.Filters.ValidationAttributes
{
  class ValidDateAttribute: ValidationAttribute
  {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {

          var date = value as DateTimeOffset?;

          if(date == null || date == DateTimeOffset.MinValue || date > DateTimeOffset.Now.Date)
          {
            return new ValidationResult("The specified date is null or has an invalid form or value.");
          }

          return ValidationResult.Success;
        }
    }
}