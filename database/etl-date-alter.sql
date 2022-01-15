-- psql -d qa -f database/etl-date-alter.sql -a

ALTER TABLE questions
ALTER COLUMN question_date SET DATA TYPE timestamp without time zone
USING timestamp without time zone 'epoch' + (question_date / 1000 ) * interval '1 second';

ALTER TABLE answers
ALTER COLUMN date SET DATA TYPE timestamp without time zone
USING timestamp without time zone 'epoch' + (date / 1000 ) * interval '1 second';
