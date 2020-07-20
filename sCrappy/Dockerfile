FROM node:14

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/scrappy/
COPY ./package*.json ./

RUN npm install
COPY . .

