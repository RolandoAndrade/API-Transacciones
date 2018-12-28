FROM node:8.10.0-alpine
EXPOSE 3000 5432 9229 80
COPY . /home/app
WORKDIR /home/app

COPY package.json /home/app
RUN npm install

CMD ./scripts/start.sh
COPY init.sql /docker-entrypoint-initdb.d/10-init.sql