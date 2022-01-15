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
      res.send(rows);
    } catch (error) {
      console.log(error);
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
      const { page = 1, count = 5, question_id } = req.query;
      const { rows } = await db.client.query(query, [page, count, question_id])
      res.send(rows);
    } catch (error) {
      console.log(error);
    }
  }
};
