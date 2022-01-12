-- psql -d qa -f etl.sql

\copy questions FROM '../data/questions.csv' DELIMITER ',' csv header;

/*
psql:etl.sql:1: ERROR:  date/time field value out of range: "1595884714409"
HINT:  Perhaps you need a different "datestyle" setting.
CONTEXT:  COPY questions, line 2, column date_written: "1595884714409"
*/

-- \copy answers FROM '../data/answers.csv' csv header;

/*
psql:etl.sql:11: ERROR:  date/time field value out of range: "1599958385988"
HINT:  Perhaps you need a different "datestyle" setting.
CONTEXT:  COPY answers, line 2, column date_written: "1599958385988"
*/

-- \copy photos FROM '../data/answers_photos.csv' csv header;