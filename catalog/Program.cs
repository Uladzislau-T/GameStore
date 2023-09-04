using System.Text.Json.Serialization;
using catalog.Data;
using catalog.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// infrastructure services

var isDev = builder.Environment.IsDevelopment();
if (!isDev)
{
    Console.WriteLine("--> Using Docker Prod Db");
    builder.Services.AddDbContext<Context>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("catalogConn")));
}
else
{
    Console.WriteLine("--> Using DevLocalDb");
    builder.Services.AddDbContext<Context>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("catalogConn")));
}

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Model services

builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
