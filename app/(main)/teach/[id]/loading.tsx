import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-full flex-1 items-center justify-center animate-in">
      <LoaderCircle className={cn("animate-spin h-10 w-10")} />
    </div>
  );
}
