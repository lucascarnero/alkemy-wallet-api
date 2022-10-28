FROM node:18-alpine

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install --omit=dev

ADD . .

CMD [ "npm", "start" ]
