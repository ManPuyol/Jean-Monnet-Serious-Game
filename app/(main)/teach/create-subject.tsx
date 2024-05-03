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
import { toast } from "@/components/ui/use-toast";

export default function AddSubject() {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    // TODO validate data & avoid useState
    event.preventDefault();
    console.log({ name, description });
    setOpen(false);
   
    try {
      const result = await addSubject({ name, description });
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Failed to add subject",
          description: result?.error.message,
        });
      } else {
        toast({
          title: "Subject added successfully",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error.message,
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
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name='name'
                placeholder="Unit 1"
                className="col-span-3"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name='description'
                placeholder="..."
                className="col-span-3"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <Button type="submit">Save changes</Button>
          </form>
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
