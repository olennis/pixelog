import { cn } from '@/lib/utils';
import { GoalProgress } from './GoalProgress';
import type { Goal } from '@/types';
import { useUIStore } from '@/stores/uiStore';
import { useTodoStore } from '@/stores/todoStore';
import { Pencil } from 'lucide-react';

interface GoalItemProps {
  goal: Goal;
}

export function GoalItem({ goal }: GoalItemProps) {
  const { selectedGoalId, setSelectedGoal, openGoalModal } = useUIStore();
  const { todos } = useTodoStore();
  const isSelected = selectedGoalId === goal.id;

  const todoSum = todos
    .filter((t) => t.goalId === goal.id)
    .reduce((sum, t) => sum + (t.value || 0), 0);
  const currentValue = todoSum || goal.currentValue;

  const handleClick = () => {
    if (isSelected) {
      setSelectedGoal(null);
    } else {
      setSelectedGoal(goal.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    openGoalModal(goal.id);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'group p-2.5 rounded-lg cursor-pointer transition-all',
        'hover:bg-muted/50',
        isSelected && 'bg-muted ring-1 ring-primary/50'
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: goal.color }}
        />
        <span className="text-sm font-medium truncate flex-1">{goal.title}</span>
        <button
          onClick={handleEdit}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
        >
          <Pencil className="w-3 h-3 text-muted-foreground" />
        </button>
      </div>

      {/* 프로그레스 */}
      {goal.targetValue && (
        <GoalProgress
          current={currentValue}
          target={goal.targetValue}
          unit={goal.unit}
          color={goal.color}
        />
      )}
    </div>
  );
}
