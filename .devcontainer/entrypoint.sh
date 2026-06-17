#!/usr/bin/env bash
set -euo pipefail

# Named Docker volumes are initialized as root-owned. Align them with the
# devcontainer runtime user (remoteUser), which may differ from the bind-mount
# owner when updateRemoteUserUID is enabled.
RUNTIME_UID="$(id -u vscode)"
RUNTIME_GID="$(id -g vscode)"

for dir in \
  /workspace/src/backend/WebServer/obj \
  /workspace/src/backend/WebServer/bin \
  /workspace/src/backend/WebServer.Tests/obj \
  /workspace/src/backend/WebServer.Tests/bin \
  /workspace/src/frontend/node_modules \
  /home/vscode/.cache/ms-playwright
do
  if [ -d "$dir" ]; then
    chown -R "${RUNTIME_UID}:${RUNTIME_GID}" "$dir"
  fi
done

exec "$@"
