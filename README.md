# Questions & Answers
This service replaces the existing API with a backend system that can support the full data set for the project and can scale to meet the demands of production traffic.

## Setup
1. Run `npm install` to install dependencies.
2. Run `npm start` to start the Node server.

## Service Routes

GET routes:
- `/qa/questions` - Return all questions with nested answers for the `product_id` supplied as the parameter
- `/qa/questions/:question_id/answers` - Return all questions with nested answers for the `question_id` supplied as the path

POST routes:
- `/qa/questions` - Submit a new question for the `product_id` in the request body.
- `/qa/questions/:question_id/answers` - Submit a new answer for the `question_id` in the request body.

## Dependencies

- [Node.js](https://nodejs.org/en) / [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) / [node-postgres](https://node-postgres.com/)
- [Jest](https://jestjs.io/) / [Frisby](https://docs.frisbyjs.com/)
- [k6](https://k6.io/stress-testing/) / [Loader.io](https://loader.io/)
- [AWS EC2](https://aws.amazon.com/ec2/)
- [NGINX](https://nginx.org/en/)
- [Docker](https://www.docker.com/)
- [New Relic](https://newrelic.com/)
- [AWS Cloudwatch](https://aws.amazon.com/cloudwatch/)
