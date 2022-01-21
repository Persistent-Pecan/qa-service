FROM node:16.13-alpine
WORKDIR /questions-answers
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]