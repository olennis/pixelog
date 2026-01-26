import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface UIStore {
  selectedDate: string | null;
  selectedGoalId: string | null;
  currentYear: number;
  isTodoModalOpen: boolean;
  isGoalModalOpen: boolean;
  editingGoalId: string | null;
  zoomLevel: number;
  sidebarWidth: number;
  theme: Theme;

  setSelectedDate: (date: string | null) => void;
  setSelectedGoal: (goalId: string | null) => void;
  setCurrentYear: (year: number) => void;
  openTodoModal: (date?: string) => void;
  closeTodoModal: () => void;
  openGoalModal: (goalId?: string) => void;
  closeGoalModal: () => void;
  setZoomLevel: (level: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setSidebarWidth: (width: number) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  selectedDate: null,
  selectedGoalId: null,
  currentYear: new Date().getFullYear(),
  isTodoModalOpen: false,
  isGoalModalOpen: false,
  editingGoalId: null,
  zoomLevel: 1,
  sidebarWidth: 180,
  theme: (localStorage.getItem('pixelog-theme') as Theme) || 'dark',

  setSelectedDate: (date) => set({ selectedDate: date }),

  setSelectedGoal: (goalId) => set({ selectedGoalId: goalId }),

  setCurrentYear: (year) => set({ currentYear: year }),

  openTodoModal: (date) =>
    set({
      isTodoModalOpen: true,
      selectedDate: date ?? null,
    }),

  closeTodoModal: () =>
    set({
      isTodoModalOpen: false,
      selectedDate: null,
    }),

  openGoalModal: (goalId) =>
    set({
      isGoalModalOpen: true,
      editingGoalId: goalId ?? null,
    }),

  closeGoalModal: () =>
    set({
      isGoalModalOpen: false,
      editingGoalId: null,
    }),

  setZoomLevel: (level) => set({ zoomLevel: Math.max(1, Math.min(3, level)) }),

  zoomIn: () =>
    set((state) => ({ zoomLevel: Math.min(3, state.zoomLevel + 0.25) })),

  zoomOut: () =>
    set((state) => ({ zoomLevel: Math.max(1, state.zoomLevel - 0.25) })),

  setSidebarWidth: (width) => set({ sidebarWidth: Math.max(120, Math.min(400, width)) }),

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem('pixelog-theme', next);
      return { theme: next };
    }),
}));
