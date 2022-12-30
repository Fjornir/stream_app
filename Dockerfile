FROM node:lts-alpine3.15

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 8080

CMD ["node", "server.js"]
