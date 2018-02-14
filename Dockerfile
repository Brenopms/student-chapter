FROM node:8.3
RUN apk add --no-cache tzdata
ENV TZ America/Sao_Paulo
RUN mkdir /app
WORKDIR /app

# Install app dependencies
COPY package.json /app

RUN npm install

# use nodemon for development
RUN npm install --global nodemon

# Bundle app source
COPY . /app

EXPOSE 3000

CMD [ "npm", "start" ]
