-- psql -d qa -f database/query.sql
\timing

-------------------------
-- listQuestions
-------------------------
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
GROUP BY 1;
-- Time: 3790.074 ms (00:03.790)

-------------------------
-- listAnswers
-------------------------
SELECT
  a.question_id,
  1 as page,
  5 as count,
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
  WHERE question_id = 223600
    AND reported = false
  limit 5
) as a
GROUP BY 1,2,3;
-- Time: 4150.064 ms (00:04.150)

-------------------------
-- postQuestion
-------------------------
INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email)
VALUES (63610, 'Test question body', now(), 'Tester', 'test@gmail.com');
-- Time: 2.122 ms

-------------------------
-- postAnswer
-------------------------
INSERT INTO answers (question_id, body, date, answerer_name, answerer_email)
VALUES (223600, 'Test answer body', now(), 'Tester', 'test@gmail.com');
-- Time: 2.072 ms

INSERT INTO photos (answer_id, url)
VALUES (436392, 'https://images.unsplash.com/photo-1511766566737-1740d1da79be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80');
-- Time: 1.585 ms