'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check, Trash2 } from 'lucide-react';

const FormSchema = z.object({
  question: z
    .string()
    .min(1, {
      message: 'Required',
    })
    .max(255, {
      message: 'Question must not be longer than 30 characters.',
    }),
  answers: z
    .array(
      z.string().min(1, {
        message: 'Answer must be at least 1 character.',
      }),
    )
    .min(3, {
      message: 'Question must have at least 3 answers.',
    }),
});

export default function QuestionForm({
  questions,
  setQuestions,
  activeQuestion,
}: {
  questions: any[];
  setQuestions: Dispatch<SetStateAction<any[]>>;
  activeQuestion: number;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { 
        question: questions[activeQuestion]?.question ?? '',
        answers: questions[activeQuestion]?.answers ?? ['A', 'B', 'C'] },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    //@ts-ignore
    name: 'answers',
  });

  useEffect(() => {
    form.reset({
      question: questions[activeQuestion]?.question ?? '',
      answers: questions[activeQuestion]?.answers ?? ['A', 'B', 'C'],
    });
  }, [activeQuestion]);

  const addAnswer = () => {
    append('');
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    data.answers = data.answers.map(a => a.trim());
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-6 space-y-4"
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter question"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((f, index) => (
          <FormField
            key={f.id}
            control={form.control}
            name={`answers.${index}`}
            render={({ field }) => (
              <div className="flex flex-row items-start gap-4">
                <FormItem className="flex-1">
                  <FormLabel>Answer {index + 1} </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter answer" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <Button
                  className="relative top-[2rem]"
                  type="button"
                  variant={'success'}
                  size={'icon'}
                >
                  <Check />
                </Button>
                <Button
                  className="relative top-[2rem]"
                  type="button"
                  variant={fields.length <= 3 ? 'secondary' : 'destructive'}
                  size={'icon'}
                  disabled={fields.length <= 3}
                  onClick={() =>
                    form.setValue(
                      'answers',
                      form.getValues().answers.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Trash2 />
                </Button>
              </div>
            )}
          />
        ))}
        <Button type="button" onClick={addAnswer}>
          Add Answer
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
