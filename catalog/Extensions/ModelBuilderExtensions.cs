#nullable disable
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using Npgsql.NameTranslation;
using Npgsql;
using System.Text.RegularExpressions;

namespace catalog.Extentions
{
    public static class ModelBuilderExtensions
    {
        static readonly Regex KeysRegex = new Regex("^(PK|FK|IX)_", RegexOptions.Compiled);

        public static void UseSnakeCaseNames(this ModelBuilder modelBuilder)
        {
            var mapper = new NpgsqlSnakeCaseNameTranslator();

            foreach (var table in modelBuilder.Model.GetEntityTypes())
            {

                ConvertToSnake(mapper, table);

                foreach (var property in table.GetProperties())
                {
                    ConvertToSnake(mapper, property);
                }

                /*foreach (var primaryKey in table.GetKeys())
                {
                    ConvertToSnake(mapper, primaryKey);
                }

                foreach (var foreignKey in table.GetForeignKeys())
                {
                    ConvertToSnake(mapper, foreignKey);
                }

                foreach (var indexKey in table.GetIndexes())
                {
                    ConvertToSnake(mapper, indexKey);
                }*/
            }
        }

        static void ConvertToSnake(INpgsqlNameTranslator mapper, object entity)
        {
            switch (entity)
            {
                case IMutableEntityType table:
                    table.SetTableName(ConvertGeneralToSnake(mapper, table.GetTableName()));
                    break;
                case IMutableProperty property:
#pragma warning disable 618
                    property.SetColumnName(ConvertGeneralToSnake(mapper, ((IProperty)property).GetColumnName()));
#pragma warning restore 618
                    break;
                case IMutableKey primaryKey:
                    primaryKey.SetName(ConvertKeyToSnake(mapper, primaryKey.GetName()));
                    break;
                case IMutableForeignKey foreignKey:
                    foreignKey.SetConstraintName(ConvertKeyToSnake(mapper, foreignKey.GetConstraintName()));
                    break;
                default:
                    throw new NotImplementedException("Unexpected type was provided to snake case converter");
            }
        }

        static string ConvertKeyToSnake(INpgsqlNameTranslator mapper, string keyName) =>
            ConvertGeneralToSnake(mapper, KeysRegex.Replace(keyName, match => match.Value.ToLower()));

        static string ConvertGeneralToSnake(INpgsqlNameTranslator mapper, string entityName) =>
            mapper.TranslateMemberName(entityName);
    }
}
