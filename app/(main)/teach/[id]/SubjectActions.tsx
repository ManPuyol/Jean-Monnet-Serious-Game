'use client';
import { Subject } from '@/schemas/subjects';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { deleteSubject, updateSubject } from '@/controllers/subjects';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import * as React from 'react';
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
import { useState } from 'react';

type FormInputs = z.infer<typeof insertSubjectSchema>;

export function SubjectActions({ subject }: { subject: Subject }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteSubject(subject.id);
      router.push('/teach');
      router.refresh();
      toast({ title: 'Subject deleted successfully', variant: 'primary' });
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast({
        title: 'Failed to delete subject',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit subject</DialogTitle>
          <DialogDescription>
            Fill in the details to update this subject
          </DialogDescription>
        </DialogHeader>
        <EditSubject
          setOpen={setOpen}
          subjectId={subject.id}
          defaultName={subject.name}
          defaultDescription={subject.description}
        />
      </DialogContent>
    </Dialog>
  );
}

export default function EditSubject({
  subjectId,
  defaultName = '',
  defaultDescription = '',
  setOpen,
}: {
  subjectId: number;
  defaultName?: string;
  defaultDescription?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const form = useForm<FormInputs>({
    resolver: zodResolver(insertSubjectSchema),
    defaultValues: {
      name: defaultName,
      description: defaultDescription,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async ({ name, description }: FormInputs) => {
    setOpen(false);
    try {
      const result: { id: number; error?: Error }[] = await updateSubject(
        subjectId,
        {
          name,
          description,
        },
      );
      if (result[0]?.error) {
        toast({
          variant: 'destructive',
          title: 'Failed to add subject',
          description: result[0]?.error.message,
        });
      } else {
        router.refresh();
        toast({
          title: 'Subject updated successfully',
          variant: 'primary',
        });
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
  );
}
