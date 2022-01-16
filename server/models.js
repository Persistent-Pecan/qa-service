const db = require('../database');

module.exports = {
  listQuestions: async (req, res) => {
    const query = `
      SELECT
        product_id,
        json_agg(
          json_build_object(
            'question_id', q.question_id,
            'question_body', q.question_body,
            'question_date', q.question_date,
            'asker_name', q.asker_name,
            'question_helpfulness', q.question_helpfulness,
            'reported', q.reported,
            'answers', (
              SELECT coalesce(answers, '{}')
              FROM (
                SELECT
                  json_object_agg(
                    id,
                    json_build_object(
                      'id', id,
                      'body', body,
                      'date', date,
                      'answerer_name', answerer_name,
                      'helpfulness', helpfulness,
                      'photos', (
                        SELECT coalesce(photos, '[]')
                        FROM (
                          SELECT json_agg(url) as photos
                          FROM photos p
                          WHERE p.answer_id = a.id
                        ) as photos
                      )
                    )
                  ) as answers
                FROM answers a
                WHERE a.question_id = q.question_id
              ) as answers
            )
          )
        ) as results
      FROM (
        SELECT *
        FROM questions
        WHERE product_id = $1
          AND reported = false
        LIMIT $2
      ) as q
      GROUP BY 1
    `;

    try {
      const { product_id, count = 5 } = req.query;
      const { rows } = await db.client.query(query, [product_id, count])
      res.status(200).send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  listAnswers: async (req, res) => {
    const query = `
      SELECT
        a.question_id,
        $1 as page,
        $2 as count,
        json_agg(
          json_build_object(
              'id', id,
              'body', body,
              'date', date,
              'answerer_name', answerer_name,
              'helpfulness', helpfulness,
              'photos', (
                SELECT coalesce(photos, '[]')
                FROM (
                  SELECT json_agg(url) as photos
                  FROM photos p
                  WHERE p.answer_id = a.id
                ) as photos
              )
          )
        ) as results
      FROM (
        SELECT *
        FROM answers
        WHERE question_id = $3
          AND reported = false
        limit $2
      ) as a
      GROUP BY 1,2,3
    `;

    try {
      const { question_id } = req.params;
      const { page = 1, count = 5 } = req.query;
      const { rows } = await db.client.query(query, [page, count, question_id])
      res.status(200).send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  postQuestion: async (req, res) => {
    const { product_id, body, name, email } = req.body;
    console.log(product_id, body, name, email);
    const query = `
      INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email)
      VALUES ($1, $2, now(), $3, $4)
    `;

    try {
      const results = await db.client.query(query, [product_id, body, name, email])
      res.status(201).send('Question inserted successfully.');
    } catch (error) {
      res.status(500).send(error);
    }
  },

  postAnswer: async (req, res) => {
    const { question_id, body, name, email, photos } = req.body;
    console.log(question_id, body, name, email, photos);

    const queryInsertAnswer = `
      INSERT INTO answers (question_id, body, date, answerer_name, answerer_email)
      VALUES ($1, $2, now(), $3, $4)
      RETURNING id
    `;

    const queryInsertPhoto = `
      INSERT INTO photos (answer_id, url)
      VALUES ($1, $2)
    `;

    try {
      const answerResults = await db.client.query(queryInsertAnswer, [question_id, body, name, email])
      const answer_id = answerResults.rows[0].id;
      const photoResults = await db.client.query(queryInsertPhoto, [answer_id, photos])
      res.status(201).send('Answer inserted successfully');
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
