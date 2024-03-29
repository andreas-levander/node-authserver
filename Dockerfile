# syntax=docker/dockerfile:1
FROM node:lts-alpine AS builder

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY /src /src

COPY ["tsconfig.json", "tsconfig.build.json", "./"]

RUN npm run build

FROM node:lts-alpine
RUN apk add dumb-init

ENV NODE_ENV production
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci --only=production

COPY --from=builder --chown=node ./build .

USER node

CMD [ "dumb-init", "node", "index.js" ]
