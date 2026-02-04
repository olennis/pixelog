import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/uiStore';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { getWeekDates, parseDate, getMonthName } from '@/utils/date';

export function CalendarHeader() {
  const {
    currentYear, setCurrentYear,
    zoomLevel, zoomIn, zoomOut,
    viewMode, setViewMode,
    currentWeekStart, prevWeek, nextWeek,
  } = useUIStore();

  const weekDates = getWeekDates(currentWeekStart);
  const startParsed = parseDate(weekDates[0]);
  const endParsed = parseDate(weekDates[6]);
  const weekLabel =
    startParsed.month === endParsed.month
      ? `${getMonthName(startParsed.month - 1)} ${startParsed.day} ~ ${endParsed.day}일`
      : `${getMonthName(startParsed.month - 1)} ${startParsed.day}일 ~ ${getMonthName(endParsed.month - 1)} ${endParsed.day}일`;

  return (
    <div className="flex items-center justify-between px-4 h-[60px] border-b border-border">
      {/* 좌측: 뷰 토글 + 네비 */}
      <div className="flex items-center gap-3">
        {/* 연간/주간 토글 (pill) */}
        <div className="flex bg-muted rounded-full p-0.5">
          <button
            onClick={() => setViewMode('year')}
            className={cn(
              'text-xs px-3 py-1 rounded-full transition-colors',
              viewMode === 'year' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            연간
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={cn(
              'text-xs px-3 py-1 rounded-full transition-colors',
              viewMode === 'week' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            주간
          </button>
        </div>

        {/* 모드별 네비 */}
        {viewMode === 'year' ? (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentYear(currentYear - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <button
              onClick={() => setCurrentYear(new Date().getFullYear())}
              className="text-lg font-bold px-2 py-1 rounded hover:bg-muted transition-colors"
            >
              {currentYear}
            </button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentYear(currentYear + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-semibold px-1">{weekLabel}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* 우측: 줌 (연간 모드에서만) */}
      {viewMode === 'year' && (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={zoomOut} disabled={zoomLevel <= 1}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={zoomIn} disabled={zoomLevel >= 3}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
