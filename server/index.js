require('dotenv').config();
const express = require('express');
const models = require('./models');
const middleware = require('./middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(middleware.logger);

app.get('/', (req, res) => { res.send(`Server running on port ${port}`); });
app.get('/qa/questions', models.listQuestions);
app.get('/qa/questions/:question_id/answers', models.listAnswers);
app.post('/qa/questions', models.postQuestion);
app.post('/qa/questions/:question_id/answers', models.postAnswer);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
