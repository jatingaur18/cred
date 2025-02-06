
FROM node:alpine

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install

COPY .env /app

COPY . .

CMD ["node", "index.js"]