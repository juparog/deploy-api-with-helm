# Staging Base
FROM node:19-alpine AS base
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node && chmod -R 770 /home/node
RUN npm config set strict-ssl false -g
WORKDIR /home/node/app
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json

# Staging Build
FROM base AS appbuild
WORKDIR /home/node/app
COPY --chown=node:node . .
USER node
RUN npm install &&\
    npm run build

# Staging production
FROM base
WORKDIR /home/node/app
USER node
COPY --chown=node:node --from=appbuild /home/node/app/dist ./dist/
RUN npm install --omit=dev
EXPOSE 4000
CMD ["npm", "start"]
