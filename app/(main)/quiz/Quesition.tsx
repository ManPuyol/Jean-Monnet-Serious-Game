'use client';
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Answers } from '@/schemas/answers';
import { set } from 'zod';

interface QuizProps {
  question: string;
  answers: Answers[];
  progress: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  setAnswers: React.Dispatch<React.SetStateAction<any[]>>;
}

const Quiz: React.FC<QuizProps> = ({
  question,
  answers,
  progress,
  setCurrentQuestion,
  setAnswers,
}) => {
  const [selected, setSelected] = useState(-1);

  const handleClick = (index: number) => {
    if (selected < 0) {
      setSelected(index);
    }
  };
  return (
    <div className="p-8 h-full max-h-full">
      <div className="max-w-3xl mx-auto max-h-full">
        <div className="flex justify-between items-center mb-6 gap-4">
          <Progress className="w-full" value={progress} />
        </div>
        <div className="mb-6 p-6 border rounded-md shadow ">
          <h2 className="zsm:text-sm font-semibold text-center">{question}</h2>
        </div>
        <ScrollArea>
          <div className="grid grid-cols-1 gap-4 h-full auto-rows-[1fr] ">
            {answers.map((answer, index) => {
              const variant = answer.correct ? 'success' : 'destructive';
              return (
                <Button
                  key={index}
                  variant={index === selected ? variant : 'secondary'}
                  className="py-4 !h-auto whitespace-normal"
                  onClick={() => handleClick(index)}
                >
                  {answer.name}
                </Button>
              );
            })}
          </div>
        </ScrollArea>
        <div className="flex flex-row-reverse">
          <Button
            variant="default"
            className={`mt-6 w-1/3 py-4 ${selected < 0 ? 'hidden' : 'animate-in'}`}
            onClick={() => {
              setSelected(-1);
              setCurrentQuestion(prev => prev + 1);
              setAnswers(prev => [
                ...prev,
                {
                  questionId: answers[selected].questionId,
                  correct: answers[selected].correct,
                },
              ]);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
