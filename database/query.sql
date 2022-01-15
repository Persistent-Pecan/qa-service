-- psql -d qa -f database/query.sql -a
\timing

select
  product_id,
  json_agg(json_build_object(
    'question_id', q.question_id,
    'question_body', q.question_body,
    'question_date', q.question_date,
    'asker_name', q.asker_name,
    'question_helpfulness', q.question_helpfulness,
    'reported', q.reported,
    'answers', (SELECT
      coalesce(answers, '{}'::json)
      FROM (
      select json_object_agg(
        id, json_build_object(
          'id', id,
          'body', body,
          'date', date,
          'answerer_name', answerer_name,
          'helpfulness', helpfulness
          )
      ) as answers
      from answers a
      where a.question_id = q.question_id) as answers)
  )) as results
FROM questions q
WHERE true
  and product_id = 63610
  -- and reported = false
group by 1
-- Time: 3051.564 ms (00:03.052)