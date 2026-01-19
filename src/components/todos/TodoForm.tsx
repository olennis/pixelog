import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodoStore } from '@/stores/todoStore';
import { useGoalStore } from '@/stores/goalStore';
import { useUIStore } from '@/stores/uiStore';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  date: string;
}

export function TodoForm({ date }: TodoFormProps) {
  const { addTodo } = useTodoStore();
  const { goals, updateProgress } = useGoalStore();
  const { currentYear } = useUIStore();

  const yearGoals = goals.filter((g) => g.year === currentYear);

  const [content, setContent] = useState('');
  const [value, setValue] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState(yearGoals[0]?.id || '');

  const selectedGoal = goals.find((g) => g.id === selectedGoalId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !selectedGoalId) return;

    const numValue = value ? Number(value) : undefined;

    addTodo({
      goalId: selectedGoalId,
      date,
      content: content.trim(),
      value: numValue,
      completed: false,
    });

    // 목표 진행률 업데이트
    if (numValue && selectedGoal) {
      updateProgress(selectedGoalId, numValue);
    }

    setContent('');
    setValue('');
  };

  if (yearGoals.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-muted-foreground">
        먼저 목표를 추가해주세요
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* 목표 선택 */}
      <div className="flex flex-wrap gap-2">
        {yearGoals.map((goal) => (
          <button
            key={goal.id}
            type="button"
            onClick={() => setSelectedGoalId(goal.id)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all
              ${
                selectedGoalId === goal.id
                  ? 'ring-2 ring-offset-2 ring-offset-background'
                  : 'opacity-60 hover:opacity-100'
              }
            `}
            style={{
              backgroundColor: `${goal.color}20`,
              color: goal.color,
              ...(selectedGoalId === goal.id && { ringColor: goal.color }),
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: goal.color }}
            />
            {goal.title}
          </button>
        ))}
      </div>

      {/* 입력 필드 */}
      <div className="flex gap-2">
        {selectedGoal?.unit && (
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={selectedGoal.unit}
            className="w-20"
          />
        )}
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="활동 내용"
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!content.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
