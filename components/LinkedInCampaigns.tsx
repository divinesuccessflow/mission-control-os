'use client';

import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import { Linkedin, Copy, Plus, Trash2 } from 'lucide-react';
import { LinkedInPost, PostStatus, MissionControlData } from '@/types';
import { copyWithToast } from '@/lib/clipboard';

interface LinkedInCampaignsProps {
  data: MissionControlData;
  onUpdate: (data: MissionControlData) => void;
}

const statusOptions: PostStatus[] = ['Idea', 'Drafted', 'Scheduled', 'Posted', 'Engaged'];

export default function LinkedInCampaigns({ data, onUpdate }: LinkedInCampaignsProps) {
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPost, setNewPost] = useState({
    date: '',
    topic: '',
    content: '',
  });

  const handleAddPost = () => {
    if (!newPost.date || !newPost.topic) {
      alert('Please fill in date and topic');
      return;
    }

    const post: LinkedInPost = {
      id: `post${Date.now()}`,
      date: newPost.date,
      topic: newPost.topic,
      status: 'Idea',
      content: newPost.content,
    };

    onUpdate({
      ...data,
      linkedInPosts: [...data.linkedInPosts, post],
    });

    setNewPost({ date: '', topic: '', content: '' });
    setShowAddPost(false);
  };

  const handleUpdatePost = (id: string, updates: Partial<LinkedInPost>) => {
    onUpdate({
      ...data,
      linkedInPosts: data.linkedInPosts.map(p => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Delete this post?')) {
      onUpdate({
        ...data,
        linkedInPosts: data.linkedInPosts.filter(p => p.id !== id),
      });
    }
  };

  const postedCount = data.linkedInPosts.filter(p => p.status === 'Posted' || p.status === 'Engaged').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Linkedin className="w-8 h-8 text-gold" />
          <div>
            <h2 className="text-3xl font-bold">LinkedIn 💼</h2>
            <p className="text-sm text-gray-400 mt-1">
              {postedCount} posted · Weekly target: {data.linkedInWeeklyTarget}
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddPost(!showAddPost)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Post
        </Button>
      </div>

      {/* Add Post Form */}
      {showAddPost && (
        <Card className="border-blue/30">
          <h3 className="font-semibold mb-4">Add New Post</h3>
          <div className="space-y-4">
            <Input
              type="date"
              value={newPost.date}
              onChange={e => setNewPost({ ...newPost, date: e.target.value })}
            />
            <Input
              placeholder="Post topic"
              value={newPost.topic}
              onChange={e => setNewPost({ ...newPost, topic: e.target.value })}
            />
            <Textarea
              placeholder="Post content (optional)"
              value={newPost.content}
              onChange={e => setNewPost({ ...newPost, content: e.target.value })}
              rows={6}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddPost}>Add Post</Button>
              <Button variant="secondary" onClick={() => setShowAddPost(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.linkedInCampaigns.map(campaign => (
          <Card key={campaign.id} className="bg-blue/10 border-blue/30">
            <h3 className="font-semibold mb-3">{campaign.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Connections Sent:</span>
                <span className="text-gold font-semibold">{campaign.connectionsSent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Accepted:</span>
                <span className="text-green-500 font-semibold">{campaign.connectionsAccepted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Acceptance Rate:</span>
                <span className="text-blue font-semibold">
                  {campaign.connectionsSent > 0
                    ? ((campaign.connectionsAccepted / campaign.connectionsSent) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Calendar */}
      <Card>
        <h3 className="font-semibold mb-4">Content Calendar</h3>
        <div className="space-y-3">
          {data.linkedInPosts
            .sort((a, b) => a.date.localeCompare(b.date))
            .map(post => (
              <div
                key={post.id}
                className="p-4 bg-surface rounded-lg border border-border hover:border-blue/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm text-gray-400">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <select
                        value={post.status}
                        onChange={e =>
                          handleUpdatePost(post.id, { status: e.target.value as PostStatus })
                        }
                        className="text-xs bg-background border border-border rounded px-2 py-1"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h4 className="font-semibold text-white">{post.topic}</h4>
                  </div>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-500 hover:text-red-400 transition-colors ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {post.content && (
                  <div className="mt-3">
                    <div className="bg-background p-3 rounded text-sm text-gray-300 whitespace-pre-line mb-2">
                      {post.content}
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => copyWithToast(post.content!, 'Post copied!')}
                      className="text-xs"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy Post
                    </Button>
                  </div>
                )}
              </div>
            ))}

          {data.linkedInPosts.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">No posts scheduled</p>
          )}
        </div>
      </Card>
    </div>
  );
}
