'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Unit } from '@/schemas/units';
import { FormInputs, UnitForm } from '../create-unit';
import { toast } from '@/components/ui/use-toast';
import { deleteUnit, updateUnit } from '@/controllers/unit';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const columns: ColumnDef<Unit>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  // {
  //   accessorKey: 'email',
  //   header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Email
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       )
  //     },
  // },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const router = useRouter();

      const handleDelete = async () => {
        try {
          await deleteUnit(row.original.id);
          router.refresh();
          toast({ title: 'Unit deleted successfully', variant: 'primary' });
        } catch (error) {
          const errorMessage = (error as Error).message;
          toast({
            title: 'Failed to delete subject',
            description: errorMessage,
            variant: 'destructive',
          });
        }
      };

      return (
        <div className="w-full h-full text-right">
          <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-4 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>View questions</DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit unit</DialogTitle>
                <DialogDescription>
                  Fill in the details to update this unit
                </DialogDescription>
              </DialogHeader>
              <UnitForm
                subjectId={Number(row.original.id)}
                defaultName={row.original.name}
                defaultDescription={row.original.description}
                defaultQuestionsPerQuiz={row.original.questionsPerQuiz}
                onSubmit={async data => {
                  setOpen(false);
                  await onSubmit(data, row.original.id);
                  router.refresh();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

const onSubmit = async (data: FormInputs, unitId: number) => {
  // setOpen(false);

  try {
    //@ts-ignore
    const result = await updateUnit(unitId, data);
    //@ts-ignore
    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Failed to add subject',
        //@ts-ignore
        description: result?.error.message,
      });
    } else {
      toast({
        title: 'Unit updated successfully',
        variant: 'primary',
      });
    }
  } catch (error) {
    console.error('error', error);
    const errorMessage = (error as Error).message;
    toast({
      variant: 'destructive',
      title: 'An error occurred',
      description: errorMessage,
    });
  }
};

export default columns;
