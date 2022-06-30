# syntax=docker/dockerfile:1
FROM node:lts-alpine
RUN apk add dumb-init

ENV NODE_ENV production
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci --only=production

COPY --chown=node . .

USER node

CMD [ "dumb-init", "node", "index.js" ]
