import StudentSidebar from '@/components/StudentSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:flex h-full max-h-screen flex-col">
        <StudentSidebar />
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">{children}</ScrollArea>
    </div>
  );
}
