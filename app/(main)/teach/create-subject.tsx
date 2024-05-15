'use client';
import * as React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Check, LoaderCircle, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useEffect, useState, useTransition } from 'react';
import { Subject } from '@/schemas/subjects';
import { addSubject, allSubjects } from '@/controllers/subjects';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { insertSubjectSchema } from '@/schemas/subjects';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

type FormInputs = z.infer<typeof insertSubjectSchema>;

export default function AddSubject() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<FormInputs>({
    resolver: zodResolver(insertSubjectSchema),
  });

  const { control, handleSubmit } = form;

  const onSubmit = async ({ name, description }: FormInputs) => {
    setOpen(false);

    try {
      const result: { id: number; error?: Error }[] = await addSubject({ name, description });
      if (result[0]?.error) {
        toast({
          variant: 'destructive',
          title: 'Failed to add subject',
          description: result[0]?.error.message,
        });
      } else {
        toast({
          title: 'Subject added successfully',
          variant: 'primary',
        });
        router.push(`/teach/${result[0].id}`)
      }
    } catch (error) {
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
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="ml-auto rounded-full h-8 w-8"
              onClick={() => setOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">New subject</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={10} side="right">
            Add subject
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add subject</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new subject
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
