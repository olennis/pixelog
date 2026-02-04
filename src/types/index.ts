export interface Goal {
  id: string;
  title: string;
  description?: string;
  color: string;
  targetValue?: number;
  unit?: string;
  currentValue: number;
  emoji?: string;
  createdAt: string;
  year: number;
}

export interface Todo {
  id: string;
  goalId: string;
  date: string;
  content: string;
  value?: number;
  completed: boolean;
  createdAt: string;
}

export interface WeekTask {
  id: string;
  content: string;
  date: string | null; // null = 미배정, "YYYY-MM-DD" = 배정됨
  goalId: string | null; // null = 독립 태스크, 값 있으면 연간 캘린더와 동기화
  completed: boolean;
  createdAt: string;
}

export interface UIState {
  selectedDate: string | null;
  selectedGoalId: string | null;
  currentYear: number;
  isTodoModalOpen: boolean;
  isGoalModalOpen: boolean;
}
