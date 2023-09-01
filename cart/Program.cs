using System.Text.Json.Serialization;
using cart.Connections.Grpc;
using cart.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var isDev = builder.Environment.IsDevelopment();
if (!isDev)
{
    Console.WriteLine("--> Using Docker Prod Db");
    builder.Services.AddDbContext<Context>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("PlatformsConn")));
}
else
{
    Console.WriteLine("--> Using DevLocalDb");
    builder.Services.AddDbContext<Context>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("PlatformsConn")));
}

builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

builder.Services.AddGrpc();

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

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseEndpoints(e => {
    e.MapGrpcService<GrpcCartService>();
});

PrepDb.PrepPopulation(app, app.Environment.IsProduction()); 

app.Run();
