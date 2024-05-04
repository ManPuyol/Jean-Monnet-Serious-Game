'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function AddUnit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Unit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add unit</DialogTitle>
          <DialogDescription>Add a new unit to this subject</DialogDescription>
        </DialogHeader>
        <UnitForm />
      </DialogContent>
    </Dialog>
  );
}

import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUnit } from '@/controllers/unit';
import { insertUnitSchema, units } from '@/schemas/units';

type FormInputs = z.infer<typeof insertUnitSchema>;

function UnitForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(insertUnitSchema),
  });

  const onSubmit = async (data: FormInputs) => {
    const subjectId: number = JSON.parse(
      localStorage.getItem('activeSubject')!,
    )?.id;
    data.subjectId = subjectId;
    console.log(data, subjectId);

    await addUnit(data);
  };

  return (
    <>
      <form>
        {/* <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              id="name"
              placeholder="Tema 1"
              className="col-span-3"
            />
          )}
        />
        {errors.name && <p>{errors.name.message}</p>} */}

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              id="description"
              placeholder="..."
              className="col-span-3"
            />
          )}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <Controller
          name="questionsPerQuiz"
          control={control}
          defaultValue={10}
          render={({ field }) => (
            <Input
              {...field}
              id="questions"
              className="col-span-3"
              value={Number(field.value)}
            />
          )}
        />
        {errors.questionsPerQuiz && <p>{errors.questionsPerQuiz.message}</p>}
      </form>
      <DialogFooter>
        <Button onClick={handleSubmit(onSubmit)}>Save changes</Button>
      </DialogFooter>
    </>
  );
}
