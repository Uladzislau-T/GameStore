using System.Text.Json.Serialization;
using cart.Connections.Grpc;
using cart.Data;
using cart.Extentions;
using cart.IntegrationEvents.Events;
using cart.IntegrationEvents.Handlers;
using cart.Models;
using Ecommerce.EventBus.Abstractions;
using Microsoft.EntityFrameworkCore;
using Services.Common;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.AddServiceDefaults();

var isDev = builder.Environment.IsDevelopment();
if (!isDev)
{
    Console.WriteLine("--> Using Docker Prod Db");
    builder.Services.AddDbContext<Context>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("cartConn")));
}
else
{
    Console.WriteLine("--> Using DevLocalDb");
    builder.Services.AddDbContext<Context>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("cartConn")));
}

builder.Services.AddRedis(builder.Configuration);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddGrpc();

builder.Services.AddTransient<ProductPriceChangedIntegrationEventHandler>();

builder.Services.AddScoped<ICartRepository, CartRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }

app.UseRouting();

if (isDev)
{
    app.UseMiniProfiler();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

var eventBus = app.Services.GetRequiredService<IEventBus>();

eventBus.Subscribe<ProductPriceChangedIntegrationEvent, ProductPriceChangedIntegrationEventHandler>();

app.MapGrpcService<CartService>();

PrepDb.PrepPopulation(app, app.Environment.IsProduction()); 

app.Run();
