-- psql -d qa -f database/query.sql
\timing

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
FROM questions q
WHERE product_id = 63610
  AND reported = false
GROUP BY 1
-- Time: 2567.050 ms (00:02.567)