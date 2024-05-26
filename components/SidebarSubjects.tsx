'use client';
import AddSubject from '@/app/(main)/teach/create-subject';
import SubjectNavigation from './SubjectNavigation';
import { Subject } from '@/schemas/subjects'; // Import the Subject type
import { useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SidebarSubjects({
  subjects,
}: {
  subjects: Array<Subject>;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex-1 md:border-r pt-2">
      <div className=" py-2">
        <div className="flex items-center pl-7 pr-3 justify-between mb-2">
          <h3 className="font-semibold text-lg tracking-tight">Subjects</h3>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="ml-auto rounded-full h-8 w-8"
              onClick={() => setOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <AddSubject />
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Find subject..." />
              <CommandList>
                <CommandEmpty>No subjects found.</CommandEmpty>
                <CommandGroup heading="Subjects">
                  {subjects.map(subject => (
                    <CommandItem
                      onSelect={() => {
                        setOpen(false);
                        router.push(`/teach/${subject.id}`);
                      }}
                    >
                      {subject.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
        </div>
        <SubjectNavigation subjects={subjects} path="teach" />
      </div>
    </div>
  );
}
