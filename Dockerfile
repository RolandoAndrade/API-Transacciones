FROM node:8.10.0-alpine
EXPOSE 3000 9229
COPY . /home/app
WORKDIR /home/app
RUN npm install
ENTRYPOINT ["sh", "./scripts/start.sh"]