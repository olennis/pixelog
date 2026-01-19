import { GridHeader } from './GridHeader';
import { MonthRow } from './MonthRow';
import { useUIStore } from '@/stores/uiStore';
import { useGoalStore } from '@/stores/goalStore';
import { useTodoStore } from '@/stores/todoStore';

const MONTHS = Array.from({ length: 12 }, (_, i) => i);

export function YearGrid() {
  const { currentYear, selectedGoalId, zoomLevel } = useUIStore();
  const { goals } = useGoalStore();
  const { todos } = useTodoStore();

  const yearGoals = goals.filter((g) => g.year === currentYear);
    const cellWidth = Math.round(120 * zoomLevel);


  return (
        <div className="h-full w-full overflow-x-auto overflow-y-hidden pb-4">
      <table
        className="border-collapse h-full table-fixed"
        style={{ '--cell-width': `${cellWidth}px` } as React.CSSProperties}
      >
        <GridHeader />
        <tbody className="h-full">
          {MONTHS.map((monthIndex) => (
            <MonthRow
              key={monthIndex}
              monthIndex={monthIndex}
              year={currentYear}
              todos={todos}
              goals={yearGoals}
              selectedGoalId={selectedGoalId}
            
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
