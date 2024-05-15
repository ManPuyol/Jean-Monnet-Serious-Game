'use client';
import React from 'react';
import { DataTable } from './data-table';
import columns from './columns';
import { Unit } from '@/schemas/units';
import { getUnitsFromSubject } from '@/controllers/unit';

export default function UnitTable({ subjectId }: { subjectId: number }) {
  const [units, setUnits] = React.useState<Unit[]>([]);
  React.useEffect(() => {
    getUnitsFromSubject(subjectId).then(units => {
      setUnits(units);
    });
  }, []);

  return (
    <>
      <DataTable columns={columns} data={units} />
    </>
  );
}
