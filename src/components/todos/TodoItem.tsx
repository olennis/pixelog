import { cn } from '@/lib/utils';
import { useTodoStore } from '@/stores/todoStore';
import { useGoalStore } from '@/stores/goalStore';
import type { Todo } from '@/types';
import { Check, Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleComplete, deleteTodo } = useTodoStore();
  const { goals, updateProgress } = useGoalStore();

  const goal = goals.find((g) => g.id === todo.goalId);

  const handleToggle = () => {
    toggleComplete(todo.id);
    
    // 목표 진행률 업데이트
    if (goal && todo.value) {
      const delta = todo.completed ? todo.value : -todo.value;
      updateProgress(goal.id, delta);
    }
  };

  const handleDelete = () => {
    if (goal && todo.value && todo.completed) {
      updateProgress(goal.id, -todo.value);
    }
    deleteTodo(todo.id);
  };

  const displayText = todo.value && goal?.unit
    ? `${todo.value}${goal.unit} ${todo.content}`
    : todo.content;

  return (
    <div
      className={cn(
        'group flex items-center gap-3 p-2 rounded-md',
        'hover:bg-muted/50 transition-colors'
      )}
    >
      {/* 체크박스 */}
      <button
        onClick={handleToggle}
        className={cn(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
          todo.completed
            ? 'border-transparent'
            : 'border-muted-foreground/30 hover:border-muted-foreground/50'
        )}
        style={{
          backgroundColor: todo.completed ? goal?.color : 'transparent',
        }}
      >
        {todo.completed && <Check className="w-3 h-3 text-background" />}
      </button>

      {/* 색상 도트 & 내용 */}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: goal?.color || '#888' }}
        />
        <span
          className={cn(
            'text-sm truncate',
            todo.completed && 'line-through text-muted-foreground'
          )}
        >
          {displayText}
        </span>
      </div>

      {/* 삭제 버튼 */}
      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 rounded transition-opacity"
      >
        <Trash2 className="w-3.5 h-3.5 text-destructive" />
      </button>
    </div>
  );
}
