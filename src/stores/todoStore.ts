import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo } from '@/types';
import { generateId } from '@/utils/date';

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  getTodosByDate: (date: string) => Todo[];
  getTodosByGoal: (goalId: string) => Todo[];
  deleteTodosByGoal: (goalId: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (todoData) => {
        const newTodo: Todo = {
          ...todoData,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ todos: [...state.todos, newTodo] }));
      },

      updateTodo: (id, updates) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        }));
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      toggleComplete: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      getTodosByDate: (date) => {
        return get().todos.filter((todo) => todo.date === date);
      },

      getTodosByGoal: (goalId) => {
        return get().todos.filter((todo) => todo.goalId === goalId);
      },

      deleteTodosByGoal: (goalId) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.goalId !== goalId),
        }));
      },
    }),
    {
      name: 'yearly-todo-todos',
    }
  )
);
