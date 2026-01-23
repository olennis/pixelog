import { cn } from '@/lib/utils';

interface TodoEntryProps {
  content: string;
  value?: number;
  unit?: string;
  color: string;
  completed: boolean;
}

export function TodoEntry({
  content,
  value,
  unit,
  color,
  completed,
}: TodoEntryProps) {
  const displayText = value && unit ? `${value}${unit} ${content}` : content;

  return (
    <div
      className={cn(
        'text-xs truncate rounded px-1',
        completed && 'line-through opacity-50'
      )}
      style={{ backgroundColor: `${color}30`, color }}
      title={displayText}
    >
      {displayText}
    </div>
  );
}
