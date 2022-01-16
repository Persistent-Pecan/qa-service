-- psql -d qa -f database/etl-3-date-alter.sql -a

ALTER TABLE questions
ALTER COLUMN question_date SET DATA TYPE timestamp without time zone
USING timestamp without time zone 'epoch' + (question_date / 1000 ) * interval '1 second';

ALTER TABLE answers
ALTER COLUMN date SET DATA TYPE timestamp without time zone
USING timestamp without time zone 'epoch' + (date / 1000 ) * interval '1 second';

SELECT setval(pg_get_serial_sequence('questions', 'question_id'), coalesce(max(question_id), 0)+1 , false) FROM questions;
SELECT setval(pg_get_serial_sequence('answers', 'id'), coalesce(max(id), 0)+1 , false) FROM answers;
SELECT setval(pg_get_serial_sequence('photos', 'id'), coalesce(max(id), 0)+1 , false) FROM photos;