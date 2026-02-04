import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WeekTask } from '@/types';
import { generateId } from '@/utils/date';

interface WeekTaskStore {
  tasks: WeekTask[];
  addTask: (content: string, goalId?: string | null) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  assignDate: (id: string, date: string | null) => void;
}

export const useWeekTaskStore = create<WeekTaskStore>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (content, goalId) => {
        const task: WeekTask = {
          id: generateId(),
          content: content.trim(),
          date: null,
          goalId: goalId ?? null,
          completed: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, task] }));
      },

      deleteTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
      },

      toggleComplete: (id) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        }));
      },

      assignDate: (id, date) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, date } : t
          ),
        }));
      },
    }),
    { name: 'pixelog-week-tasks' }
  )
);
