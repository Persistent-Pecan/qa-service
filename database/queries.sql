-- psql -d qa -f database/queries.sql

-------------------------
-- Function for random integer
-------------------------
/*
CREATE OR REPLACE FUNCTION random_between(low INT ,high INT)
   RETURNS INT AS
$$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END;
$$ language 'plpgsql' STRICT;
*/

-------------------------
-- listQuestions
-------------------------
EXPLAIN ANALYZE SELECT
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
        SELECT coalesce(answers, '{}'::json)
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
                  SELECT coalesce(json_agg(url), '[]'::json)
                  FROM (
                    SELECT url
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
  WHERE product_id = (SELECT random_between(0, 1000011))
    AND reported = false
  LIMIT 5
) as q
GROUP BY 1;

-------------------------
-- listAnswers
-------------------------
EXPLAIN ANALYZE SELECT
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
          SELECT coalesce(json_agg(url), '[]'::json)
          FROM (
            SELECT url
            FROM photos p
            WHERE p.answer_id = a.id
          ) as photos
        )
    )
  ) as results
FROM (
  SELECT *
  FROM answers
  WHERE question_id = (SELECT random_between(0, 3518963))
    AND reported = false
  limit 5
) as a
GROUP BY 1,2,3;

-------------------------
-- postQuestion
-------------------------
BEGIN;
EXPLAIN ANALYZE INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email)
VALUES ((SELECT random_between(0, 1000011)), 'Test question body', now(), 'Tester', 'test@gmail.com');
ROLLBACK;

-------------------------
-- postAnswer
-------------------------
BEGIN;
EXPLAIN ANALYZE INSERT INTO answers (question_id, body, date, answerer_name, answerer_email)
VALUES ((SELECT random_between(0, 3518963)), 'Test answer body', now(), 'Tester', 'test@gmail.com');
ROLLBACK;

BEGIN;
EXPLAIN ANALYZE INSERT INTO photos (answer_id, url)
VALUES ((SELECT random_between(0, 6879306)), 'https://images.unsplash.com/photo-1511766566737-1740d1da79be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80');
ROLLBACK;
