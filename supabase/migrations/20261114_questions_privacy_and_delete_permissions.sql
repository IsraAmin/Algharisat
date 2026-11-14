-- Align question privacy and deletion with the Algharisat guide.
-- Direct SELECT access is limited to the team and the question's author.
-- Anonymous answered questions are read via public.published_questions(),
-- which returns no student_id and no family information.
DROP POLICY IF EXISTS qu_read ON public.questions;
DROP POLICY IF EXISTS questions_read ON public.questions;
CREATE POLICY questions_read ON public.questions
FOR SELECT TO authenticated
USING (app_private.team() OR student_id = app_private.my_student());

-- The author may delete an unanswered question (including one referred to
-- the scholarly authority); the team may delete questions as permitted.
DROP POLICY IF EXISTS questions_delete ON public.questions;
CREATE POLICY questions_delete ON public.questions
FOR DELETE TO authenticated
USING (app_private.team() OR (student_id = app_private.my_student() AND status <> 'answered'));
