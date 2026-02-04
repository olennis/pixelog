import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { WeekTaskSidebar } from '@/components/week/WeekTaskSidebar';
import { useUIStore } from '@/stores/uiStore';

export function Layout() {
  const { viewMode } = useUIStore();

  return (
    <div className="h-screen w-full flex bg-background">
      {viewMode === 'week' ? <WeekTaskSidebar /> : <Sidebar />}
      <MainContent />
    </div>
  );
}
