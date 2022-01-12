-- psql -d qa -a -f etl.sql

-- [1] LOAD DATA FROM CSV FILES

  TRUNCATE questions;
  \copy questions FROM '../data/questions.csv' DELIMITER ',' csv header;
  -- 3,518,963 rows

  TRUNCATE answers;
  \copy answers FROM '../data/answers.csv' DELIMITER ',' csv header;
  -- 6,879,306 rows

  TRUNCATE photos;
  \copy photos FROM '../data/answers_photos.csv' DELIMITER ',' csv header;
  -- 2,063,759 rows

-- [2] CONVERT UNIX TIME TO REGULAR TIMESTAMP

  ALTER TABLE questions
  ALTER COLUMN date_written SET DATA TYPE timestamp without time zone
  USING timestamp without time zone 'epoch' + (date_written / 1000 ) * interval '1 second';

  ALTER TABLE answers
  ALTER COLUMN date_written SET DATA TYPE timestamp without time zone
  USING timestamp without time zone 'epoch' + (date_written / 1000 ) * interval '1 second';
