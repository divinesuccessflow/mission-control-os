'use client';

import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { Globe, Plus, ExternalLink, Trash2 } from 'lucide-react';
import { LandingSite, SiteStatus, MissionControlData } from '@/types';

interface LandingPagesProps {
  data: MissionControlData;
  onUpdate: (data: MissionControlData) => void;
}

const statusOptions: SiteStatus[] = ['Design', 'Development', 'Deployed', 'Live'];

const statusColors: Record<SiteStatus, string> = {
  Design: 'bg-gray-500',
  Development: 'bg-blue-500',
  Deployed: 'bg-orange-500',
  Live: 'bg-green-500',
};

export default function LandingPages({ data, onUpdate }: LandingPagesProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSite, setNewSite] = useState({
    domain: '',
    purpose: '',
    techStack: '',
    platform: '',
    url: '',
  });

  const handleAddSite = () => {
    if (!newSite.domain || !newSite.purpose) {
      alert('Please fill in domain and purpose');
      return;
    }

    const site: LandingSite = {
      id: `site${Date.now()}`,
      domain: newSite.domain,
      purpose: newSite.purpose,
      status: 'Design',
      techStack: newSite.techStack || 'Next.js',
      platform: newSite.platform || 'Vercel',
      url: newSite.url,
    };

    onUpdate({
      ...data,
      landingSites: [...data.landingSites, site],
    });

    setNewSite({ domain: '', purpose: '', techStack: '', platform: '', url: '' });
    setShowAddForm(false);
  };

  const handleUpdateSite = (id: string, updates: Partial<LandingSite>) => {
    onUpdate({
      ...data,
      landingSites: data.landingSites.map(s => (s.id === id ? { ...s, ...updates } : s)),
    });
  };

  const handleDeleteSite = (id: string) => {
    if (confirm('Delete this site?')) {
      onUpdate({
        ...data,
        landingSites: data.landingSites.filter(s => s.id !== id),
      });
    }
  };

  const liveCount = data.landingSites.filter(s => s.status === 'Live').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-8 h-8 text-gold" />
          <div>
            <h2 className="text-3xl font-bold">Landing Pages 🌐</h2>
            <p className="text-sm text-gray-400 mt-1">
              {liveCount} live · {data.landingSites.length} total
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Site
        </Button>
      </div>

      {/* Add Site Form */}
      {showAddForm && (
        <Card className="border-blue/30">
          <h3 className="font-semibold mb-4">Add New Site</h3>
          <div className="space-y-4">
            <Input
              placeholder="Domain (e.g., example.com)"
              value={newSite.domain}
              onChange={e => setNewSite({ ...newSite, domain: e.target.value })}
            />
            <Input
              placeholder="Purpose (e.g., Marketing site)"
              value={newSite.purpose}
              onChange={e => setNewSite({ ...newSite, purpose: e.target.value })}
            />
            <Input
              placeholder="Tech stack (e.g., Next.js)"
              value={newSite.techStack}
              onChange={e => setNewSite({ ...newSite, techStack: e.target.value })}
            />
            <Input
              placeholder="Platform (e.g., Vercel, GitHub Pages)"
              value={newSite.platform}
              onChange={e => setNewSite({ ...newSite, platform: e.target.value })}
            />
            <Input
              placeholder="URL (optional)"
              value={newSite.url}
              onChange={e => setNewSite({ ...newSite, url: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddSite}>Add Site</Button>
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Sites Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.landingSites.map(site => (
          <Card key={site.id} className="border-blue/30">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{site.domain}</h3>
                <p className="text-sm text-gray-400 mt-1">{site.purpose}</p>
              </div>
              <button
                onClick={() => handleDeleteSite(site.id)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-2">Status</label>
              <select
                value={site.status}
                onChange={e =>
                  handleUpdateSite(site.id, { status: e.target.value as SiteStatus })
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
                <div className={`w-3 h-3 rounded-full ${statusColors[site.status]}`} />
                <span className="text-xs text-gray-400">{site.status}</span>
              </div>
            </div>

            {/* Tech Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Tech Stack:</span>
                <span className="text-gray-300">{site.techStack}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Platform:</span>
                <span className="text-gray-300">{site.platform}</span>
              </div>
            </div>

            {/* URL */}
            {site.url ? (
              <Button
                variant="secondary"
                onClick={() => window.open(site.url, '_blank')}
                className="w-full"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Site
              </Button>
            ) : (
              <Input
                placeholder="Add URL when deployed"
                value=""
                onChange={e => handleUpdateSite(site.id, { url: e.target.value })}
              />
            )}
          </Card>
        ))}
      </div>

      {data.landingSites.length === 0 && (
        <Card className="text-center py-12">
          <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No sites yet. Add your first landing page!</p>
        </Card>
      )}
    </div>
  );
}
