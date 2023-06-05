FROM node:14

WORKDIR /august-server
COPY package.json .
RUN npm install
COPY . .
CMD npm start