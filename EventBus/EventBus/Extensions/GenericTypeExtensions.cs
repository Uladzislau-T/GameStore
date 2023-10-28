namespace EventBus.Extensions;

public static class GenericTypeExtensions
{
  public static string GetGenericTypeName(this Type type)
  {
    string typeName;

    if(type.IsGenericType)
    {
      var genericTypes = string.Join(',', type.GetGenericArguments().Select(t => t.Name).ToArray()); //достает имя события 
      typeName = $"{type.Name.Remove(type.Name.IndexOf('`'))}<{genericTypes}>"; //соединяет имя интерфейса и события
    }
    else
    {
      typeName = type.Name;
    }

    return typeName;
  }

  public static string GetGenericTypeName(this object @object)
  {
    return @object.GetType().GetGenericTypeName();
  }
}