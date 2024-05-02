"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
  import { ColumnDef } from '@tanstack/react-table';
import { Subject } from '@/schemas/subjects';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';




export const columns: ColumnDef<Subject>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    //   {
    //     accessorKey: 'email',
    //     header: ({ column }) => {
    //         return (
    //           <Button
    //             variant="ghost"
    //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //           >
    //             Email
    //             <ArrowUpDown className="ml-2 h-4 w-4" />
    //           </Button>
    //         )
    //       },
    //   },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        //   const payment = row.original;
  
        return (
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
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];