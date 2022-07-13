# --- BUILD --- #

FROM node:18-alpine as builder

ENV NODE_ENV production

USER node
WORKDIR /usr/share/app

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build \
    && npm prune --production

# --- PRODUCTION --- #

FROM node:18-alpine

ENV NODE_ENV production

USER node
WORKDIR /usr/share/app

COPY --from=builder --chown=node:node /usr/share/app/package*.json ./
COPY --from=builder --chown=node:node /usr/share/app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /usr/share/app/dist/ ./dist/

CMD ["node", "dist/main.js"]