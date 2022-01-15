const express = require('express');
const models = require('./models.js');
const middleware = require('./middleware.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(middleware.logger);

// GET Routes
app.get('/qa/questions', models.listQuestions);
app.get('/qa/:question_id/answers', models.listAnswers);

// POST Routes
app.post('/qa/questions', models.postQuestion);
app.post('/qa/answers', models.postAnswer);

// PUT Routes
app.put('/qa/questions/helpful', (req, res) => { res.end('PUT - Questions helpful route'); });
app.put('/qa/questions/report', (req, res) => { res.end('PUT - Questions report route'); });
app.put('/qa/answers/helpful', (req, res) => { res.end('PUT - Answers helpful route'); });
app.put('/qa/answers/report', (req, res) => { res.end('PUT - Answers report route'); });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at http://localhost:${port}`);
});
