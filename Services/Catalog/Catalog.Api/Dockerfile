FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app   

    
COPY ./Services/Catalog/Catalog.Api/*.csproj ./Services/Catalog/Catalog.Api/
COPY ./Services/Services.Common/*.csproj ./Services/Services.Common/

RUN dotnet restore ./Services/Catalog/Catalog.Api/catalog.csproj

COPY . .
WORKDIR "/app/Services/Catalog/Catalog.Api"
RUN dotnet build "catalog.csproj" -c Release 

FROM build as publish
RUN dotnet publish "catalog.csproj" -c Release -o /app/publish
 

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app 
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "catalog.dll"]