interface GoalProgressProps {
  current: number;
  target?: number;
  unit?: string;
  color: string;
}

export function GoalProgress({ current, target, unit, color }: GoalProgressProps) {
  const percentage = target ? Math.min((current / target) * 100, 100) : 0;

  return (
    <div className="space-y-1">
      {/* 프로그레스 바 */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* 수치 표시 */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {current}
          {unit}
        </span>
        {target && (
          <span>
            {target}
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
