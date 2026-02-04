import { useState, useCallback, useEffect } from 'react';
import { Sun, Moon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WeekTaskItem } from './WeekTaskItem';
import { useWeekTaskStore } from '@/stores/weekTaskStore';
import { useUIStore } from '@/stores/uiStore';
import { useGoalStore } from '@/stores/goalStore';
import { Input } from '@/components/ui/input';
import { parseDate } from '@/utils/date';

export function WeekTaskSidebar() {
  const { sidebarWidth, setSidebarWidth, theme, toggleTheme, currentWeekStart } = useUIStore();
  const { tasks, addTask } = useWeekTaskStore();
  const { goals } = useGoalStore();
  const [isResizing, setIsResizing] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  const weekYear = parseDate(currentWeekStart).year;
  const yearGoals = goals.filter((g) => g.year === weekYear);

  const unassignedTasks = tasks.filter((t) => t.date === null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask, selectedGoalId);
    setNewTask('');
  };

  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;
      setSidebarWidth(e.clientX);
    },
    [isResizing, setSidebarWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <aside
      className="h-full border-r border-border bg-muted/20 flex flex-col relative"
      style={{ width: sidebarWidth }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 h-[60px] border-b border-border">
        <h2 className="text-sm font-semibold text-muted-foreground">태스크</h2>
      </div>

      {/* 태스크 입력 */}
      <form onSubmit={handleAdd} className="p-2 border-b border-border">
        <div className="flex gap-1.5">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="새 태스크..."
            className="h-8 text-sm"
          />
          <button
            type="submit"
            disabled={!newTask.trim()}
            className="p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:pointer-events-none transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* 목표 연동 선택 */}
        {yearGoals.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {yearGoals.map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => setSelectedGoalId(selectedGoalId === goal.id ? null : goal.id)}
                className={cn(
                  'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs transition-colors',
                  selectedGoalId === goal.id
                    ? 'bg-muted ring-1 ring-primary text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: goal.color }} />
                <span className="truncate">{goal.title}</span>
              </button>
            ))}
          </div>
        )}
      </form>

      {/* 미배정 태스크 목록 */}
      <div className="flex-1 overflow-y-auto p-2">
        {unassignedTasks.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">
            미배정 태스크가 없습니다.<br />
            위에서 태스크를 추가하거나<br />
            주간 캘린더에 드래그해보세요.
          </p>
        ) : (
          <div className="space-y-0.5">
            {unassignedTasks.map((task) => (
              <WeekTaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {/* 테마 토글 */}
      <div className="p-2 border-t border-border">
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* 리사이즈 핸들 */}
      <div
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors"
        onMouseDown={handleMouseDown}
      />
    </aside>
  );
}
