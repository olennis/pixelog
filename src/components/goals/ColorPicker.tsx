import { cn } from '@/lib/utils';
import { COLOR_PALETTE } from '@/constants/colors';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLOR_PALETTE.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => onChange(color.value)}
          className={cn(
            'w-7 h-7 rounded-full transition-all',
            'hover:scale-110 hover:ring-2 hover:ring-white/30',
            value === color.value && 'ring-2 ring-white ring-offset-2 ring-offset-background'
          )}
          style={{ backgroundColor: color.value }}
          title={color.name}
        />
      ))}
    </div>
  );
}
