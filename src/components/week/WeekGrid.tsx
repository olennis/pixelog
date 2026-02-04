import { WeekDayColumn } from './WeekDayColumn';
import { useUIStore } from '@/stores/uiStore';
import { getWeekDates } from '@/utils/date';

export function WeekGrid() {
  const { currentWeekStart } = useUIStore();
  const weekDates = getWeekDates(currentWeekStart);

  return (
    <div className="h-full flex overflow-hidden">
      {weekDates.map((date, i) => (
        <WeekDayColumn key={date} date={date} dayIndex={i} />
      ))}
    </div>
  );
}
