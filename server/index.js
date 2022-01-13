const express = require('express');
const db = require('../database');

const app = express();
const port = 3000;

app.use(express.json());

// GET Routes
app.get('/qa/questions', (req, res) => {
  db.query('SELECT * FROM questions WHERE product_id = $1', [req.query.product_id], (err, result) => {
    if (err) { console.log(err); }
    res.send(result.rows);
  });
});

app.get('/qa/answers', (req, res) => {
  db.query('SELECT * FROM answers WHERE question_id = $1', [req.query.question_id], (err, result) => {
    if (err) { console.log(err); }
    res.send(result.rows);
  });
});

// POST Routes
app.post('/qa/questions', (req, res) => { res.end('POST - Questions route'); });
app.post('/qa/answers', (req, res) => { res.end('POST - Answers route'); });

// PUT Routes
app.put('/qa/questions/helpful', (req, res) => { res.end('PUT - Questions helpful route'); });
app.put('/qa/questions/report', (req, res) => { res.end('PUT - Questions report route'); });
app.put('/qa/answers/helpful', (req, res) => { res.end('PUT - Answers helpful route'); });
app.put('/qa/answers/report', (req, res) => { res.end('PUT - Answers report route'); });

/*
product_id = 63609
question_id = 563233

'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions',
`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${req.query.question_id}/answers`
`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${req.body.question_id}/helpful`
`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${req.body.question_id}/report`
`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/answers/${req.body.answer_id}/helpful`
`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/answers/${req.body.answer_id}/report`
*/

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at http://localhost:${port}`);
});
