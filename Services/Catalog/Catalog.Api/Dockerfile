FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

COPY catalog.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "catalog.dll"]

# FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
# WORKDIR /app
# EXPOSE 80
# EXPOSE 443

# FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
# WORKDIR /src
# COPY ["cart.csproj", "."]
# RUN dotnet restore "./cart.csproj"
# COPY . .
# WORKDIR "/src/."
# RUN dotnet build "cart.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "cart.csproj" -c Release -o /app/publish /p:UseAppHost=false

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "cart.dll", "--environment=Development"]