FROM node:18-alpine

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install --omit=dev

ADD . .

CMD npx sequelize-cli db:migrate; npx sequelize-cli db:seed:all; npm start
