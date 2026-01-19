import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { useUIStore } from '@/stores/uiStore';
import { parseDate, getMonthName } from '@/utils/date';

export function TodoModal() {
  const { isTodoModalOpen, closeTodoModal, selectedDate } = useUIStore();

  if (!selectedDate) return null;

  const { month, day } = parseDate(selectedDate);
  const dateTitle = `${getMonthName(month - 1)} ${day}일`;

  return (
    <Dialog open={isTodoModalOpen} onOpenChange={(open) => !open && closeTodoModal()}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{dateTitle} 활동 기록</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 투두 입력 폼 */}
          <TodoForm date={selectedDate} />

          {/* 구분선 */}
          <div className="border-t border-border" />

          {/* 투두 리스트 */}
          <TodoList date={selectedDate} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
