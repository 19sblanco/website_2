.PHONY: backend frontend format-frontend lint-frontend build-frontend verify-frontend format-backend build-backend verify-backend verify-all test-frontend docker-dev docker-prod docker-dev-down docker-prod-down


######################
# run projects
######################
backend:
	dotnet run --project backend/WebServer/WebServer.csproj

frontend:
	cd frontend && npm run dev


######################
# docker
######################
docker-dev:
	docker compose -f docker-compose.dev.yml up --build

docker-dev-down:
	docker compose -f docker-compose.dev.yml down

docker-prod:
	docker compose up --build

docker-prod-down:
	docker compose down


######################
# format, lint, build
######################
format-frontend:
	cd frontend && npm run format

lint-frontend:
	cd frontend && npm run lint

format-backend:
	dotnet format backend/WebServer/WebServer.csproj

build-frontend:
	cd frontend && npm run build

build-backend:
	dotnet build backend/WebServer/WebServer.csproj

verify-frontend: format-frontend lint-frontend build-frontend

verify-backend: format-backend build-backend

verify-all: verify-frontend verify-backend


###########
# Tests
###########
test-frontend:
	cd frontend && npm run unit

test-backend:
	cd backend && dotnet test

test-e2e:
	cd frontend && npm run e2e

test-all: test-frontend test-backend test-e2e
