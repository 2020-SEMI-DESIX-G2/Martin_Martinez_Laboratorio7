FROM node:latest

WORKDIR /src

COPY . ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]