FROM node:8.10.0-alpine
EXPOSE 3000 5432
COPY . /home/app
WORKDIR /home/app
RUN npm install
CMD ./scripts/start.sh