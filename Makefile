.PHONY: backend frontend

backend:
	dotnet run --project backend/WebServer/WebServer.csproj

frontend:
	npm run dev --prefix frontend/
