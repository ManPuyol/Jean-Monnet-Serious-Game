import Link from 'next/link';
import * as React from 'react';
import { CircleUser, Library  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/ModeToggle';

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-screen h-full overflow-clip w-full">
      <div className="flex flex-col h-full">
        <header className="flex end justify-between h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <Link href='/study'>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Library  className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </Link>
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={'/sign-in'}>Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
