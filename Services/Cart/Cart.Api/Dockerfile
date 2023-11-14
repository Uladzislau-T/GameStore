FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app   

    
COPY ./Services/Cart/Cart.Api/*.csproj ./Services/Cart/Cart.Api/
COPY ./Services/Services.Common/*.csproj ./Services/Services.Common/

RUN dotnet restore ./Services/Cart/Cart.Api/cart.csproj

COPY . .
WORKDIR "/app/Services/Cart/Cart.Api"
RUN dotnet build "cart.csproj" -c Release 

FROM build as publish
RUN dotnet publish "cart.csproj" -c Release -o /app/publish
 

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app 
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "cart.dll"]
