'use client';
import * as React from 'react';
import { Check, LoaderCircle } from 'lucide-react';
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
  getEnrolledSubjects,
} from '@/controllers/subjects';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { User } from '@supabase/supabase-js';


export default function SubjectSelectionCard({user}: {user: User}) {
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
        getEnrolledSubjects(user.id as UUID).then(enrolledSubjects => {
          allSubjects().then(allSubjects => {
            const selectedSubjects = allSubjects.filter(subject =>
              enrolledSubjects.some(
                enrolledSubject => enrolledSubject.id === subject.id,
              ),
            );
            setSubjects(allSubjects);
            setSelectedSubjects(selectedSubjects);
          });
        });
    });
  }, []);

  return (
    <div className="h-[calc(100vh-60px)] p-6">
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>Select subject</CardTitle>
        </CardHeader>
        <CardContent className='h-full'>
          <Command className="overflow-hidden">
            <CommandInput placeholder="Search subject..." />
            <CommandList className="max-h-full">
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
                      if (!selectedSubjects.includes(subject)) {
                        enrollSubjects(user.id! as UUID, [subject.id]);
                      }
                      router.push(`/study/${subject.id}`);
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
                      <Check className="ml-auto flex h-5 w-5 min-w-5 min-h-5 text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
