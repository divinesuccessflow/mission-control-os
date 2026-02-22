'use client';

import { useState } from 'react';
import { 
  Home, Music, BookOpen, ShoppingBag, Globe, DollarSign, 
  Linkedin, Snowflake, Rocket, FolderKanban, CheckSquare, 
  BookMarked, Menu, X 
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'music', label: 'Music Factory', icon: Music },
  { id: 'books', label: 'Books', icon: BookOpen },
  { id: 'gumroad', label: 'Gumroad', icon: ShoppingBag },
  { id: 'landing', label: 'Landing Pages', icon: Globe },
  { id: 'revenue', label: 'Revenue & Ads', icon: DollarSign },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'nandini', label: 'Nandini Masterclass', icon: Snowflake },
  { id: 'ai-prosperity', label: 'AI Prosperity', icon: Rocket },
  { id: 'projects', label: 'Projects Hub', icon: FolderKanban },
  { id: 'preflight', label: 'Pre-Flight Check', icon: CheckSquare },
  { id: 'knowledge', label: 'Knowledge Docs', icon: BookMarked },
];

export default function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-gold">Mission Control OS</h1>
        <p className="text-sm text-gray-400 mt-1">V2.0</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gold text-black font-semibold'
                      : 'text-gray-300 hover:bg-surface hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <p className="text-xs text-gray-500">
          Built for operational excellence
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-surface rounded-lg border border-border"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-surface border-r border-border
          flex flex-col z-40 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <NavContent />
      </aside>
    </>
  );
}
