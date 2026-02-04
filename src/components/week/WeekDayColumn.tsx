import { useState } from 'react';
import { cn } from '@/lib/utils';
import { WeekTaskItem } from './WeekTaskItem';
import { useWeekTaskStore } from '@/stores/weekTaskStore';
import { parseDate, isToday, DAY_NAMES } from '@/utils/date';

interface WeekDayColumnProps {
  date: string;
  dayIndex: number; // 0=월 ~ 6=일
}

export function WeekDayColumn({ date, dayIndex }: WeekDayColumnProps) {
  const { tasks, assignDate } = useWeekTaskStore();
  const [isDragOver, setIsDragOver] = useState(false);

  const { day } = parseDate(date);
  const todayCell = isToday(date);
  const dayTasks = tasks.filter((t) => t.date === date);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('weekTaskId');
    if (taskId) {
      assignDate(taskId, date);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'flex-1 flex flex-col min-w-0 border-r border-border/40 last:border-r-0 transition-colors',
        isDragOver && 'bg-primary/5 ring-2 ring-inset ring-primary/30'
      )}
    >
      {/* 날짜 헤더 */}
      <div
        className={cn(
          'flex flex-col items-center py-2 border-b border-border/40',
          todayCell && 'bg-primary/10'
        )}
      >
        <span className="text-xs text-muted-foreground">{DAY_NAMES[dayIndex]}</span>
        <span
          className={cn(
            'text-sm font-semibold mt-0.5 w-6 h-6 flex items-center justify-center rounded-full',
            todayCell && 'bg-primary text-primary-foreground'
          )}
        >
          {day}
        </span>
      </div>

      {/* 배정된 태스크 목록 */}
      <div className="flex-1 p-1 overflow-y-auto">
        {dayTasks.length === 0 && isDragOver && (
          <div className="text-xs text-primary/60 text-center py-8">여기에 드롭</div>
        )}
        <div className="space-y-0.5">
          {dayTasks.map((task) => (
            <WeekTaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
