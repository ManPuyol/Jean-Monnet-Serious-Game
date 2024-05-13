DROP TRIGGER IF EXISTS trigger_create_quiz_after_enroll ON user_subjects;
DROP FUNCTION IF EXISTS create_basic_quiz();

CREATE OR REPLACE FUNCTION create_basic_quiz()
RETURNS TRIGGER AS $$
DECLARE
    first_unit_found integer;
BEGIN
    SELECT id INTO first_unit_found
    FROM units
    WHERE subject_id = NEW.subject_id
    ORDER BY id
    LIMIT 1;
    INSERT INTO quizzes (user_id, unit_id, score, meta)
    VALUES (NEW.user_id, first_unit_found, NULL, NULL);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_quiz_after_enroll
AFTER INSERT ON user_subjects
FOR EACH ROW
EXECUTE FUNCTION create_basic_quiz();
