const frisby = require('frisby');

it('GET /qa/questions should return a status of 200 OK', function () {
  const randProduct = Math.floor(Math.random() * 1000012);
  return frisby
    .get(`http://localhost:3000/qa/questions?product_id=${randProduct}`)
    .expect('status', 200);
});

it('GET /qa/questions/:question_id/answers should return a status of 200 OK', function () {
  const randQuestion = Math.floor(Math.random() * 3518964);
  return frisby
    .get(`http://localhost:3000/qa/questions/${randQuestion}/answers`)
    .expect('status', 200);
});
