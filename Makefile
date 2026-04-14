.PHONY: backend frontend format-frontend lint-frontend build-frontend verify-frontend format-backend build-backend verify-backend verify-all

backend:
	dotnet run --project backend/WebServer/WebServer.csproj

frontend:
	cd frontend && npm run dev

format-frontend:
	cd frontend && npm run format

lint-frontend:
	cd frontend && npm run lint

build-frontend:
	cd frontend && npm run build

verify-frontend: format-frontend lint-frontend build-frontend

format-backend:
	dotnet format backend/WebServer/WebServer.csproj

build-backend:
	dotnet build backend/WebServer/WebServer.csproj

verify-backend: format-backend build-backend

verify-all: verify-frontend verify-backend
