export function GridHeader() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <thead className="sticky top-0 z-20 bg-background">
      <tr className="border-b border-border">
        <th className="sticky left-0 z-30 bg-muted/30 min-w-[60px] max-w-[60px] w-[60px] p-2 text-left text-xs font-medium text-muted-foreground border-r border-border">
          {/* 빈칸 */}
        </th>
        {days.map((day) => (
          <th
            key={day}
            className="p-2 text-center text-xs font-medium text-muted-foreground border-r border-border/20"
            style={{ minWidth: 'var(--cell-width)' }}
          >
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
}
