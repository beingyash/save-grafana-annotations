FROM node:14
WORKDIR /app
COPY . /app
RUN npm i
ENTRYPOINT node .