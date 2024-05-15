import StudentSidebar from '@/components/StudentSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LucideFileScan, LucideKanbanSquareDashed } from 'lucide-react';

export default function Sidebar({
  children, params
}: {
  children: React.ReactNode;
  params: {id: string};
}) {
  const userId = 'e51f9ddf-4534-49e5-b1ff-aef5a43c8256'
  return (
    <div className="md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:flex h-full max-h-screen flex-col">
        <StudentSidebar activeSubjectId={params.id} />
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">{children}</ScrollArea>
    </div>
  );
}
