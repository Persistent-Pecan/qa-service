/* CREATE DATABASE qa; */
/* psql -d qa -a -f schema.sql */

\connect qa;

CREATE TABLE questions (
 id BIGSERIAL,
 product_id INTEGER,
 question_body VARCHAR(1000),
 question_date DATE,
 asker_name VARCHAR(60),
 question_helpfulness INTEGER,
 reported BOOLEAN
);


ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

CREATE TABLE answers (
 id BIGSERIAL,
 body VARCHAR(1000),
 date DATE,
 answerer_name VARCHAR(60),
 helpfulness BOOLEAN,
 question_id INTEGER
);


ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE photos (
 id BIGSERIAL,
 url INTEGER,
 answer_id INTEGER
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
ALTER TABLE photos ADD CONSTRAINT photos_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES answers(id);