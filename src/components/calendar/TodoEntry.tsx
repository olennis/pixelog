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
        'flex items-center gap-1.5 text-xs truncate',
        completed && 'line-through opacity-50'
      )}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="truncate" title={displayText}>
        {displayText}
      </span>
    </div>
  );
}
