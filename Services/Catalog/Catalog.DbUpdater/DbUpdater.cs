

using System.Reflection;
using DbUp;
using Npgsql;

namespace Catalog.DbUpdater;

public sealed class DbUpdater
{
  public static void CreateAndOrUpdateDbIfRequired(string connectionString)
  {
    EnsureDatabase.For.PostgresqlDatabase(connectionString);
        
    var upgrader =
      DeployChanges.To
        .PostgresqlDatabase(connectionString)
        .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
        .WithTransaction()
        .LogToConsole()
        .JournalToPostgresqlTable("public", "schema_version")
        .Build();

    if (upgrader.IsUpgradeRequired())
    {
      Console.WriteLine("Upgrader is going to start db upgrade");
      var result = upgrader.PerformUpgrade();

      if (!result.Successful)
        throw new Exception("Unable to update database schema: " + result.Error.Message, result.Error);

      WorkaroundToReRegisterEnums(connectionString);
    }
  }

  /// <summary>
  /// https://github.com/npgsql/npgsql/issues/3182
  /// https://github.com/npgsql/efcore.pg/issues/292
  /// </summary>
  private static void WorkaroundToReRegisterEnums(string connectionString)
  {
    using var connection = new NpgsqlConnection(connectionString);
    connection.Open();
    connection.ReloadTypes();
  }
}
