import StudentSidebar from '@/components/StudentSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LucideFileScan, LucideKanbanSquareDashed } from 'lucide-react';
import { getJSDocSatisfiesTag } from 'typescript';

export default function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = "9ad9571a-8c75-49ca-a658-9da64516dad7"
  return (
    <div className="md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:flex h-full max-h-screen flex-col">
        <StudentSidebar />
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">{children}</ScrollArea>
    </div>
  );
}
