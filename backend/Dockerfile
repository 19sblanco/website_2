FROM mcr.microsoft.com/dotnet/sdk:10.0

WORKDIR /app

COPY . .

RUN dotnet publish WebServer/WebServer.csproj -c Release -o /publish

EXPOSE 5089

ENV ASPNETCORE_URLS=http://+:5089

CMD ["dotnet", "/publish/WebServer.dll"]

