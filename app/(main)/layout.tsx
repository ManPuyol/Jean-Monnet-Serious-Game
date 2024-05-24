import * as React from 'react';
import { CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/ModeToggle';
import StudyLink from '@/components/StudyLink';
import { LogOutLink } from '@/components/LogOutLink';
import { getUser } from '@/lib/utils';
import Link from 'next/link';

export default async function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <div className="max-h-screen h-full overflow-clip w-full">
      <div className="flex flex-col h-full">
        <header className="flex end justify-between h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <StudyLink />
          <div id="logo" className="items-center">
            Jean Monnet
          </div>
          <div className="flex gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                {user?.user_metadata.role == 'teacher' && (
                  <>
                    <Link href={'/teach'}>
                      <DropdownMenuItem>Teach</DropdownMenuItem>
                    </Link>
                    <Link href={'/study'}>
                      <DropdownMenuItem>Study</DropdownMenuItem>
                    </Link>
                  </>
                )}
                <DropdownMenuSeparator />
                <LogOutLink />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
