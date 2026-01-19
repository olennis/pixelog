import { DayCell } from './DayCell';
import { getDaysInMonth, formatDate, getMonthName } from '@/utils/date';
import type { Todo, Goal } from '@/types';

interface MonthRowProps {
  monthIndex: number;
  year: number;
  todos: Todo[];
  goals: Goal[];
  selectedGoalId: string | null;
}

export function MonthRow({
  monthIndex,
  year,
  todos,
  goals,
  selectedGoalId,
}: MonthRowProps) {
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <tr className="border-b border-border/50 h-[calc(100%/12)]">
      {/* 월 라벨 */}
      <td className="sticky left-0 z-10 bg-background w-[100px] p-2 font-medium text-xs border-r border-border align-middle">
        {getMonthName(monthIndex)}
      </td>

      {/* 1~31일 셀 */}
      {days.map((day) => {
        const isValidDay = day <= daysInMonth;
        const dateStr = isValidDay
          ? formatDate(year, monthIndex + 1, day)
          : null;

        const dayTodos = dateStr
          ? todos.filter((t) => t.date === dateStr)
          : [];

        return (
          <DayCell
            key={day}
            date={dateStr}
            isValid={isValidDay}
            todos={dayTodos}
            goals={goals}
            selectedGoalId={selectedGoalId}
          />
        );
      })}
    </tr>
  );
}
