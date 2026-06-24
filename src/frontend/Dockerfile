FROM node:25-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:25-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY server.mjs ./

EXPOSE 8080

ENV PORT=8080

CMD ["node", "server.mjs"]
