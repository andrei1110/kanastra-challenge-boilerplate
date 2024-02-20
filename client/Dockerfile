FROM node:18-alpine AS development

USER root

RUN mkdir -p /app

WORKDIR /app

COPY ./package.json ./package.json

RUN npm i

COPY . .

EXPOSE 8888

ENTRYPOINT ["npm", "run", "dev:node"]