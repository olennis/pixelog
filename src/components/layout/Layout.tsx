import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

export function Layout() {
  return (
    <div className="h-screen w-full flex bg-background">
      <Sidebar />
      <MainContent />
    </div>
  );
}
