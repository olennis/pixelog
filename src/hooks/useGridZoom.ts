import { useRef, useState, useEffect, useCallback } from 'react';
import { useUIStore } from '@/stores/uiStore';

export function useGridZoom(columns: number, labelWidth: number = 0) {
  const { zoomLevel, setZoomLevel } = useUIStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel(Math.round((zoomLevel + delta) * 100) / 100);
  }, [zoomLevel, setZoomLevel]);

  const cellWidth = containerWidth > 0
    ? Math.round(((containerWidth - labelWidth) / columns) * zoomLevel)
    : 0;

  return { containerRef, containerWidth, cellWidth, handleWheel };
}
