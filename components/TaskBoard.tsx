'use client';

import { useEffect, useState } from 'react';
import { Task, PreFlightCheck } from '@/types';
import { loadData, addTask, updateTask, deleteTask } from '@/lib/storage';
import { isPreFlightComplete } from '@/lib/utils';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import { ClipboardList, Plus, X, AlertTriangle, CheckCircle, Circle } from 'lucide-react';

const stages = ['Initiating', 'Planning', 'Executing', 'Monitoring', 'Closing'] as const;

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNewTask, setShowNewTask] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const data = loadData();
    setTasks(data.tasks);
  };

  const handleCreateTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: '',
      description: '',
      stage: 'Initiating',
      preFlightCheck: {
        concern: '',
        accomplishment: '',
        scope: '',
        playbook: '',
        quality: '',
      },
      risk: 'low',
      qualityGateChecked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addTask(newTask);
    setEditingTask(newTask.id);
    setShowNewTask(false);
    loadTasks();
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    updateTask(taskId, updates);
    loadTasks();
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Delete this task?')) {
      deleteTask(taskId);
      loadTasks();
    }
  };

  const handleMoveStage = (taskId: string, direction: 'left' | 'right') => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const currentIndex = stages.indexOf(task.stage);
    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < stages.length) {
      // Check if moving to Closing requires quality gate
      if (stages[newIndex] === 'Closing' && !task.qualityGateChecked) {
        alert('Please verify quality before moving to Closing stage');
        return;
      }

      handleUpdateTask(taskId, { stage: stages[newIndex] });
    }
  };

  const getRiskColor = (risk: Task['risk']) => {
    switch (risk) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-blue" />
          <h2 className="text-3xl font-bold">Task Board (PMP)</h2>
        </div>
        <Button onClick={() => setShowNewTask(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* New Task Modal */}
      {showNewTask && (
        <Card className="border-blue">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Create New Task</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowNewTask(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-gray-400 mb-4">
            New tasks start with a pre-flight check. Answer all 5 questions before starting work.
          </p>
          <Button onClick={handleCreateTask}>Create Task</Button>
        </Card>
      )}

      {/* Board Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {stages.map(stage => (
          <div key={stage} className="space-y-3">
            <div className="bg-card border border-border rounded-lg p-3">
              <h3 className="font-bold text-sm uppercase tracking-wide text-blue mb-1">
                {stage}
              </h3>
              <p className="text-xs text-gray-400">
                {tasks.filter(t => t.stage === stage).length} tasks
              </p>
            </div>

            <div className="space-y-3">
              {tasks
                .filter(t => t.stage === stage)
                .map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isEditing={editingTask === task.id}
                    onEdit={() => setEditingTask(task.id === editingTask ? null : task.id)}
                    onUpdate={(updates) => handleUpdateTask(task.id, updates)}
                    onDelete={() => handleDeleteTask(task.id)}
                    onMoveLeft={() => handleMoveStage(task.id, 'left')}
                    onMoveRight={() => handleMoveStage(task.id, 'right')}
                    canMoveLeft={stages.indexOf(stage) > 0}
                    canMoveRight={stages.indexOf(stage) < stages.length - 1}
                    getRiskColor={getRiskColor}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
  onMoveLeft,
  onMoveRight,
  canMoveLeft,
  canMoveRight,
  getRiskColor,
}: {
  task: Task;
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  getRiskColor: (risk: Task['risk']) => string;
}) {
  const preFlightComplete = isPreFlightComplete(task.preFlightCheck);

  if (isEditing) {
    return (
      <Card className="border-gold space-y-3 text-sm">
        <Input
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          className="min-h-[60px]"
        />

        <div className="space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wide text-gold">
            Pre-Flight Check
          </h4>
          <Input
            placeholder="CONCERN: What matter of importance?"
            value={task.preFlightCheck.concern}
            onChange={(e) =>
              onUpdate({
                preFlightCheck: { ...task.preFlightCheck, concern: e.target.value },
              })
            }
          />
          <Input
            placeholder="ACCOMPLISHMENT: What exists when done?"
            value={task.preFlightCheck.accomplishment}
            onChange={(e) =>
              onUpdate({
                preFlightCheck: { ...task.preFlightCheck, accomplishment: e.target.value },
              })
            }
          />
          <Input
            placeholder="SCOPE: Acceptance criteria?"
            value={task.preFlightCheck.scope}
            onChange={(e) =>
              onUpdate({
                preFlightCheck: { ...task.preFlightCheck, scope: e.target.value },
              })
            }
          />
          <Input
            placeholder="PLAYBOOK: Which guide applies?"
            value={task.preFlightCheck.playbook}
            onChange={(e) =>
              onUpdate({
                preFlightCheck: { ...task.preFlightCheck, playbook: e.target.value },
              })
            }
          />
          <Input
            placeholder="QUALITY: How to verify?"
            value={task.preFlightCheck.quality}
            onChange={(e) =>
              onUpdate({
                preFlightCheck: { ...task.preFlightCheck, quality: e.target.value },
              })
            }
          />
        </div>

        <div className="flex gap-2">
          <select
            value={task.risk}
            onChange={(e) => onUpdate({ risk: e.target.value as Task['risk'] })}
            className="px-2 py-1 bg-background border border-border rounded text-sm"
          >
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>

        {task.stage === 'Monitoring' && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={task.qualityGateChecked}
              onChange={(e) => onUpdate({ qualityGateChecked: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm">Quality gate verified</span>
          </label>
        )}

        <div className="flex gap-2">
          <Button size="sm" onClick={onEdit}>Done</Button>
          <Button size="sm" variant="danger" onClick={onDelete}>Delete</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="space-y-2 text-sm cursor-pointer hover:border-gold/50 transition-all" onClick={onEdit}>
      <div className="flex items-start justify-between">
        <h4 className="font-bold text-base">{task.title || 'Untitled Task'}</h4>
        <div className={`${getRiskColor(task.risk)}`}>
          <Circle className="w-3 h-3 fill-current" />
        </div>
      </div>

      {task.description && (
        <p className="text-gray-400 text-xs line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center gap-2">
        {preFlightComplete ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
        )}
        <span className="text-xs text-gray-400">
          {preFlightComplete ? 'Ready to start' : 'Pre-flight incomplete'}
        </span>
      </div>

      {task.qualityGateChecked && (
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle className="w-4 h-4" />
          <span className="text-xs">Quality verified</span>
        </div>
      )}

      <div className="flex gap-1 pt-2">
        {canMoveLeft && (
          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onMoveLeft(); }} className="flex-1 text-xs">
            ←
          </Button>
        )}
        {canMoveRight && (
          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onMoveRight(); }} className="flex-1 text-xs">
            →
          </Button>
        )}
      </div>
    </Card>
  );
}
