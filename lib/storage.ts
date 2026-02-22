import { AppData, Goal, Task, CascadeNode } from '@/types';

const STORAGE_KEY = 'mission-control-os-data';

const defaultGoals: Goal[] = [
  {
    id: '1',
    category: 'Companies',
    target: 711,
    current: 0,
    deadline: '2026-03-22',
    color: '#B8860B',
  },
  {
    id: '2',
    category: 'Movies',
    target: 1000000,
    current: 0,
    deadline: '2030-12-31',
    color: '#3B82F6',
  },
  {
    id: '3',
    category: 'Songs',
    target: 1000000,
    current: 0,
    deadline: '2030-12-31',
    color: '#8B5CF6',
  },
  {
    id: '4',
    category: 'Books',
    target: 1000000,
    current: 0,
    deadline: '2030-12-31',
    color: '#EC4899',
  },
  {
    id: '5',
    category: 'Seminars',
    target: 1000000,
    current: 0,
    deadline: '2030-12-31',
    color: '#10B981',
  },
  {
    id: '6',
    category: 'Courses',
    target: 1000000,
    current: 0,
    deadline: '2030-12-31',
    color: '#F59E0B',
  },
  {
    id: '7',
    category: 'Products',
    target: 1000000,
    current: 0,
    deadline: '2030-12-31',
    color: '#EF4444',
  },
  {
    id: '8',
    category: 'Factories',
    target: 1000000,
    current: 0,
    deadline: '2030-12-31',
    color: '#06B6D4',
  },
];

const defaultData: AppData = {
  goals: defaultGoals,
  tasks: [],
  cascades: [],
  lastUpdated: new Date().toISOString(),
};

export function loadData(): AppData {
  if (typeof window === 'undefined') return defaultData;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultData;
    
    const parsed = JSON.parse(stored);
    return { ...defaultData, ...parsed };
  } catch (error) {
    console.error('Error loading data:', error);
    return defaultData;
  }
}

export function saveData(data: Partial<AppData>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const current = loadData();
    const updated = {
      ...current,
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

export function updateGoal(goalId: string, updates: Partial<Goal>): void {
  const data = loadData();
  const goals = data.goals.map(g => 
    g.id === goalId ? { ...g, ...updates } : g
  );
  saveData({ goals });
}

export function addTask(task: Task): void {
  const data = loadData();
  saveData({ tasks: [...data.tasks, task] });
}

export function updateTask(taskId: string, updates: Partial<Task>): void {
  const data = loadData();
  const tasks = data.tasks.map(t =>
    t.id === taskId ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
  );
  saveData({ tasks });
}

export function deleteTask(taskId: string): void {
  const data = loadData();
  const tasks = data.tasks.filter(t => t.id !== taskId);
  saveData({ tasks });
}

export function addCascadeNode(node: CascadeNode): void {
  const data = loadData();
  const cascades = [...data.cascades, node];
  
  // Update parent's children array if this node has a parent
  if (node.parentId) {
    const updatedCascades = cascades.map(c => {
      if (c.id === node.parentId && !c.children.includes(node.id)) {
        return { ...c, children: [...c.children, node.id] };
      }
      return c;
    });
    saveData({ cascades: updatedCascades });
  } else {
    saveData({ cascades });
  }
}

export function updateCascadeNode(nodeId: string, updates: Partial<CascadeNode>): void {
  const data = loadData();
  const cascades = data.cascades.map(c =>
    c.id === nodeId ? { ...c, ...updates } : c
  );
  saveData({ cascades });
}

export function deleteCascadeNode(nodeId: string): void {
  const data = loadData();
  
  // Find the node to delete
  const nodeToDelete = data.cascades.find(c => c.id === nodeId);
  if (!nodeToDelete) return;
  
  // Remove from parent's children array
  let cascades = data.cascades.map(c => {
    if (c.id === nodeToDelete.parentId) {
      return { ...c, children: c.children.filter(id => id !== nodeId) };
    }
    return c;
  });
  
  // Delete the node and all its descendants recursively
  const toDelete = new Set([nodeId]);
  let changed = true;
  while (changed) {
    changed = false;
    cascades.forEach(c => {
      if (c.parentId && toDelete.has(c.parentId) && !toDelete.has(c.id)) {
        toDelete.add(c.id);
        changed = true;
      }
    });
  }
  
  cascades = cascades.filter(c => !toDelete.has(c.id));
  saveData({ cascades });
}
