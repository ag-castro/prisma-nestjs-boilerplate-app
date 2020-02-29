FROM node:13.8-alpine
WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .


