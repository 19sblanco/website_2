.PHONY: backend frontend format-frontend lint-frontend build-frontend verify-frontend format-backend build-backend verify-backend verify-all test-frontend docker-dev docker-prod docker-dev-down docker-prod-down


######################
# docker
######################
docker-dev:
	UID=$(shell id -u) GID=$(shell id -g) docker compose -f docker-compose.dev.yml up --build

docker-dev-down:
	docker compose -f docker-compose.dev.yml down

docker-prod:
	docker compose up --build

docker-prod-down:
	docker compose down


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
