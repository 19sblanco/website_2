FROM mcr.microsoft.com/dotnet/sdk:10.0

WORKDIR /app

COPY . .

RUN dotnet publish WebServer/WebServer.csproj -c Release -o /publish

EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080

CMD ["dotnet", "/publish/WebServer.dll"]

