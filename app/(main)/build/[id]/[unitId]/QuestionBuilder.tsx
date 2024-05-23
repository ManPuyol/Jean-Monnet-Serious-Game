'use client';
import QuestionForm from './questionForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarQuestions } from './SidebarQuestions';
import { useState } from 'react';

export function QuestionBuilder({ questions }: { questions: any[] }) {
  const [questionState, setQuestionState] = useState(questions);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const addNewQuestion = () => {
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
            questions={questionState}
            setQuestions={setQuestionState}
            activeQuestion={activeQuestion}
          />
        </ScrollArea>
      </div>
    </div>
  );
}
