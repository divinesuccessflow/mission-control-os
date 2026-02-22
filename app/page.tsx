'use client';

import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import GoalTracker from '@/components/GoalTracker';
import TaskBoard from '@/components/TaskBoard';
import CascadeView from '@/components/CascadeView';
import KnowledgeDocs from '@/components/KnowledgeDocs';
import { 
  LayoutDashboard, 
  Target, 
  ClipboardList, 
  Network, 
  BookOpen,
  Menu,
  X
} from 'lucide-react';

type View = 'dashboard' | 'goals' | 'tasks' | 'cascade' | 'docs';

const navigation = [
  { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'goals' as View, label: 'Goal Tracker', icon: Target },
  { id: 'tasks' as View, label: 'Task Board', icon: ClipboardList },
  { id: 'cascade' as View, label: 'Cascade View', icon: Network },
  { id: 'docs' as View, label: 'Knowledge', icon: BookOpen },
];

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  const CurrentComponent = {
    dashboard: Dashboard,
    goals: GoalTracker,
    tasks: TaskBoard,
    cascade: CascadeView,
    docs: KnowledgeDocs,
  }[currentView];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-blue rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gold">Mission Control OS</h1>
                <p className="text-xs text-gray-400">SFFCMM • Mission Control • PMP</p>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-background rounded"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navigation.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gold text-background font-semibold'
                        : 'hover:bg-background text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <nav className="lg:hidden mt-4 space-y-2 animate-slide-up">
              {navigation.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gold text-background font-semibold'
                        : 'hover:bg-background text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <CurrentComponent />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>Mission Control OS • Built with Next.js, TypeScript, and Tailwind CSS</p>
          <p className="mt-1">
            Combining SFFCMM, Mission Control, and PMP frameworks for maximum productivity
          </p>
        </div>
      </footer>
    </div>
  );
}
