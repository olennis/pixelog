import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Goal } from '@/types';
import { generateId } from '@/utils/date';

interface GoalStore {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'currentValue'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateProgress: (id: string, delta: number) => void;
  getGoalsByYear: (year: number) => Goal[];
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set, get) => ({
      goals: [],

      addGoal: (goalData) => {
        const newGoal: Goal = {
          ...goalData,
          id: generateId(),
          currentValue: 0,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ goals: [...state.goals, newGoal] }));
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          ),
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        }));
      },

      updateProgress: (id, delta) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? { ...goal, currentValue: Math.max(0, goal.currentValue + delta) }
              : goal
          ),
        }));
      },

      getGoalsByYear: (year) => {
        return get().goals.filter((goal) => goal.year === year);
      },
    }),
    {
      name: 'yearly-todo-goals',
    }
  )
);
