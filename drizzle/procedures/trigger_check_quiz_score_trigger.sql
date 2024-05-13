DROP TRIGGER IF EXISTS trigger_check_quiz_score_trigger ON quizzes;
DROP FUNCTION IF EXISTS check_quiz_score();
DROP FUNCTION IF EXISTS find_next_available_unit;

CREATE OR REPLACE FUNCTION find_next_available_unit(current_unit_id INTEGER, user_id UUID) RETURNS INTEGER AS $$
DECLARE
    next_unit_id INTEGER;
    current_subject_id INTEGER;
    question_available INTEGER;
BEGIN
    SELECT units.subject_id INTO current_subject_id
    FROM units
    WHERE units.id = current_unit_id;

    SELECT COUNT(*) INTO question_available
    FROM questions
    WHERE questions.unit_id = current_unit_id
    AND questions.id NOT IN (
        SELECT quiz_details.question_id
        FROM quiz_details
        JOIN quizzes ON quiz_details.quiz_id = quizzes.id
        WHERE quizzes.user_id = quiz_details.user_id
    );

    IF question_available > 0 THEN
        next_unit_id := current_unit_id;
    ELSE
        SELECT units.id INTO next_unit_id
        FROM units
        WHERE units.id > current_unit_id
        AND units.active = true
        AND units.subject_id = current_subject_id
        AND NOT EXISTS (
            SELECT 1
            FROM quiz_details
            JOIN quizzes ON quiz_details.quiz_id = quizzes.id
            WHERE quizzes.user_id = quiz_details.user_id
            AND quiz_details.unit_id = units.id
        )
        ORDER BY units.id
        LIMIT 1;
    END IF;

    RETURN next_unit_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION check_quiz_score() RETURNS TRIGGER AS $$
DECLARE
    remaining_questions_count INTEGER;
    next_unit_id INTEGER;
BEGIN
    IF NEW.score >= 70 THEN
        SELECT COUNT(*) INTO remaining_questions_count
        FROM questions
        WHERE questions.unit_id = NEW.unit_id
        AND questions.id NOT IN (
            SELECT quiz_details.question_id
            FROM quiz_details
            JOIN quizzes ON quiz_details.quiz_id = quizzes.id
            WHERE quizzes.user_id = NEW.user_id
        )
        AND questions.active = true;

        IF remaining_questions_count = 0 THEN
            SELECT find_next_available_unit(NEW.unit_id, NEW.user_id) INTO next_unit_id;

            IF next_unit_id IS NOT NULL THEN
                INSERT INTO quizzes (user_id, unit_id, score, meta)
                VALUES (NEW.user_id, next_unit_id, NULL, NULL)
                RETURNING id INTO NEW.id;
            END IF;
        ELSE
            INSERT INTO quizzes (user_id, unit_id, score, meta)
            VALUES (NEW.user_id, NEW.unit_id, NULL, NULL)
            RETURNING id INTO NEW.id;
        END IF;
        
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_check_quiz_score_trigger
AFTER UPDATE ON quizzes
FOR EACH ROW
EXECUTE FUNCTION check_quiz_score();
