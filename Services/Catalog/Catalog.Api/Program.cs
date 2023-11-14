using System.Text.Json.Serialization;
using cart.Connections.Grpc;
using catalog.Data;
using catalog.Extentions;
using catalog.IntegrationEvents;
using catalog.Models.Interfaces;
using Catalog.DbUpdater;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// infrastructure services

var isDev = builder.Environment.IsDevelopment();

builder.AddServiceDefaults();

var conStr = builder.Configuration.GetConnectionString("catalogConn");
DbUpdater.CreateAndOrUpdateDbIfRequired(conStr);

// Console.WriteLine("--> Using Docker Db");
builder.Services.AddDbContext<Context>(opt =>
    opt.UseNpgsql(conStr));


builder.Services.AddRedis(builder.Configuration);

builder.Services.AddGrpc();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Model services

builder.Services.AddTransient<ICatalogIntegrationEventService, CatalogIntegrationEventService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (isDev)
{
    app.UseMiniProfiler();
}

// app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();
app.MapGrpcService<CatalogService>();

PrepDb.PrepPopulation(app, isDev);

app.Run();
