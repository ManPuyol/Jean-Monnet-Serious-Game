'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function AddUnit() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Unit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add unit</DialogTitle>
          <DialogDescription>Add a new unit to this subject</DialogDescription>
        </DialogHeader>
        <UnitForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUnit } from '@/controllers/unit';
import { insertUnitSchema, units } from '@/schemas/units';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

type FormInputs = z.infer<typeof insertUnitSchema>;

function UnitForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const form = useForm<FormInputs>({
    resolver: zodResolver(insertUnitSchema),
  });
  const { control, handleSubmit, formState, setError, clearErrors } = form;

  const onSubmit = async (data: FormInputs) => {
    setOpen(false);

    data.subjectId = JSON.parse(localStorage.getItem('activeSubject')!).id!;

    try {
      const result = await addUnit(data);
      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Failed to add subject',
          description: result?.error.message,
        });
      } else {
        toast({
          title: 'Unit added successfully',
          variant: 'primary',
        });
      }
    } catch (error) {
      console.error('error', error);
      const errorMessage = (error as Error).message;
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: errorMessage,
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="questionsPerQuiz"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Questions per quiz</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    defaultValue={10}
                    onKeyDown={evt =>
                      ['e', 'E', '+', '-'].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button onClick={handleSubmit(onSubmit)}>Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
