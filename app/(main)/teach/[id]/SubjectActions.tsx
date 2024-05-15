'use client';
import { Subject } from '@/schemas/subjects';
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
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

export function SubjectActions({ subject }: { subject: Subject }) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteSubject(subject.id);
      toast({ title: 'Subject deleted successfully', variant: 'primary' });
      router.push('/teach');
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem // onClick={() => navigator.clipboard.writeText(payment.id)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
