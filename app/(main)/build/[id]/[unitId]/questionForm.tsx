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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check, Trash2 } from 'lucide-react';
import {
  addQuestionWithAnswers,
  deleteQuestion,
  updateQuestionWithAnswers,
} from '@/controllers/questions';
import { ConfirmDialog } from '@/components/ConfirmDialog';

const FormSchema = z.object({
  id: z.number().optional(),
  hard: z.boolean().default(false),
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
      z.object({
        name: z.string().min(1, { message: 'Required' }),
        correct: z.boolean().default(false),
      }),
    )
    .min(2, {
      message: 'Question must have at least 2 answers.',
    }),
});

export default function QuestionForm({
  unitId,
  questions,
  setQuestions,
  setActiveQuestion,
  activeQuestion,
  addNewQuestion,
}: {
  unitId: number;
  questions: any[];
  setQuestions: Dispatch<SetStateAction<any[]>>;
  setActiveQuestion: Dispatch<SetStateAction<number>>;
  activeQuestion: number;
  addNewQuestion: () => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: questions[activeQuestion]?.id,
      hard: questions[activeQuestion]?.hard ?? false,
      question: questions[activeQuestion]?.question ?? '',
      answers: questions[activeQuestion]?.answers.length
        ? questions[activeQuestion]?.answers
        : [
            { name: '', correct: true },
            { name: '', correct: false },
            { name: '', correct: false },
          ],
    },
  });

  const [hard, setHard] = useState(questions[activeQuestion]?.hard ?? false);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'answers',
  });

  useEffect(() => {
    if (questions.length < 1) addNewQuestion();
    form.reset({
      id: questions[activeQuestion]?.id,
      hard: questions[activeQuestion]?.hard ?? false,
      question: questions[activeQuestion]?.question ?? '',
      answers: questions[activeQuestion]?.answers.length
        ? questions[activeQuestion]?.answers
        : [
            { name: '', correct: true },
            { name: '', correct: false },
            { name: '', correct: false },
          ],
    });
    setHard(questions[activeQuestion]?.hard ?? false);
  }, [activeQuestion, questions]);

  const addAnswer = () => {
    append({ name: '', correct: false });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.id) {
      //@ts-ignore
      data.unitId = unitId;
      //@ts-ignore
      const id = await addQuestionWithAnswers(data);
      toast({
        title: 'Question created successfully',
      });
      data.id = id;
    } else {
      //@ts-ignore
      await updateQuestionWithAnswers(data);
      toast({
        title: 'Question updated successfully',
      });
    }

    questions[activeQuestion] = data;
    setQuestions([...questions]);
  }

  return (
    <Form {...form}>
      <div className="flex justify-around">
        <form
          onSubmit={form.handleSubmit(formData => onSubmit(formData))}
          className="flex flex-col max-w-3xl w-full p-6 space-y-4"
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <div className="flex flex-row items-start gap-4">
                <FormItem className="flex-1">
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter question"
                      className="h-24 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <div className="flex flex-col items-start gap-4">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="relative top-[2rem] text-xl"
                          type="button"
                          variant="outline"
                          size={'icon'}
                          onClick={() => {
                            const newDifficulty = !form.getValues().hard;
                            form.setValue('hard', newDifficulty);
                            setHard(newDifficulty);
                          }}
                        >
                          {hard ? '🧠' : '🙂'}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={10} side="top">
                        {hard ? 'Hard' : 'Normal'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <ConfirmDialog
                    onConfirm={() => {
                      deleteQuestion(questions[activeQuestion].id);
                      setQuestions(
                        questions.filter(
                          q => q.id !== questions[activeQuestion].id,
                        ),
                      );
                      setActiveQuestion(0);
                      toast({
                        title: 'Question deleted successfully',
                        variant: 'primary',
                      });
                    }}
                  >
                    <Button
                      className="relative top-[2rem]"
                      type="button"
                      variant="destructive"
                      size={'icon'}
                      disabled={!questions[activeQuestion]?.id}
                    >
                      <Trash2 />
                    </Button>
                  </ConfirmDialog>
                </div>
              </div>
            )}
          />
          {fields.map((f, index) => (
            <FormField
              key={f.id}
              control={form.control}
              name={`answers.${index}.name`}
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
                    variant={
                      form.getValues().answers[index].correct
                        ? 'success'
                        : 'secondary'
                    }
                    size={'icon'}
                    onClick={() => {
                      const newAnswers = form.getValues().answers;
                      newAnswers[index].correct = !newAnswers[index].correct;
                      form.setValue('answers', newAnswers);
                    }}
                  >
                    <Check />
                  </Button>
                  <Button
                    className="relative top-[2rem]"
                    type="button"
                    variant={fields.length <= 2 ? 'secondary' : 'destructive'}
                    size={'icon'}
                    disabled={fields.length <= 2}
                    onClick={() => remove(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              )}
            />
          ))}
          <Button type="button" variant="outline" onClick={addAnswer}>
            Add Answer
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>
  );
}
