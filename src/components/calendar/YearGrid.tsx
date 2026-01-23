import { GridHeader } from './GridHeader';
import { MonthRow } from './MonthRow';
import { useUIStore } from '@/stores/uiStore';
import { useGoalStore } from '@/stores/goalStore';
import { useTodoStore } from '@/stores/todoStore';
import { useGridZoom } from '@/hooks/useGridZoom';

const MONTHS = Array.from({ length: 12 }, (_, i) => i);
const MONTH_LABEL_WIDTH = 60;

export function YearGrid() {
  const { currentYear, selectedGoalId } = useUIStore();
  const { goals } = useGoalStore();
  const { todos } = useTodoStore();
  const { containerRef, containerWidth, cellWidth, handleWheel } = useGridZoom(31, MONTH_LABEL_WIDTH);

  const yearGoals = goals.filter((g) => g.year === currentYear);

  return (
    <div ref={containerRef} className="year-grid-container h-full w-full overflow-x-auto overflow-y-hidden" onWheel={handleWheel}>
      <table
        className={`border-collapse h-full w-full table-fixed transition-opacity duration-150 ${containerWidth === 0 ? 'opacity-0' : 'opacity-100'}`}
        style={{ '--cell-width': `${cellWidth}px` } as React.CSSProperties}
      >
        <GridHeader />
        <tbody>
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
