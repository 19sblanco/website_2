#!/usr/bin/env bash
set -euo pipefail

dotnet restore "src/backend/2.0 website.sln"
npm ci --prefix src/frontend
npm run e2e:install --prefix src/frontend
