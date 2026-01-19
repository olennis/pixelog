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

export interface UIState {
  selectedDate: string | null;
  selectedGoalId: string | null;
  currentYear: number;
  isTodoModalOpen: boolean;
  isGoalModalOpen: boolean;
}
