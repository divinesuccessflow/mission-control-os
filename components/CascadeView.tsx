'use client';

import { useEffect, useState } from 'react';
import { CascadeNode, CascadeStatus } from '@/types';
import { loadData, addCascadeNode, updateCascadeNode, deleteCascadeNode } from '@/lib/storage';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import { Network, Plus, ChevronRight, ChevronDown, Edit, Trash2 } from 'lucide-react';

const levels = [
  'overarching',
  'area',
  'concern',
  'outcome',
  'result',
  'action',
] as const;

const levelLabels = {
  overarching: 'Overarching Area of Concern',
  area: 'Area of Concern',
  concern: 'Concern',
  outcome: 'Outcome',
  result: 'Result',
  action: 'Action',
};

const statusColors = {
  active: 'border-blue text-blue',
  complete: 'border-green-500 text-green-500',
  blocked: 'border-red-500 text-red-500',
};

export default function CascadeView() {
  const [cascades, setCascades] = useState<CascadeNode[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [showNewNode, setShowNewNode] = useState(false);
  const [parentForNew, setParentForNew] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<string | null>(null);

  useEffect(() => {
    loadCascades();
  }, []);

  const loadCascades = () => {
    const data = loadData();
    setCascades(data.cascades);
  };

  const handleCreateNode = (parentId: string | null, level: CascadeNode['level']) => {
    const newNode: CascadeNode = {
      id: Date.now().toString(),
      title: '',
      level,
      status: 'active',
      parentId,
      children: [],
      description: '',
    };
    addCascadeNode(newNode);
    setEditingNode(newNode.id);
    setShowNewNode(false);
    setParentForNew(null);
    loadCascades();
  };

  const handleUpdateNode = (nodeId: string, updates: Partial<CascadeNode>) => {
    updateCascadeNode(nodeId, updates);
    loadCascades();
  };

  const handleDeleteNode = (nodeId: string) => {
    if (confirm('Delete this node and all its children?')) {
      deleteCascadeNode(nodeId);
      loadCascades();
    }
  };

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const getRootNodes = () => cascades.filter(n => !n.parentId);

  const getChildLevel = (parentLevel: CascadeNode['level']): CascadeNode['level'] | null => {
    const index = levels.indexOf(parentLevel);
    return index < levels.length - 1 ? levels[index + 1] : null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Network className="w-8 h-8 text-blue" />
          <h2 className="text-3xl font-bold">Cascade View (SFFCMM)</h2>
        </div>
        <Button onClick={() => { setParentForNew(null); setShowNewNode(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          New Root
        </Button>
      </div>

      {/* Info Card */}
      <Card className="bg-blue/10 border-blue/30">
        <h3 className="font-bold mb-2">Cascade Hierarchy</h3>
        <p className="text-sm text-gray-300 mb-3">
          Overarching Area → Area → Concern → Outcome → Result → Action
        </p>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-blue rounded" />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-green-500 rounded" />
            <span>Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-red-500 rounded" />
            <span>Blocked</span>
          </div>
        </div>
      </Card>

      {/* New Node Creator */}
      {showNewNode && (
        <Card className="border-gold">
          <div className="space-y-3">
            <h3 className="text-xl font-bold">
              Create {parentForNew ? 'Child Node' : 'Root Node'}
            </h3>
            <p className="text-sm text-gray-400">
              {parentForNew
                ? `Creating under: ${cascades.find(n => n.id === parentForNew)?.title}`
                : 'Creating a new overarching area of concern'}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const level = parentForNew
                    ? getChildLevel(cascades.find(n => n.id === parentForNew)!.level)
                    : 'overarching';
                  if (level) handleCreateNode(parentForNew, level);
                }}
              >
                Create
              </Button>
              <Button variant="ghost" onClick={() => { setShowNewNode(false); setParentForNew(null); }}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Cascade Tree */}
      <div className="space-y-2">
        {getRootNodes().length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-400 mb-4">No cascades yet. Create your first one!</p>
            <Button onClick={() => { setParentForNew(null); setShowNewNode(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Create Overarching Area
            </Button>
          </Card>
        ) : (
          getRootNodes().map(node => (
            <CascadeNodeComponent
              key={node.id}
              node={node}
              cascades={cascades}
              expandedNodes={expandedNodes}
              editingNode={editingNode}
              onToggleExpand={toggleExpand}
              onEdit={setEditingNode}
              onUpdate={handleUpdateNode}
              onDelete={handleDeleteNode}
              onAddChild={(nodeId) => {
                setParentForNew(nodeId);
                setShowNewNode(true);
              }}
              getChildLevel={getChildLevel}
              depth={0}
            />
          ))
        )}
      </div>
    </div>
  );
}

function CascadeNodeComponent({
  node,
  cascades,
  expandedNodes,
  editingNode,
  onToggleExpand,
  onEdit,
  onUpdate,
  onDelete,
  onAddChild,
  getChildLevel,
  depth,
}: {
  node: CascadeNode;
  cascades: CascadeNode[];
  expandedNodes: Set<string>;
  editingNode: string | null;
  onToggleExpand: (id: string) => void;
  onEdit: (id: string | null) => void;
  onUpdate: (id: string, updates: Partial<CascadeNode>) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  getChildLevel: (level: CascadeNode['level']) => CascadeNode['level'] | null;
  depth: number;
}) {
  const isExpanded = expandedNodes.has(node.id);
  const isEditing = editingNode === node.id;
  const children = cascades.filter(n => n.parentId === node.id);
  const hasChildren = children.length > 0;
  const canAddChild = getChildLevel(node.level) !== null;

  if (isEditing) {
    return (
      <div style={{ marginLeft: `${depth * 24}px` }}>
        <Card className={`border-2 ${statusColors[node.status]} space-y-3`}>
          <div className="text-xs uppercase tracking-wide text-gray-400">
            {levelLabels[node.level]}
          </div>
          <Input
            placeholder="Node Title"
            value={node.title}
            onChange={(e) => onUpdate(node.id, { title: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={node.description || ''}
            onChange={(e) => onUpdate(node.id, { description: e.target.value })}
            className="min-h-[80px]"
          />
          <div className="flex gap-2">
            <select
              value={node.status}
              onChange={(e) => onUpdate(node.id, { status: e.target.value as CascadeStatus })}
              className="px-3 py-2 bg-background border border-border rounded text-sm"
            >
              <option value="active">Active</option>
              <option value="complete">Complete</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => onEdit(null)}>Done</Button>
            <Button size="sm" variant="danger" onClick={() => onDelete(node.id)}>
              Delete
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: `${depth * 24}px` }}>
      <Card className={`border ${statusColors[node.status]}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {hasChildren && (
                <button
                  onClick={() => onToggleExpand(node.id)}
                  className="hover:bg-card rounded p-1"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
              <div className="text-xs uppercase tracking-wide text-gray-400">
                {levelLabels[node.level]}
              </div>
            </div>
            <h4 className="font-bold text-lg mb-1">{node.title || 'Untitled'}</h4>
            {node.description && (
              <p className="text-sm text-gray-400">{node.description}</p>
            )}
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={() => onEdit(node.id)}>
              <Edit className="w-4 h-4" />
            </Button>
            {canAddChild && (
              <Button size="sm" variant="ghost" onClick={() => onAddChild(node.id)}>
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        {hasChildren && (
          <div className="mt-2 text-xs text-gray-400">
            {children.length} {children.length === 1 ? 'child' : 'children'}
          </div>
        )}
      </Card>

      {isExpanded && hasChildren && (
        <div className="mt-2 space-y-2">
          {children.map(child => (
            <CascadeNodeComponent
              key={child.id}
              node={child}
              cascades={cascades}
              expandedNodes={expandedNodes}
              editingNode={editingNode}
              onToggleExpand={onToggleExpand}
              onEdit={onEdit}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onAddChild={onAddChild}
              getChildLevel={getChildLevel}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
