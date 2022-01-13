-- psql -d qa -f database/query.sql -a
\timing

-- Baseline query

select *
from questions q
left join answers a
on q.id = a.question_id
left join photos p
on a.id = p.answer_id
where q.product_id = 63609;
-- Time: 2676.472 ms (00:02.676)