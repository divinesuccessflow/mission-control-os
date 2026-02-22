'use client';

import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { BookOpen, Copy, ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Book, BookStatus, MissionControlData, KDPChecklist } from '@/types';
import { copyWithToast } from '@/lib/clipboard';

interface BooksKDPProps {
  data: MissionControlData;
  onUpdate: (data: MissionControlData) => void;
}

const statusOptions: BookStatus[] = [
  'Writing',
  'Editing',
  'Cover Design',
  'Formatting',
  'KDP Upload',
  'Published',
];

export default function BooksKDP({ data, onUpdate }: BooksKDPProps) {
  const [expandedPrompts, setExpandedPrompts] = useState<Set<string>>(new Set());
  const [expandedChecklists, setExpandedChecklists] = useState<Set<string>>(new Set(['book1']));

  const togglePrompts = (bookId: string) => {
    setExpandedPrompts(prev => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      return next;
    });
  };

  const toggleChecklist = (bookId: string) => {
    setExpandedChecklists(prev => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      return next;
    });
  };

  const handleUpdateBook = (id: string, updates: Partial<Book>) => {
    onUpdate({
      ...data,
      books: data.books.map(b => (b.id === id ? { ...b, ...updates } : b)),
    });
  };

  const handleToggleChecklistItem = (bookId: string, key: keyof KDPChecklist) => {
    const book = data.books.find(b => b.id === bookId);
    if (!book) return;

    handleUpdateBook(bookId, {
      kdpChecklist: {
        ...book.kdpChecklist,
        [key]: !book.kdpChecklist[key],
      },
    });
  };

  const checklistItems: { key: keyof KDPChecklist; label: string }[] = [
    { key: 'manuscriptReady', label: 'Manuscript DOCX ready' },
    { key: 'coverImage', label: 'Cover image (2560x1600 front, full wrap if paperback)' },
    { key: 'description', label: 'Book description written' },
    { key: 'keywords', label: 'Keywords selected (7 keywords)' },
    { key: 'categories', label: 'Categories chosen (3 categories)' },
    { key: 'priceSet', label: 'Price set' },
    { key: 'kdpLoggedIn', label: 'KDP account logged in' },
    { key: 'uploaded', label: 'Uploaded to KDP' },
    { key: 'reviewSubmitted', label: 'Review submitted' },
    { key: 'liveOnAmazon', label: 'LIVE on Amazon' },
  ];

  const publishedCount = data.books.filter(b => b.status === 'Published').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-gold" />
          <div>
            <h2 className="text-3xl font-bold">Books (KDP Pipeline) 📚</h2>
            <p className="text-sm text-gray-400 mt-1">{publishedCount} published</p>
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="space-y-6">
        {data.books.map(book => {
          const promptsExpanded = expandedPrompts.has(book.id);
          const checklistExpanded = expandedChecklists.has(book.id);
          const completedItems = Object.values(book.kdpChecklist).filter(Boolean).length;
          const totalItems = checklistItems.length;

          return (
            <Card key={book.id} className="border-blue/30">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{book.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span>{book.wordCount.toLocaleString()} words</span>
                    <span>•</span>
                    <span className="text-blue">{book.status}</span>
                  </div>
                </div>
              </div>

              {/* Status Selector */}
              <div className="mb-4">
                <label className="text-xs text-gray-400 block mb-2">Status</label>
                <select
                  value={book.status}
                  onChange={e =>
                    handleUpdateBook(book.id, { status: e.target.value as BookStatus })
                  }
                  className="w-full max-w-xs bg-surface border border-border rounded-lg px-3 py-2 text-sm"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Next Step */}
              <div className="mb-4 p-4 bg-gold/10 border border-gold/30 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">NEXT STEP</p>
                <p className="font-semibold text-gold">{book.nextStep}</p>
              </div>

              {/* KDP Checklist */}
              <div className="mb-4">
                <button
                  onClick={() => toggleChecklist(book.id)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <div className="flex items-center gap-2">
                    {checklistExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gold" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gold" />
                    )}
                    <h4 className="font-semibold text-gold">
                      KDP Launch Checklist ({completedItems}/{totalItems})
                    </h4>
                  </div>
                </button>

                {checklistExpanded && (
                  <div className="space-y-2 pl-7">
                    {checklistItems.map(item => (
                      <label
                        key={item.key}
                        className="flex items-center gap-3 cursor-pointer hover:bg-surface p-2 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={book.kdpChecklist[item.key]}
                          onChange={() => handleToggleChecklistItem(book.id, item.key)}
                          className="w-4 h-4 accent-gold"
                        />
                        <span
                          className={`text-sm ${
                            book.kdpChecklist[item.key] ? 'text-gray-400 line-through' : 'text-gray-300'
                          }`}
                        >
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Image Prompts */}
              {book.imagePrompts.length > 0 && (
                <div>
                  <button
                    onClick={() => togglePrompts(book.id)}
                    className="w-full flex items-center justify-between mb-3"
                  >
                    <div className="flex items-center gap-2">
                      {promptsExpanded ? (
                        <ChevronDown className="w-5 h-5 text-blue" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-blue" />
                      )}
                      <h4 className="font-semibold text-blue">
                        Image Prompts ({book.imagePrompts.length})
                      </h4>
                    </div>
                  </button>

                  {promptsExpanded && (
                    <div className="space-y-3 pl-7">
                      {book.imagePrompts.map(prompt => (
                        <div
                          key={prompt.id}
                          className="p-3 bg-surface rounded-lg border border-border"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-sm text-gray-300">
                              {prompt.label}
                            </h5>
                            <Button
                              variant="secondary"
                              onClick={() =>
                                copyWithToast(prompt.prompt, `${prompt.label} copied!`)
                              }
                              className="text-xs py-1"
                            >
                              <Copy className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {prompt.prompt}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {data.books.length === 0 && (
        <Card className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No books yet.</p>
        </Card>
      )}
    </div>
  );
}
