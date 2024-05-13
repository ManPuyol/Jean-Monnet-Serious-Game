DROP VIEW IF EXISTS view_unit_question_count;
CREATE VIEW view_unit_question_count AS
SELECT
    u.id AS unit_id,
    u.description AS description,
    u.subject_id AS subject_id,
    u.active AS active,
    u.name AS name,
    u.questions_per_quiz AS questions_per_quiz,
    COUNT(q.id) AS question_count,
    CAST(COUNT(q.id) AS smallint) // u.questions_per_quiz AS number_of_quizzes
FROM units u
LEFT JOIN questions q ON u.id = q.unit_id

GROUP BY
    u.id;