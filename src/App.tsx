import { Layout } from '@/components/layout/Layout';
import { GoalForm } from '@/components/goals/GoalForm';
import { TodoModal } from '@/components/todos/TodoModal';

function App() {
  return (
    <>
      <Layout />
      <GoalForm />
      <TodoModal />
    </>
  );
}

export default App;
