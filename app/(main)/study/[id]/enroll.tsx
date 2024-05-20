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
import {
  allSubjects,
  enrollSubjects,
  getNotEnrolledSubjects,
} from '@/controllers/subjects';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function Enroll() {
  const [open, setOpen] = React.useState(false);
  const [selectedSubjects, setSelectedSubjects] = React.useState<any[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isPending, startTransition] = useTransition();
  const userId = 'e51f9ddf-4534-49e5-b1ff-aef5a43c8256';
  const router = useRouter();

  React.useEffect(() => {
    startTransition(() => {
      getNotEnrolledSubjects(userId).then(setSubjects);
    });
  }, []);

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
            More subjects
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Enroll in a new subject</DialogTitle>
            <DialogDescription>
              Start learning about other topics
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
            <CommandInput placeholder="Search subject..." />
            <CommandList>
              <CommandEmpty>
                {isPending ? (
                  <div className="flex justify-center">
                    <LoaderCircle className={cn(' animate-spin')} />
                  </div>
                ) : (
                  'No subjects found.'
                )}
              </CommandEmpty>
              <CommandGroup className="p-2">
                {subjects.map(subject => (
                  <CommandItem
                    key={subject.name}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedSubjects.includes(subject)) {
                        return setSelectedSubjects(
                          selectedSubjects.filter(
                            selectedUser => selectedUser !== subject,
                          ),
                        );
                      }

                      return setSelectedSubjects(
                        [...subjects].filter(u =>
                          [...selectedSubjects, subject].includes(u),
                        ),
                      );
                    }}
                  >
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {subject.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {subject.description}
                      </p>
                    </div>
                    {selectedSubjects.includes(subject) ? (
                      <Check className="ml-auto flex h-5 w-5 text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between  ">
            {selectedSubjects.length > 0 ? (
              <p className="text-sm text-muted-foreground">
                {selectedSubjects.length} subjects selected
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select subjects to enroll in
              </p>
            )}
            <Button
              disabled={selectedSubjects.length < 1}
              onClick={() => {
                const subjectIds = selectedSubjects.map(subject => subject.id);
                setOpen(false);
                enrollSubjects(userId, subjectIds);
                router.push(`/study/${subjectIds[0]}`);
              }}
            >
              Enroll
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
