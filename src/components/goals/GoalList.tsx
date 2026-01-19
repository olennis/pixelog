import { GoalItem } from './GoalItem';
import { useGoalStore } from '@/stores/goalStore';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function GoalList() {
  const { goals } = useGoalStore();
  const { currentYear, openGoalModal, selectedGoalId, setSelectedGoal } = useUIStore();

  const yearGoals = goals.filter((goal) => goal.year === currentYear);

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h2 className="text-sm font-semibold text-muted-foreground">목표</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => openGoalModal()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* 목표 리스트 */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {yearGoals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-muted-foreground mb-3">
              아직 목표가 없습니다
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openGoalModal()}
              className="text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              목표 추가
            </Button>
          </div>
        ) : (
          yearGoals.map((goal) => <GoalItem key={goal.id} goal={goal} />)
        )}
      </div>

      {/* 필터 해제 버튼 */}
      {selectedGoalId && (
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs"
            onClick={() => setSelectedGoal(null)}
          >
            전체 보기
          </Button>
        </div>
      )}
    </div>
  );
}
