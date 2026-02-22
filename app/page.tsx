'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import MusicFactory from '@/components/MusicFactory';
import BooksKDP from '@/components/BooksKDP';
import GumroadProducts from '@/components/GumroadProducts';
import LandingPages from '@/components/LandingPages';
import RevenueAds from '@/components/RevenueAds';
import LinkedInCampaigns from '@/components/LinkedInCampaigns';
import NandiniMasterclass from '@/components/NandiniMasterclass';
import AIProsperity from '@/components/AIProsperity';
import ProjectsHub from '@/components/ProjectsHub';
import PreFlightCheck from '@/components/PreFlightCheck';
import KnowledgeDocs from '@/components/KnowledgeDocs';
import { MissionControlData } from '@/types';
import { loadData, saveData } from '@/lib/storage';

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [data, setData] = useState<MissionControlData | null>(null);

  // Load data on mount
  useEffect(() => {
    setData(loadData());
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (data) {
      saveData(data);
    }
  }, [data]);

  const handleUpdate = (newData: MissionControlData) => {
    setData(newData);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading Mission Control OS...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard data={data} onNavigate={setCurrentView} />;
      case 'music':
        return <MusicFactory data={data} onUpdate={handleUpdate} />;
      case 'books':
        return <BooksKDP data={data} onUpdate={handleUpdate} />;
      case 'gumroad':
        return <GumroadProducts data={data} onUpdate={handleUpdate} />;
      case 'landing':
        return <LandingPages data={data} onUpdate={handleUpdate} />;
      case 'revenue':
        return <RevenueAds data={data} onUpdate={handleUpdate} />;
      case 'linkedin':
        return <LinkedInCampaigns data={data} onUpdate={handleUpdate} />;
      case 'nandini':
        return <NandiniMasterclass data={data} onUpdate={handleUpdate} />;
      case 'ai-prosperity':
        return <AIProsperity data={data} onUpdate={handleUpdate} />;
      case 'projects':
        return <ProjectsHub data={data} onUpdate={handleUpdate} />;
      case 'preflight':
        return <PreFlightCheck />;
      case 'knowledge':
        return <KnowledgeDocs />;
      default:
        return <Dashboard data={data} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-white flex">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-7xl mx-auto p-6 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
