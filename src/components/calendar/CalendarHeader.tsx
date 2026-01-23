import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/uiStore';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

export function CalendarHeader() {
  const { currentYear, setCurrentYear, zoomLevel, zoomIn, zoomOut } = useUIStore();

  return (
    <div className="flex items-center justify-between px-4 h-[60px] border-b border-border">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentYear(currentYear - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <button
          onClick={() => setCurrentYear(new Date().getFullYear())}
          className="text-lg font-bold px-3 py-1 rounded hover:bg-muted transition-colors"
        >
          {currentYear}
        </button>

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentYear(currentYear + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={zoomOut}
          disabled={zoomLevel <= 0.5}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-xs text-muted-foreground w-12 text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={zoomIn}
          disabled={zoomLevel >= 3}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
