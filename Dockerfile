FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update
RUN yarn global add pnpm
WORKDIR /app

COPY . .
RUN pnpm install --prod

RUN pnpm run db:push
RUN pnpm run db:generate
RUN pnpm run build

CMD pnpm run start
