FROM docker.io/node:18-alpine as builder
ENV AUTH_PASSWORD=test
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
EXPOSE 3000
CMD ["node", "./server/index.mjs"]
