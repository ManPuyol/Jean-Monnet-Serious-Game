DROP VIEW IF EXISTS view_counter_achievements;
CREATE VIEW view_counter_achievements AS
SELECT 
    u.id AS user_id,
    COUNT(CASE WHEN q.score IS NOT NULL THEN 1 END) AS quizzes_done,
    COUNT(CASE WHEN q.score >= 70 THEN 1 END) AS quizzes_passed,
    COUNT(CASE WHEN q.score = 100 THEN 1 END) AS quizzes_perfect
FROM 
    users u
LEFT JOIN 
    quizzes q ON u.id = q.user_id
GROUP BY 
    u.id;