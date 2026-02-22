'use client';

import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import { FolderKanban, Plus, Trash2 } from 'lucide-react';
import { Project, ProjectStatus, MissionControlData } from '@/types';

interface ProjectsHubProps {
  data: MissionControlData;
  onUpdate: (data: MissionControlData) => void;
}

const statusOptions: ProjectStatus[] = ['Planning', 'In Progress', 'Blocked', 'Completed'];

const statusColors: Record<ProjectStatus, string> = {
  Planning: 'bg-gray-500',
  'In Progress': 'bg-blue',
  Blocked: 'bg-red-500',
  Completed: 'bg-green-500',
};

export default function ProjectsHub({ data, onUpdate }: ProjectsHubProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    nextAction: '',
    notes: '',
  });

  const handleAddProject = () => {
    if (!newProject.name) {
      alert('Please enter project name');
      return;
    }

    const project: Project = {
      id: `project${Date.now()}`,
      name: newProject.name,
      status: 'Planning',
      nextAction: newProject.nextAction,
      notes: newProject.notes,
    };

    onUpdate({
      ...data,
      projects: [...data.projects, project],
    });

    setNewProject({ name: '', nextAction: '', notes: '' });
    setShowAddForm(false);
  };

  const handleUpdateProject = (id: string, updates: Partial<Project>) => {
    onUpdate({
      ...data,
      projects: data.projects.map(p => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Delete this project?')) {
      onUpdate({
        ...data,
        projects: data.projects.filter(p => p.id !== id),
      });
    }
  };

  const activeCount = data.projects.filter(p => p.status === 'In Progress').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderKanban className="w-8 h-8 text-gold" />
          <div>
            <h2 className="text-3xl font-bold">Projects Hub 🏭</h2>
            <p className="text-sm text-gray-400 mt-1">
              {activeCount} active · {data.projects.length} total
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Add Project Form */}
      {showAddForm && (
        <Card className="border-blue/30">
          <h3 className="font-semibold mb-4">Add New Project</h3>
          <div className="space-y-4">
            <Input
              placeholder="Project name"
              value={newProject.name}
              onChange={e => setNewProject({ ...newProject, name: e.target.value })}
            />
            <Input
              placeholder="Next action"
              value={newProject.nextAction}
              onChange={e => setNewProject({ ...newProject, nextAction: e.target.value })}
            />
            <Textarea
              placeholder="Notes"
              value={newProject.notes}
              onChange={e => setNewProject({ ...newProject, notes: e.target.value })}
              rows={3}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddProject}>Add Project</Button>
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.projects.map(project => (
          <Card key={project.id} className="border-blue/30">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{project.name}</h3>
              </div>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-2">Status</label>
              <select
                value={project.status}
                onChange={e =>
                  handleUpdateProject(project.id, { status: e.target.value as ProjectStatus })
                }
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-3 h-3 rounded-full ${statusColors[project.status]}`} />
                <span className="text-xs text-gray-400">{project.status}</span>
              </div>
            </div>

            {/* Next Action */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-2">Next Action</label>
              <Input
                value={project.nextAction}
                onChange={e => handleUpdateProject(project.id, { nextAction: e.target.value })}
                placeholder="What's the next step?"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs text-gray-400 block mb-2">Notes</label>
              <Textarea
                value={project.notes}
                onChange={e => handleUpdateProject(project.id, { notes: e.target.value })}
                placeholder="Additional context..."
                rows={3}
              />
            </div>
          </Card>
        ))}
      </div>

      {data.projects.length === 0 && (
        <Card className="text-center py-12">
          <FolderKanban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No projects yet. Add your first project!</p>
        </Card>
      )}
    </div>
  );
}
