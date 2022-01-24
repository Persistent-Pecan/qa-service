# Questions & Answers

## About
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

## Tech Stack

- Node.js
- Express
- Postgres
- Frisby
- Jest
- k6
- Loader.io
- New Relic
- Cloudwatch
- Docker
