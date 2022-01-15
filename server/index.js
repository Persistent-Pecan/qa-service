const express = require('express');
const models = require('./models.js');

const app = express();
const port = 3000;

app.use(express.json());

// GET Routes
app.get('/qa/questions', models.listQuestions);
app.get('/qa/answers', (req, res) => { res.end('GET - Answers route'); });

// POST Routes
app.post('/qa/questions', (req, res) => { res.end('POST - Questions route'); });
app.post('/qa/answers', (req, res) => { res.end('POST - Answers route'); });

// PUT Routes
app.put('/qa/questions/helpful', (req, res) => { res.end('PUT - Questions helpful route'); });
app.put('/qa/questions/report', (req, res) => { res.end('PUT - Questions report route'); });
app.put('/qa/answers/helpful', (req, res) => { res.end('PUT - Answers helpful route'); });
app.put('/qa/answers/report', (req, res) => { res.end('PUT - Answers report route'); });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at http://localhost:${port}`);
});
