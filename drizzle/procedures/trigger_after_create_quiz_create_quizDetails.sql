DROP TRIGGER IF EXISTS trigger_create_quiz_after_enroll ON quizzes;
DROP FUNCTION IF EXISTS create_quiz_details();
CREATE OR REPLACE FUNCTION create_quiz_details() RETURNS TRIGGER AS $$
DECLARE
    question_count INTEGER;
    remaining_questions_count INTEGER;
BEGIN
    SELECT units.questions_per_quiz INTO question_count
    FROM units
    WHERE units.id = NEW.unit_id;

    CREATE TEMP TABLE unused_questions AS (
        SELECT questions.id
        FROM questions
        WHERE questions.unit_id = NEW.unit_id
        AND questions.id NOT IN (
            SELECT quiz_details.question_id
            FROM quiz_details
            WHERE quiz_details.quiz_id IN (
                SELECT id
                FROM quizzes
                WHERE user_id = NEW.user_id
            )
        )
        AND questions.active = true
    );

    SELECT COUNT(*) INTO remaining_questions_count FROM unused_questions;

    IF remaining_questions_count < question_count * 2 THEN
        question_count := remaining_questions_count;       
    END IF;

    INSERT INTO quiz_details (quiz_id, user_id, question_id, unit_id)
    SELECT NEW.id, NEW.user_id, questions.id, questions.unit_id
    FROM questions
    JOIN unused_questions ON questions.id = unused_questions.id
    ORDER BY RANDOM()
    LIMIT question_count;

    DROP TABLE IF EXISTS unused_questions;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_quiz_after_enroll
AFTER INSERT ON quizzes
FOR EACH ROW
EXECUTE FUNCTION create_quiz_details();
