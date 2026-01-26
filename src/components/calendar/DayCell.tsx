import { cn } from '@/lib/utils';
import { TodoEntry } from './TodoEntry';
import { useUIStore } from '@/stores/uiStore';
import type { Todo, Goal } from '@/types';
import { isToday } from '@/utils/date';

interface DayCellProps {
  date: string | null;
  isValid: boolean;
  todos: Todo[];
  goals: Goal[];
  selectedGoalId: string | null;
}

export function DayCell({
  date,
  isValid,
  todos,
  goals,
  selectedGoalId,
}: DayCellProps) {
  const { openTodoModal, setSelectedDate } = useUIStore();

  const filteredTodos = selectedGoalId
    ? todos.filter((t) => t.goalId === selectedGoalId)
    : todos;

  const handleClick = () => {
    if (!isValid || !date) return;
    setSelectedDate(date);
    openTodoModal(date);
  };

  if (!isValid) {
    return (
      <td
        className="h-full p-1 bg-muted/10 border-r border-border/20"
        style={{ minWidth: 'var(--cell-width)' }}
      >
        {/* 존재하지 않는 날짜 */}
      </td>
    );
  }

  const isTodayCell = date ? isToday(date) : false;
  const maxItems = 3;

  // 투두가 있는 경우 목표 색상 기반 배경색 계산
  const getCellBackground = () => {
    if (filteredTodos.length === 0) return undefined;

    // 각 목표별 투두 개수 집계
    const colorCounts: Record<string, number> = {};
    filteredTodos.forEach((todo) => {
      const goal = goals.find((g) => g.id === todo.goalId);
      const color = goal?.color || '#888';
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    });

    // 가장 많은 투두를 가진 색상 찾기
    const dominantColor = Object.entries(colorCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    // 투두 개수에 따른 opacity (1개: 20%, 2개: 35%, 3개+: 50%)
    const opacity = Math.min(0.2 + filteredTodos.length * 0.15, 0.5);

    return `${dominantColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  const cellBg = getCellBackground();

  return (
    <td
      onClick={handleClick}
      className={cn(
        'h-full p-1.5 align-top cursor-pointer transition-colors',
        'border-r border-border/20',
        !cellBg && 'hover:bg-primary/5',
        isTodayCell && 'ring-2 ring-primary/50 ring-inset',
      )}
      style={{
        minWidth: 'var(--cell-width)',
        maxWidth: 'var(--cell-width)',
        backgroundColor: cellBg,
      }}
    >
      <div className="flex flex-col gap-0.5 overflow-hidden h-full w-full">
        {filteredTodos.slice(0, maxItems).map((todo) => {
          const goal = goals.find((g) => g.id === todo.goalId);
          return (
            <TodoEntry
              key={todo.id}
              content={todo.content}
              value={todo.value}
              unit={goal?.unit}
              color={goal?.color || '#888'}
              completed={todo.completed}
            />
          );
        })}

        {filteredTodos.length > 3 && (
          <span className="text-[10px] text-muted-foreground pl-3">
            +{filteredTodos.length - 3}개
          </span>
        )}
      </div>
    </td>
  );
}
