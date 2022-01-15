const db = require('../database');

module.exports = {
  listQuestions: async (req, res) => {
    const { product_id } = req.query;
    console.log('GET request to /qa/questions with product_id: ', product_id);

    const query = `
      select
        q.question_id,
        q.question_body,
        q.question_date,
        q.asker_name,
        q.question_helpfulness,
        q.reported,
        json_agg(a.answers) as answers
      FROM questions q
      LEFT JOIN (
        select
        question_id,
        a.id as answer_id,
        json_build_object(a.id, json_agg(a.*)) as answers
        from answers a
        group by 1,2
      ) a
      on q.question_id = a.question_id
      WHERE product_id = $1
      group by 1,2,3,4,5,6;
      `;

    const { rows } = await db.client.query(query, [product_id])
    res.send(rows);
  }
};
