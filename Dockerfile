FROM docker.io/node:18-alpine as builder
WORKDIR /app
RUN corepack enable pnpm
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . .
RUN pnpm install --offline
RUN pnpm build

FROM docker.io/node:18-alpine
WORKDIR /app
COPY --from=builder /app/.output /app

CMD ["node", "./server/index.mjs"]
