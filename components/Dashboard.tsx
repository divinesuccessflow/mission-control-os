'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Goal, Task } from '@/types';
import { loadData } from '@/lib/storage';
import { calculateDaysRemaining, formatNumber, getProgressPercentage, calculateDailyRate } from '@/lib/utils';
import Card from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import { TrendingUp, Calendar, Target, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const data = loadData();
    setGoals(data.goals);
    setTasks(data.tasks);
  }, []);

  const companiesGoal = goals.find(g => g.category === 'Companies');
  const millionGoals = goals.filter(g => g.target === 1000000);

  const tasksByStage = {
    Initiating: tasks.filter(t => t.stage === 'Initiating').length,
    Planning: tasks.filter(t => t.stage === 'Planning').length,
    Executing: tasks.filter(t => t.stage === 'Executing').length,
    Monitoring: tasks.filter(t => t.stage === 'Monitoring').length,
    Closing: tasks.filter(t => t.stage === 'Closing').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gold mb-2">Mission Control OS</h1>
          <p className="text-gray-400">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
      </div>

      {/* Key Deadlines */}
      {companiesGoal && (
        <Card className="bg-gradient-to-br from-gold/10 to-card border-gold/30">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-gold" />
                <h2 className="text-2xl font-bold text-gold">711 Companies Deadline</h2>
              </div>
              <p className="text-3xl font-bold mb-4">
                {calculateDaysRemaining(companiesGoal.deadline)} days remaining
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Current Progress</p>
                  <p className="text-xl font-semibold">
                    {companiesGoal.current} / {companiesGoal.target}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Daily Rate Needed</p>
                  <p className="text-xl font-semibold text-gold">
                    {calculateDailyRate(companiesGoal.target, companiesGoal.current, companiesGoal.deadline)} / day
                  </p>
                </div>
              </div>
              <ProgressBar 
                value={getProgressPercentage(companiesGoal.current, companiesGoal.target)} 
                color="#B8860B"
                className="mt-4"
                showLabel
              />
            </div>
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Goals Summary */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue" />
            <h3 className="text-lg font-semibold">Million-Scale Goals</h3>
          </div>
          <div className="space-y-3">
            {millionGoals.slice(0, 4).map(goal => (
              <div key={goal.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{goal.category}</span>
                  <span className="text-gray-400">
                    {formatNumber(goal.current)} / {formatNumber(goal.target)}
                  </span>
                </div>
                <ProgressBar 
                  value={getProgressPercentage(goal.current, goal.target)} 
                  color={goal.color}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-gray-400">
              Deadline: {format(new Date('2030-12-31'), 'MMM d, yyyy')}
            </p>
            <p className="text-sm text-gold mt-1">
              {calculateDaysRemaining('2030-12-31')} days until 2030
            </p>
          </div>
        </Card>

        {/* Active Tasks */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold">Active Tasks</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Initiating</span>
              <span className="text-xl font-bold">{tasksByStage.Initiating}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Planning</span>
              <span className="text-xl font-bold">{tasksByStage.Planning}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Executing</span>
              <span className="text-xl font-bold text-blue">{tasksByStage.Executing}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Monitoring</span>
              <span className="text-xl font-bold">{tasksByStage.Monitoring}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Closing</span>
              <span className="text-xl font-bold text-green-500">{tasksByStage.Closing}</span>
            </div>
          </div>
        </Card>

        {/* Daily Production Calculator */}
        <Card className="bg-gradient-to-br from-blue/10 to-card border-blue/30">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-blue" />
            <h3 className="text-lg font-semibold">Today&apos;s Targets</h3>
          </div>
          <div className="space-y-3">
            {goals.slice(0, 3).map(goal => {
              const dailyRate = calculateDailyRate(goal.target, goal.current, goal.deadline);
              return (
                <div key={goal.id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{goal.category}</span>
                  <span className="text-lg font-bold" style={{ color: goal.color }}>
                    {dailyRate}/day
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-gray-300 font-medium">
              Maintain daily rates to hit all targets on time
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
