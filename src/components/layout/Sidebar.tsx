import { useCallback, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { GoalList } from '@/components/goals/GoalList';
import { useUIStore } from '@/stores/uiStore';

export function Sidebar() {
  const { sidebarWidth, setSidebarWidth, theme, toggleTheme } = useUIStore();
  const [isResizing, setIsResizing] = useState(false);

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
      <GoalList />
      <div className="p-2 border-t border-border">
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
      <div
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors"
        onMouseDown={handleMouseDown}
      />
    </aside>
  );
}
