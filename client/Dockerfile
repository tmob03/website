FROM node:12

WORKDIR /app/client

COPY . .

RUN npm install -g @angular/cli
RUN yarn install

ENTRYPOINT ["npm", "start"]
