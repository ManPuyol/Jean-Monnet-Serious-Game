import SidebarSubjects from '@/components/SidebarSubjects';

export default function StudentSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex-col md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:flex h-full max-h-screen flex-col">
        <SidebarSubjects />
      </div>
      <div className="h-[calc(100vh-60px)]">{children}</div>
    </div>
  );
}
