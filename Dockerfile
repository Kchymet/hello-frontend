FROM node:latest

COPY package.json .
COPY package-lock.json .
COPY src .

RUN npm install .

EXPOSE 8080

ENTRYPOINT node ./src/server.js
