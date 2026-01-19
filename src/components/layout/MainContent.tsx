import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { YearGrid } from '@/components/calendar/YearGrid';

export function MainContent() {
  return (
    <main className="flex-1 h-full flex flex-col overflow-hidden">
      <CalendarHeader />
      <div className="flex-1 overflow-hidden">
        <YearGrid />
      </div>
    </main>
  );
}
