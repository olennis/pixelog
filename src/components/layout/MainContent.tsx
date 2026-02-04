import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { YearGrid } from '@/components/calendar/YearGrid';
import { WeekGrid } from '@/components/week/WeekGrid';
import { useUIStore } from '@/stores/uiStore';

export function MainContent() {
  const { viewMode } = useUIStore();

  return (
    <main className="flex-1 h-full flex flex-col overflow-hidden">
      <CalendarHeader />
      <div className="flex-1 overflow-hidden">
        {viewMode === 'week' ? <WeekGrid /> : <YearGrid />}
      </div>
    </main>
  );
}
