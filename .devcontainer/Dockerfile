FROM mcr.microsoft.com/dotnet/sdk:10.0

# The base image ships `ubuntu` as UID 1000, which blocks the devcontainer
# common-utils feature from assigning UID 1000 to `vscode` (remoteUser).
# Without matching UIDs, bind-mounted workspace files are not writable.
RUN userdel -r ubuntu 2>/dev/null || true

# Node 25 matches CI and src/frontend/Dockerfile
COPY --from=node:25-bookworm-slim /usr/local/bin/node /usr/local/bin/node
COPY --from=node:25-bookworm-slim /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -sf /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -sf /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

RUN apt-get update \
    && apt-get install -y --no-install-recommends make default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

ENV DOTNET_USE_POLLING_FILE_WATCHER=1
ENV PATH="${PATH}:/home/vscode/.dotnet/tools"

WORKDIR /workspace
