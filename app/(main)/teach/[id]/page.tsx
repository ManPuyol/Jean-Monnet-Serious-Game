import { redirect } from 'next/navigation';
import { getSubject } from '@/controllers/subjects';
import columns from './columns';
import { DataTable } from './data-table';
import { SubjectActions } from './SubjectActions';

export default async function page({
  params,
}: {
  params: { id: string };
}) {
  let subject;
  try {
    subject = await getSubject(params.id as unknown as number);
  } catch (error) {
    redirect('/teach');
  }

  return (
    <div className="p-6 h-full">
      <h1 className="flex justify-between gap-4 items-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {subject!.name}
        <SubjectActions subject={subject} />
      </h1>
      <span className="text-muted-foreground text-lg space-y-2 antialiased">
        {subject!.description}
      </span>
      <DataTable columns={columns} data={subject!.units} />
    </div>
  );
}
