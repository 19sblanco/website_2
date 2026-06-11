FRONTEND_DIR := src/frontend
BACKEND_PROJECT := src/backend/WebServer/WebServer.csproj
BACKEND_SOLUTION := src/backend/2.0 website.sln

.DEFAULT_GOAL := help

# Fail fast with a clear message when tooling is missing from the dev image.
define require_cmd
	@command -v $(1) >/dev/null 2>&1 || { \
		echo "Error: '$(1)' not found. Rebuild the dev container: Dev Containers: Rebuild Container"; \
		exit 127; \
	}
endef

.PHONY: help install backend frontend format-frontend lint-frontend build-frontend \
	verify-frontend format-backend build-backend verify-backend verify-all \
	test-frontend test-backend test-e2e test-all \
	docker-dev docker-dev-down docker-prod docker-prod-down \
	docker-build-dev docker-build-frontend docker-build-backend

help:
	@echo "Dev container (Reopen in Container):"
	@echo "  make install           Install frontend + backend dependencies"
	@echo "  make backend           Run ASP.NET API on :5089"
	@echo "  make frontend          Start Vite dev server on :5173"
	@echo "  make verify-all        Format, lint, and build both stacks"
	@echo "  make test-all          Run all unit tests"
	@echo ""
	@echo "Host machine (requires Docker installed locally):"
	@echo "  make docker-dev        Start dev + database containers"
	@echo "  make docker-dev-down   Stop dev containers"
	@echo "  make docker-prod       Start production containers"
	@echo "  make docker-prod-down  Stop production containers"


######################
# setup
######################
install:
	$(call require_cmd,dotnet)
	$(call require_cmd,npm)
	dotnet restore "$(BACKEND_SOLUTION)"
	npm ci --prefix $(FRONTEND_DIR)


######################
# docker (host only)
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
	docker build -t frontend-prod $(FRONTEND_DIR)

docker-build-backend:
	docker build -t backend-prod src/backend

docker-build-dev:
	docker build -t website-dev -f .devcontainer/Dockerfile .devcontainer


######################
# run projects
######################
backend:
	dotnet run --project $(BACKEND_PROJECT)

frontend:
	$(call require_cmd,npm)
	npm run dev --prefix $(FRONTEND_DIR)


######################
# format, lint, build
######################
format-frontend:
	$(call require_cmd,npm)
	npm run format --prefix $(FRONTEND_DIR)

lint-frontend:
	$(call require_cmd,npm)
	npm run lint --prefix $(FRONTEND_DIR)

format-backend:
	dotnet format $(BACKEND_PROJECT)

build-frontend:
	$(call require_cmd,npm)
	npm run build --prefix $(FRONTEND_DIR)

build-backend:
	dotnet build $(BACKEND_PROJECT)

verify-frontend: format-frontend lint-frontend build-frontend

verify-backend: format-backend build-backend

verify-all: verify-frontend verify-backend


###########
# Tests
###########
test-frontend:
	$(call require_cmd,npm)
	npm run unit --prefix $(FRONTEND_DIR)

test-backend:
	dotnet test src/backend

test-e2e:
	$(call require_cmd,npm)
	npm run e2e --prefix $(FRONTEND_DIR)

test-all: test-frontend test-backend test-e2e
