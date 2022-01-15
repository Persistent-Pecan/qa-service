const db = require('../database');

module.exports = {
  listQuestions: async (req, res) => {
    const { product_id } = req.query;
    console.log('GET request to /qa/questions with product_id: ', product_id);

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
              SELECT
                coalesce(answers, '{}'::json)
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
                        SELECT
                          coalesce(photos, '[]'::json)
                        FROM (
                          SELECT
                            json_agg(url) as photos
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
      FROM questions q
      WHERE true
        AND product_id = $1 -- 63610
        AND reported = false
      GROUP BY 1
      `;

    const { rows } = await db.client.query(query, [product_id])
    res.send(rows);
  }
};
