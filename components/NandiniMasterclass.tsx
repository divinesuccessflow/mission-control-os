'use client';

import Card from './ui/Card';
import Textarea from './ui/Textarea';
import { Snowflake } from 'lucide-react';
import { NandiniTask, TaskStatus, MissionControlData } from '@/types';

interface NandiniMasterclassProps {
  data: MissionControlData;
  onUpdate: (data: MissionControlData) => void;
}

const statusOptions: TaskStatus[] = ['Not Started', 'In Progress', 'Completed'];

export default function NandiniMasterclass({ data, onUpdate }: NandiniMasterclassProps) {
  const handleUpdateTask = (id: string, updates: Partial<NandiniTask>) => {
    onUpdate({
      ...data,
      nandiniTasks: data.nandiniTasks.map(t => (t.id === id ? { ...t, ...updates } : t)),
    });
  };

  const completedCount = data.nandiniTasks.filter(t => t.status === 'Completed').length;
  const totalCount = data.nandiniTasks.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Snowflake className="w-8 h-8 text-gold" />
        <div>
          <h2 className="text-3xl font-bold">Nandini Masterclass 🧊</h2>
          <p className="text-sm text-gray-400 mt-1">
            {completedCount}/{totalCount} tasks completed
          </p>
        </div>
      </div>

      {/* Progress */}
      <Card className="bg-gold/10 border-gold/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Overall Progress</span>
          <span className="text-sm text-gold font-bold">
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-3">
          <div
            className="bg-gradient-to-r from-gold to-yellow-500 h-3 rounded-full transition-all"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </Card>

      {/* Tasks */}
      <div className="space-y-4">
        {data.nandiniTasks.map(task => (
          <Card key={task.id} className="border-blue/30">
            <div className="flex items-start gap-4">
              <select
                value={task.status}
                onChange={e =>
                  handleUpdateTask(task.id, { status: e.target.value as TaskStatus })
                }
                className={`mt-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm font-semibold ${
                  task.status === 'Completed'
                    ? 'text-green-500'
                    : task.status === 'In Progress'
                    ? 'text-blue'
                    : 'text-gray-400'
                }`}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    task.status === 'Completed' ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.task}
                </h3>

                {task.status !== 'Completed' && (
                  <>
                    <div className="mb-3">
                      <label className="text-xs text-gray-400 block mb-1">Next Action</label>
                      <div className="bg-gold/10 border border-gold/30 rounded-lg p-3">
                        <p className="text-sm text-gold font-semibold">{task.nextAction}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Notes</label>
                      <Textarea
                        value={task.notes}
                        onChange={e => handleUpdateTask(task.id, { notes: e.target.value })}
                        placeholder="Add notes..."
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
