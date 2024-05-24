'use client';
import { Button } from '@/components/ui/button';
import { Plus, Quote } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';

export function SidebarQuestions({
  questions,
  activeQuestion,
  setActiveQuestion,
  addNewQuestion
}: {
  questions: any[];
  setActiveQuestion: Dispatch<SetStateAction<number>>;
  activeQuestion: number;
  addNewQuestion: () => void;
}) {

  return (
    <div className="flex-1 md:border-r pt-2">
      <div className="px-3 py-2">
        <div className="flex items-center pl-4 justify-between mb-2">
          <h3 className="font-semibold text-lg tracking-tight">Questions</h3>
          <Button
            size="icon"
            variant="outline"
            className="ml-auto rounded-full h-8 w-8"
            onClick={addNewQuestion}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">New question</span>
          </Button>
        </div>
        <nav className="space-y-1 ">
          {questions.map((question, index) => (
            <Button
              key={index}
              title={question.question as string}
              variant={activeQuestion === index ? 'secondary' : 'ghost'}
              className="justify-start w-full truncate"
              onClick={() => setActiveQuestion(index)}
            >
              <Quote className="mr-2 min-h-4 min-w-4 h-4 w-4" />
              <div className="text-left w-full truncate">
                {question.question}
              </div>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
