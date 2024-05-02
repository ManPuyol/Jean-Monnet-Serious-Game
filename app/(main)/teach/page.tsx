import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';

import { DataTable } from './data-table';

import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Subject } from '@/schemas/subjects';
import { allSubjects } from '@/controllers/subjects';
import { columns } from './columns';



export default async function page() {
  const subjects: Subject[] = await allSubjects();

  return (
    <div className='p-6'>
      <Breadcrumb>
        <BreadcrumbList>
          {/* <BreadcrumbItem>
          <BreadcrumbLink href="/">Subject</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbPage>Subject #1</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DataTable columns={columns} data={subjects} />
    </div>
  );
}
