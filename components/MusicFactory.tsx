'use client';

import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import { Music, Copy, Plus, Trash2 } from 'lucide-react';
import { Song, SongStatus, MissionControlData } from '@/types';
import { copyWithToast } from '@/lib/clipboard';

interface MusicFactoryProps {
  data: MissionControlData;
  onUpdate: (data: MissionControlData) => void;
}

const statusOptions: SongStatus[] = [
  'Draft',
  'Lyrics Done',
  'Suno Ready',
  'Generated',
  'Video Done',
  'Published',
];

const statusColors: Record<SongStatus, string> = {
  Draft: 'bg-gray-500',
  'Lyrics Done': 'bg-blue-500',
  'Suno Ready': 'bg-gold',
  Generated: 'bg-purple-500',
  'Video Done': 'bg-orange-500',
  Published: 'bg-green-500',
};

export default function MusicFactory({ data, onUpdate }: MusicFactoryProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSong, setNewSong] = useState({
    name: '',
    language: '',
    sunoPrompt: '',
    lyricsPreview: '',
  });

  const handleAddSong = () => {
    if (!newSong.name || !newSong.language) {
      alert('Please fill in song name and language');
      return;
    }

    const song: Song = {
      id: `song${Date.now()}`,
      name: newSong.name,
      language: newSong.language,
      status: 'Draft',
      sunoPrompt: newSong.sunoPrompt,
      lyricsPreview: newSong.lyricsPreview,
    };

    onUpdate({
      ...data,
      songs: [...data.songs, song],
    });

    setNewSong({ name: '', language: '', sunoPrompt: '', lyricsPreview: '' });
    setShowAddForm(false);
  };

  const handleUpdateSong = (id: string, updates: Partial<Song>) => {
    onUpdate({
      ...data,
      songs: data.songs.map(s => (s.id === id ? { ...s, ...updates } : s)),
    });
  };

  const handleDeleteSong = (id: string) => {
    if (confirm('Delete this song?')) {
      onUpdate({
        ...data,
        songs: data.songs.filter(s => s.id !== id),
      });
    }
  };

  const publishedCount = data.songs.filter(s => s.status === 'Published').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Music className="w-8 h-8 text-gold" />
          <div>
            <h2 className="text-3xl font-bold">Music Factory 🎵</h2>
            <p className="text-sm text-gray-400 mt-1">
              {publishedCount}/{data.songsTarget} songs published
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-5 h-5 mr-2" />
          Add New Song
        </Button>
      </div>

      {/* Progress */}
      <Card className="bg-gold/10 border-gold/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Progress to 50 Songs</span>
          <span className="text-sm text-gold font-bold">
            {publishedCount}/{data.songsTarget}
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-3">
          <div
            className="bg-gradient-to-r from-gold to-yellow-500 h-3 rounded-full transition-all"
            style={{ width: `${(publishedCount / data.songsTarget) * 100}%` }}
          />
        </div>
      </Card>

      {/* Add Song Form */}
      {showAddForm && (
        <Card className="border-blue/30">
          <h3 className="font-semibold mb-4">Add New Song</h3>
          <div className="space-y-4">
            <Input
              placeholder="Song name"
              value={newSong.name}
              onChange={e => setNewSong({ ...newSong, name: e.target.value })}
            />
            <Input
              placeholder="Language (e.g., Kannada, Hindi)"
              value={newSong.language}
              onChange={e => setNewSong({ ...newSong, language: e.target.value })}
            />
            <Textarea
              placeholder="Suno prompt (optional)"
              value={newSong.sunoPrompt}
              onChange={e => setNewSong({ ...newSong, sunoPrompt: e.target.value })}
              rows={3}
            />
            <Textarea
              placeholder="Lyrics preview (first few lines)"
              value={newSong.lyricsPreview}
              onChange={e => setNewSong({ ...newSong, lyricsPreview: e.target.value })}
              rows={4}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddSong}>Add Song</Button>
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Songs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.songs.map(song => (
          <Card key={song.id} className="border-blue/30">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold">{song.name}</h3>
                <p className="text-sm text-gray-400">{song.language}</p>
              </div>
              <button
                onClick={() => handleDeleteSong(song.id)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-2">Status</label>
              <select
                value={song.status}
                onChange={e =>
                  handleUpdateSong(song.id, { status: e.target.value as SongStatus })
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
                <div className={`w-3 h-3 rounded-full ${statusColors[song.status]}`} />
                <span className="text-xs text-gray-400">{song.status}</span>
              </div>
            </div>

            {/* Suno Prompt */}
            {song.sunoPrompt && (
              <div className="mb-4">
                <label className="text-xs text-gray-400 block mb-2">Suno Prompt</label>
                <div className="bg-surface p-3 rounded-lg text-sm text-gray-300 mb-2">
                  {song.sunoPrompt}
                </div>
                <Button
                  variant="secondary"
                  onClick={() => copyWithToast(song.sunoPrompt, 'Suno prompt copied!')}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Suno Prompt
                </Button>
              </div>
            )}

            {/* Lyrics Preview */}
            {song.lyricsPreview && (
              <div className="mb-4">
                <label className="text-xs text-gray-400 block mb-2">Lyrics Preview</label>
                <div className="bg-surface p-3 rounded-lg text-sm text-gray-300 whitespace-pre-line">
                  {song.lyricsPreview}
                </div>
              </div>
            )}

            {/* URLs */}
            <div className="space-y-2">
              {song.videoUrl && (
                <Input
                  placeholder="Video URL"
                  value={song.videoUrl}
                  onChange={e => handleUpdateSong(song.id, { videoUrl: e.target.value })}
                />
              )}
              {song.publishedUrl && (
                <Input
                  placeholder="Published URL"
                  value={song.publishedUrl}
                  onChange={e => handleUpdateSong(song.id, { publishedUrl: e.target.value })}
                />
              )}
            </div>
          </Card>
        ))}
      </div>

      {data.songs.length === 0 && (
        <Card className="text-center py-12">
          <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No songs yet. Add your first song!</p>
        </Card>
      )}
    </div>
  );
}
