FROM node:14

WORKDIR /august-admin
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD npm run serve
