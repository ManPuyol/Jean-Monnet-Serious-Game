'use client';
import QuestionForm from './questionForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarQuestions } from './SidebarQuestions';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

export function QuestionBuilder({
  questions,
  unitId,
}: {
  questions: any[];
  unitId: number;
}) {
  const [questionState, setQuestionState] = useState(questions);
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    if (questions.length < 1) addNewQuestion();
  }, []);

  const addNewQuestion = () => {
    // Ensure all questions have ids
    if (!questionState.every(question => question.id !== undefined)) {
      setActiveQuestion(questionState.length - 1); // Set active question to the last one
      toast({
        title: 'Hey!',
        variant: 'destructive',
        description: 'Submit this question before adding a new one.',
      });
      return;
    }

    const newQuestion = { question: '', answers: [] }; // Adjust this to fit the structure of your questions
    setQuestionState([...questionState, newQuestion]);
    setActiveQuestion(questionState.length); // Set active question to the last one
  };

  return (
    <div className="flex-1 flex-col md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:flex h-full max-h-screen flex-col">
        <SidebarQuestions
          questions={questionState}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          addNewQuestion={addNewQuestion}
        />
      </div>
      <div className="h-[calc(100vh-60px)] ">
        <ScrollArea className="h-full">
          <QuestionForm
            unitId={unitId}
            questions={questionState}
            setQuestions={setQuestionState}
            setActiveQuestion={setActiveQuestion}
            activeQuestion={activeQuestion}
          />
        </ScrollArea>
      </div>
    </div>
  );
}
