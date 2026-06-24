FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /app

COPY . .

RUN dotnet publish WebServer/WebServer.csproj -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app

COPY --from=build /publish .

EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:${PORT:-8080}

CMD ["dotnet", "WebServer.dll"]
