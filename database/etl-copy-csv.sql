-- psql -d qa -f database/etl-copy-csv.sql -a

\copy questions FROM './data/questions.csv' DELIMITER ',' csv header;
-- 3,518,963 rows

\copy answers FROM './data/answers.csv' DELIMITER ',' csv header;
-- 6,879,306 rows

\copy photos FROM './data/answers_photos.csv' DELIMITER ',' csv header;
-- 2,063,759 rows
