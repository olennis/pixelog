import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

export function Layout() {
  return (
    <div className="h-full w-full flex bg-background pt-4 pb-6">
      <Sidebar />
      <MainContent />
    </div>
  );
}
