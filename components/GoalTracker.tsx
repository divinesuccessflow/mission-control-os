'use client';

import { useEffect, useState } from 'react';
import { Goal } from '@/types';
import { loadData, updateGoal } from '@/lib/storage';
import { calculateDaysRemaining, formatNumber, getProgressPercentage, calculateDailyRate } from '@/lib/utils';
import Card from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import Button from './ui/Button';
import Input from './ui/Input';
import { Target, Plus, Minus, Calendar, TrendingUp } from 'lucide-react';

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<number>(0);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    const data = loadData();
    setGoals(data.goals);
  };

  const handleUpdateCurrent = (goalId: string, newCurrent: number) => {
    updateGoal(goalId, { current: Math.max(0, newCurrent) });
    loadGoals();
  };

  const handleQuickIncrement = (goalId: string, amount: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      handleUpdateCurrent(goalId, goal.current + amount);
    }
  };

  const startEditing = (goal: Goal) => {
    setEditingGoal(goal.id);
    setTempValue(goal.current);
  };

  const saveEdit = (goalId: string) => {
    handleUpdateCurrent(goalId, tempValue);
    setEditingGoal(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-8 h-8 text-gold" />
        <h2 className="text-3xl font-bold">Goal Tracker</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map(goal => {
          const daysRemaining = calculateDaysRemaining(goal.deadline);
          const progress = getProgressPercentage(goal.current, goal.target);
          const dailyRate = calculateDailyRate(goal.target, goal.current, goal.deadline);
          const isEditing = editingGoal === goal.id;

          return (
            <Card key={goal.id} className="hover:border-opacity-60 transition-all">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1" style={{ color: goal.color }}>
                      {goal.category}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Target: {formatNumber(goal.target)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: goal.color }}>
                      {progress.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400">Complete</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <ProgressBar value={progress} color={goal.color} />

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Current</div>
                    <div className="text-lg font-bold">{formatNumber(goal.current)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Remaining</div>
                    <div className="text-lg font-bold text-blue">
                      {formatNumber(goal.target - goal.current)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Days Left</div>
                    <div className="text-lg font-bold text-gold">{daysRemaining}</div>
                  </div>
                </div>

                {/* Daily Rate */}
                <div className="bg-background rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-gold" />
                      <span className="text-sm text-gray-400">Daily Rate Needed</span>
                    </div>
                    <span className="text-xl font-bold text-gold">
                      {dailyRate} / day
                    </span>
                  </div>
                </div>

                {/* Update Controls */}
                <div className="space-y-2">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={tempValue}
                        onChange={(e) => setTempValue(parseInt(e.target.value) || 0)}
                        className="flex-1"
                      />
                      <Button onClick={() => saveEdit(goal.id)} size="sm">
                        Save
                      </Button>
                      <Button 
                        onClick={() => setEditingGoal(null)} 
                        variant="ghost"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleQuickIncrement(goal.id, -10)}
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                      >
                        <Minus className="w-4 h-4 mr-1" />
                        10
                      </Button>
                      <Button
                        onClick={() => handleQuickIncrement(goal.id, -1)}
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                      >
                        <Minus className="w-4 h-4 mr-1" />
                        1
                      </Button>
                      <Button
                        onClick={() => startEditing(goal)}
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleQuickIncrement(goal.id, 1)}
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        1
                      </Button>
                      <Button
                        onClick={() => handleQuickIncrement(goal.id, 10)}
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        10
                      </Button>
                    </div>
                  )}
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
