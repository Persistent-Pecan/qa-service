-- CREATE DATABASE qa;
-- psql -d qa -f schema-sql.sql

\connect qa;

/* QUESTIONS */
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
 id BIGSERIAL,
 product_id INTEGER,
 body VARCHAR(1000),
 date_written TIMESTAMP,
 asker_name VARCHAR(60),
 asker_email VARCHAR(60),
 reported BOOLEAN,
 helpful INTEGER
);

ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

/* ANSWERS */
CREATE TABLE answers (
 id BIGSERIAL,
 question_id INTEGER,
 body VARCHAR(1000),
 date_written TIMESTAMP,
 answerer_name VARCHAR(60),
 answerer_email VARCHAR(60),
 reported BOOLEAN,
 helpful BOOLEAN
);

ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

/* PHOTOS */
CREATE TABLE photos (
 id BIGSERIAL,
 answer_id INTEGER,
 url VARCHAR
);

ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

/* FOREIGN KEYS */
ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
ALTER TABLE photos ADD CONSTRAINT photos_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES answers(id);