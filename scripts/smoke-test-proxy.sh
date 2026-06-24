#!/usr/bin/env bash
set -euo pipefail

cd /workspace/src/backend/WebServer
export ConnectionStrings__DefaultConnection="server=database;port=3306;database=portfolio;user=appuser;password=appsecret"
export ASPNETCORE_ENVIRONMENT=Production
export MigrateDatabase=false
export ASPNETCORE_URLS=http://+:18080

dotnet bin/Debug/net10.0/WebServer.dll &
BACKEND_PID=$!
trap 'kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true' EXIT

sleep 8

health=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:18080/health)
visit=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:18080/api/web/visit \
  -H "Content-Type: application/json" -d "{}")
echo "backend_health=$health"
echo "backend_visit=$visit"

export BACKEND_URL=http://localhost:18080
export PROXY_IAM_AUTH=false
export PORT=18081
node /workspace/src/frontend/server.mjs &
FRONTEND_PID=$!

sleep 3

proxy=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:18081/api/web/visit \
  -H "Content-Type: application/json" -d "{}")
fe_health=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:18081/health)
fe_root=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:18081/)

echo "proxy_visit=$proxy"
echo "frontend_health=$fe_health"
echo "frontend_root=$fe_root"

if [[ "$health" != "200" || "$fe_health" != "200" || "$fe_root" != "200" ]]; then
  echo "Smoke test failed"
  exit 1
fi

if [[ "$visit" != "200" && "$visit" != "400" ]]; then
  echo "Unexpected backend visit status: $visit"
  exit 1
fi

if [[ "$proxy" != "200" && "$proxy" != "400" ]]; then
  echo "Unexpected proxy visit status: $proxy"
  exit 1
fi

echo "Smoke test passed"
