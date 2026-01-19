import { TodoItem } from './TodoItem';
import { useTodoStore } from '@/stores/todoStore';

interface TodoListProps {
  date: string;
}

export function TodoList({ date }: TodoListProps) {
  const { todos } = useTodoStore();
  const dateTodos = todos.filter((t) => t.date === date);

  if (dateTodos.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-muted-foreground">
        아직 기록이 없습니다
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {dateTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
