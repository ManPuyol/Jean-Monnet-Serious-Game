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

import { DataTable } from '../data-table';

import { Subject } from '@/schemas/subjects';
import { allSubjects } from '@/controllers/subjects';
import { columns } from '../columns';
import { useRouter } from 'next/navigation';

export default async function page() {
  const router = useRouter();

  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const subject = JSON.parse(localStorage.getItem('activeSubject') as string);
    if (!subject) {
      router.push('/teach');
    }

    setActiveSubject(subject);
  }, []);

  // const subjects: Subject[] = await allSubjects();

  return (
    <div className="p-6">
      <Breadcrumb>
        <BreadcrumbList>
          {/* <BreadcrumbItem>
          <BreadcrumbLink href="/">Subject</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbPage>{"-"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <DataTable columns={columns} data={subjects} /> */}
    </div>
  );
}
