-- psql -d qa -f database/schema-sql.sql -a

-- CREATE DATABASE qa;
\connect qa;

-- QUESTIONS
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
 question_id BIGSERIAL,
 product_id INTEGER,
 question_body VARCHAR(1000),
 question_date BIGINT,
 asker_name VARCHAR(60),
 asker_email VARCHAR(60),
 reported BOOLEAN,
 question_helpfulness INTEGER
);

ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);

-- ANSWERS
CREATE TABLE answers (
 id BIGSERIAL,
 question_id INTEGER,
 body VARCHAR(1000),
 date BIGINT,
 answerer_name VARCHAR(60),
 answerer_email VARCHAR(60),
 reported BOOLEAN,
 helpfulness INTEGER
);

ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

-- PHOTOS
CREATE TABLE photos (
 id BIGSERIAL,
 answer_id INTEGER,
 url VARCHAR
);

ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

-- FOREIGN KEYS
ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(question_id);
ALTER TABLE photos ADD CONSTRAINT photos_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES answers(id);
