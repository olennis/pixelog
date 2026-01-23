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

  return (
    <td
      onClick={handleClick}
      className={cn(
        'h-full p-1.5 align-top cursor-pointer transition-colors',
        'border-r border-border/20',
        'hover:bg-primary/5',
        isTodayCell && 'bg-primary/10 ring-2 ring-primary/50 ring-inset',
      )}
      style={{ minWidth: 'var(--cell-width)', maxWidth: 'var(--cell-width)' }}
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
