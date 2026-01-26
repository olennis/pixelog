import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ColorPicker } from './ColorPicker';
import { useGoalStore } from '@/stores/goalStore';
import { useTodoStore } from '@/stores/todoStore';
import { useUIStore } from '@/stores/uiStore';
import { DEFAULT_COLOR } from '@/constants/colors';
import { Trash2 } from 'lucide-react';

export function GoalForm() {
  const { isGoalModalOpen, closeGoalModal, editingGoalId, currentYear } = useUIStore();
  const { goals, addGoal, updateGoal, deleteGoal } = useGoalStore();
  const { deleteTodosByGoal } = useTodoStore();

  const editingGoal = editingGoalId ? goals.find((g) => g.id === editingGoalId) : null;

  const [title, setTitle] = useState('');
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [targetValue, setTargetValue] = useState('');
  const [unit, setUnit] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setColor(editingGoal.color);
      setTargetValue(editingGoal.targetValue?.toString() || '');
      setUnit(editingGoal.unit || '');
    } else {
      resetForm();
    }
  }, [editingGoal, isGoalModalOpen]);

  const resetForm = () => {
    setTitle('');
    setColor(DEFAULT_COLOR);
    setTargetValue('');
    setUnit('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const goalData = {
      title: title.trim(),
      color,
      targetValue: targetValue ? Number(targetValue) : undefined,
      unit: unit.trim() || undefined,
      year: currentYear,
    };

    if (editingGoal) {
      updateGoal(editingGoal.id, goalData);
    } else {
      addGoal(goalData);
    }

    closeGoalModal();
    resetForm();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (editingGoal) {
      deleteTodosByGoal(editingGoal.id);
      deleteGoal(editingGoal.id);
      closeGoalModal();
    }
  };

  return (
    <>
      <Dialog open={isGoalModalOpen} onOpenChange={(open) => !open && closeGoalModal()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{editingGoal ? '목표 수정' : '새 목표 추가'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 목표 제목 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">목표</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 1000km 달리기"
              autoFocus
            />
          </div>

          {/* 색상 선택 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">색상</label>
            <ColorPicker value={color} onChange={setColor} />
          </div>

          {/* 목표 수치 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">목표 수치 (선택)</label>
              <Input
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="1000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">단위 (선택)</label>
              <Input
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="km"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            {editingGoal && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="mr-auto"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                삭제
              </Button>
            )}
            <Button type="button" variant="outline" onClick={closeGoalModal}>
              취소
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              {editingGoal ? '수정' : '추가'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="목표 삭제"
        description="이 목표를 삭제하시겠습니까? 관련 투두도 함께 삭제됩니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </>
  );
}
