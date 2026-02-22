'use client';

import { useMemo } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { Target, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { MissionControlData } from '@/types';
import { formatNumber, calculateDaysRemaining } from '@/lib/utils';

interface DashboardProps {
  data: MissionControlData;
  onNavigate: (view: string) => void;
}

export default function Dashboard({ data, onNavigate }: DashboardProps) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const daysToLaunch = calculateDaysRemaining(data.aiProsperityLaunchDate);
  
  const thisMonthRevenue = useMemo(() => {
    const thisMonth = new Date().toISOString().slice(0, 7);
    const monthData = data.revenueByMonth.find(m => m.month === thisMonth);
    return monthData?.amount || 0;
  }, [data.revenueByMonth]);

  // Algorithm: Pick top 3 actions based on urgency/impact
  const topActions = useMemo(() => {
    const actions = [];

    // AI Prosperity launch is approaching
    if (daysToLaunch > 0 && daysToLaunch <= 20) {
      const incompleteTasks = Object.entries(data.aiProsperityChecklist)
        .filter(([_, done]) => !done).length;
      if (incompleteTasks > 0) {
        actions.push({
          title: `AI Prosperity Launch in ${daysToLaunch} days`,
          description: `${incompleteTasks} tasks remaining`,
          action: 'ai-prosperity',
          priority: 1,
        });
      }
    }

    // Books ready for KDP upload
    const readyBooks = data.books.filter(b => 
      b.status === 'Formatting' && b.kdpChecklist.manuscriptReady
    );
    if (readyBooks.length > 0) {
      actions.push({
        title: `${readyBooks.length} book(s) ready for KDP`,
        description: readyBooks[0].title,
        action: 'books',
        priority: 2,
      });
    }

    // Songs ready for Suno
    const readySongs = data.songs.filter(s => s.status === 'Suno Ready');
    if (readySongs.length > 0) {
      actions.push({
        title: `${readySongs.length} song(s) ready to generate`,
        description: 'Copy prompts and create on Suno',
        action: 'music',
        priority: 3,
      });
    }

    // Nandini tasks in progress
    const nandiniInProgress = data.nandiniTasks.filter(t => t.status === 'In Progress');
    if (nandiniInProgress.length > 0) {
      actions.push({
        title: `${nandiniInProgress.length} Nandini task(s) in progress`,
        description: nandiniInProgress[0].task,
        action: 'nandini',
        priority: 4,
      });
    }

    // Projects needing attention
    const activeProjects = data.projects.filter(p => p.status === 'In Progress');
    if (activeProjects.length > 0) {
      actions.push({
        title: `${activeProjects.length} active project(s)`,
        description: activeProjects[0].name + ': ' + activeProjects[0].nextAction,
        action: 'projects',
        priority: 5,
      });
    }

    // Landing pages in development
    const sitesInDev = data.landingSites.filter(s => s.status === 'Development');
    if (sitesInDev.length > 0) {
      actions.push({
        title: `${sitesInDev.length} site(s) in development`,
        description: sitesInDev.map(s => s.domain).join(', '),
        action: 'landing',
        priority: 6,
      });
    }

    return actions
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 3);
  }, [data, daysToLaunch]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Mission Control</h2>
          <p className="text-gray-400 mt-1">{today}</p>
        </div>
        <Target className="w-8 h-8 text-gold" />
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-gold/20 to-gold/5 border-gold/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Songs Created</p>
              <p className="text-2xl font-bold text-gold">
                {data.songs.filter(s => s.status === 'Published').length}/{data.songsTarget}
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-gold" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue/20 to-blue/5 border-blue/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Books Published</p>
              <p className="text-2xl font-bold text-blue">
                {data.books.filter(b => b.status === 'Published').length}
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-blue" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Revenue (This Month)</p>
              <p className="text-2xl font-bold text-green-500">
                ₹{formatNumber(thisMonthRevenue)}
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">AI Prosperity Launch</p>
              <p className="text-2xl font-bold text-purple-500">
                {daysToLaunch > 0 ? `${daysToLaunch} days` : 'LIVE!'}
              </p>
            </div>
            <Calendar className="w-6 h-6 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* TOP 3 ACTIONS NOW */}
      <Card className="bg-gradient-to-br from-gold/10 to-transparent border-gold/30">
        <h3 className="text-2xl font-bold mb-4 text-gold">🎯 TOP 3 ACTIONS NOW</h3>
        <div className="space-y-3">
          {topActions.length === 0 ? (
            <p className="text-gray-400">All caught up! 🎉</p>
          ) : (
            topActions.map((action, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:border-gold/50 transition-all"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{action.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{action.description}</p>
                </div>
                <Button
                  onClick={() => onNavigate(action.action)}
                  variant="secondary"
                  className="ml-4"
                >
                  DO IT <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-semibold mb-3">Active Projects</h3>
          <div className="space-y-2">
            {data.projects
              .filter(p => p.status === 'In Progress')
              .slice(0, 5)
              .map(project => (
                <div key={project.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{project.name}</span>
                  <span className="text-xs text-gray-500">{project.status}</span>
                </div>
              ))}
            {data.projects.filter(p => p.status === 'In Progress').length === 0 && (
              <p className="text-sm text-gray-500">No active projects</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3">Revenue Goal Progress</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Monthly Goal</span>
                <span className="text-gold font-semibold">
                  ₹{formatNumber(data.revenueGoal)}
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-gold to-yellow-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (thisMonthRevenue / data.revenueGoal) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {((thisMonthRevenue / data.revenueGoal) * 100).toFixed(2)}% achieved
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
