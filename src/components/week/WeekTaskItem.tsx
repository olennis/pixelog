import { cn } from '@/lib/utils';
import { useWeekTaskStore } from '@/stores/weekTaskStore';
import { useTodoStore } from '@/stores/todoStore';
import { useGoalStore } from '@/stores/goalStore';
import type { WeekTask } from '@/types';
import { Check, Trash2, GripVertical } from 'lucide-react';

interface WeekTaskItemProps {
  task: WeekTask;
}

export function WeekTaskItem({ task }: WeekTaskItemProps) {
  const { toggleComplete, deleteTask, assignDate } = useWeekTaskStore();
  const { todos, addTodo, deleteTodo } = useTodoStore();
  const { goals, updateProgress } = useGoalStore();

  const goal = task.goalId ? goals.find((g) => g.id === task.goalId) : undefined;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('weekTaskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleUnassign = () => {
    assignDate(task.id, null);
  };

  // 연간 캘린더와 동기화된 Todo 찾기
  const findLinkedTodo = () => {
    if (!task.goalId || !task.date) return undefined;
    return todos.find(
      (t) => t.goalId === task.goalId && t.date === task.date && t.content === task.content && t.completed
    );
  };

  const handleToggle = () => {
    const willComplete = !task.completed;
    toggleComplete(task.id);

    // 목표 연동 동기화: date + goalId가 모두 있는 경우만
    if (task.goalId && task.date) {
      if (willComplete) {
        addTodo({ goalId: task.goalId, date: task.date, content: task.content, value: 1, completed: true });
        updateProgress(task.goalId, 1);
      } else {
        const linkedTodo = findLinkedTodo();
        if (linkedTodo) {
          deleteTodo(linkedTodo.id);
          updateProgress(task.goalId, -1);
        }
      }
    }
  };

  const handleDelete = () => {
    if (task.completed && task.goalId && task.date) {
      const linkedTodo = findLinkedTodo();
      if (linkedTodo) {
        deleteTodo(linkedTodo.id);
        updateProgress(task.goalId, -1);
      }
    }
    deleteTask(task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={cn(
        'group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-grab active:cursor-grabbing',
        'hover:bg-muted/50 transition-colors',
        task.completed && 'opacity-60'
      )}
    >
      <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />

      {/* 체크 버튼 */}
      <button
        onClick={handleToggle}
        className={cn(
          'w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0',
          task.completed
            ? (goal ? 'border-transparent' : 'border-primary bg-primary')
            : 'border-muted-foreground/30 hover:border-primary'
        )}
        style={task.completed && goal ? { backgroundColor: goal.color } : undefined}
      >
        {task.completed && <Check className={cn('w-2.5 h-2.5', goal ? 'text-background' : 'text-primary-foreground')} />}
      </button>

      {/* 목표 색상 도트 */}
      {goal && (
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: goal.color }} />
      )}

      {/* 내용 */}
      <span className={cn('text-sm flex-1 truncate', task.completed && 'line-through text-muted-foreground')}>
        {task.content}
      </span>

      {/* 날짜 해제 버튼 (배정된 경우) */}
      {task.date && (
        <button
          onClick={handleUnassign}
          className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground hover:text-foreground transition-opacity px-1"
        >
          해제
        </button>
      )}

      {/* 삭제 버튼 */}
      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/20 rounded transition-opacity"
      >
        <Trash2 className="w-3.5 h-3.5 text-destructive" />
      </button>
    </div>
  );
}
