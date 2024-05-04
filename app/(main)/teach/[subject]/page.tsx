'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useEffect, useState } from 'react';
import { Subject } from '@/schemas/subjects';
import { useRouter } from 'next/navigation';
import UnitTable from './UnitTable';
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
import { deleteSubject } from '@/controllers/subjects';
export default function page() {
  const router = useRouter();

  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const subject = JSON.parse(localStorage.getItem('activeSubject') as string);
    if (!subject) {
      router.push('/teach');
    }

    setActiveSubject(subject);
  }, []);

  return (
    <div className="p-6">
      {/* <Breadcrumb>
        <BreadcrumbList> */}
      {/* <BreadcrumbItem>
          <BreadcrumbLink href="/">Subject</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
      {/* <BreadcrumbItem>
            <BreadcrumbPage>{activeSubject?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {activeSubject?.name}
      </h1>
      <span className='text-muted-foreground text-lg space-y-2 antialiased'>{activeSubject?.description} </span>

      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            // onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            onClick={() => deleteSubject(activeSubject!.id)}
            >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      {activeSubject && <UnitTable subjectId={activeSubject.id} />}
    </div>
  );
}
