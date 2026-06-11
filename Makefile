.PHONY: backend frontend format-frontend lint-frontend build-frontend verify-frontend format-backend build-backend verify-backend verify-all test-frontend docker-dev docker-prod docker-dev-down docker-prod-down docker-build-frontend docker-build-backend docker-build-frontend-dev docker-build-backend-dev


######################
# docker
######################
docker-dev:
	docker compose -f .devcontainer/docker-compose.yml up --build

docker-dev-down:
	docker compose -f .devcontainer/docker-compose.yml down

docker-prod:
	docker compose up --build

docker-prod-down:
	docker compose down

docker-build-frontend:
	docker build -t frontend-prod src/frontend

docker-build-backend:
	docker build -t backend-prod src/backend

docker-build-frontend-dev:
	docker build -t frontend-dev -f src/frontend/Dockerfile.dev src/frontend

docker-build-backend-dev:
	docker build -t backend-dev -f src/backend/Dockerfile.dev src/backend


######################
# run projects
######################
backend:
	dotnet run --project src/backend/WebServer/WebServer.csproj

frontend:
	cd src/frontend && npm run dev


######################
# format, lint, build
######################
format-frontend:
	cd src/frontend && npm run format

lint-frontend:
	cd src/frontend && npm run lint

format-backend:
	dotnet format src/backend/WebServer/WebServer.csproj

build-frontend:
	cd src/frontend && npm run build

build-backend:
	dotnet build src/backend/WebServer/WebServer.csproj

verify-frontend: format-frontend lint-frontend build-frontend

verify-backend: format-backend build-backend

verify-all: verify-frontend verify-backend


###########
# Tests
###########
test-frontend:
	cd src/frontend && npm run unit

test-backend:
	cd src/backend && dotnet test

test-e2e:
	cd src/frontend && npm run e2e

test-all: test-frontend test-backend test-e2e
