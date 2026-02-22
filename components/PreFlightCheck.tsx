'use client';

import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Textarea from './ui/Textarea';
import { CheckSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PreFlightCheckState {
  concern: string;
  accomplishment: string;
  scope: string;
  playbook: string;
  quality: string;
}

export default function PreFlightCheck() {
  const [check, setCheck] = useState<PreFlightCheckState>({
    concern: '',
    accomplishment: '',
    scope: '',
    playbook: '',
    quality: '',
  });

  const isComplete = Object.values(check).every(v => v.trim().length > 0);
  const completedCount = Object.values(check).filter(v => v.trim().length > 0).length;

  const handleReset = () => {
    if (confirm('Reset all fields?')) {
      setCheck({
        concern: '',
        accomplishment: '',
        scope: '',
        playbook: '',
        quality: '',
      });
    }
  };

  const questions = [
    {
      key: 'concern' as keyof PreFlightCheckState,
      number: 1,
      framework: 'SFFCMM',
      question: 'CONCERN: What area of importance does this address?',
      help: 'Connect this task to your strategic cascade. Which concern, outcome, or result does this serve?',
    },
    {
      key: 'accomplishment' as keyof PreFlightCheckState,
      number: 2,
      framework: 'Mission Control',
      question: 'ACCOMPLISHMENT: What exists when complete?',
      help: 'Describe the tangible deliverable. Not what you will do, but what will exist.',
    },
    {
      key: 'scope' as keyof PreFlightCheckState,
      number: 3,
      framework: 'PMP',
      question: 'SCOPE: What are the acceptance criteria?',
      help: 'How do you know it is done? What must be true for this to be considered complete?',
    },
    {
      key: 'playbook' as keyof PreFlightCheckState,
      number: 4,
      framework: 'All',
      question: 'PLAYBOOK: Which guides/factors apply?',
      help: 'What frameworks, templates, or best practices guide this work? What factors matter?',
    },
    {
      key: 'quality' as keyof PreFlightCheckState,
      number: 5,
      framework: 'PMP',
      question: 'QUALITY: How do we verify it is right?',
      help: 'What quality gates, checks, or validations ensure this meets standards?',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckSquare className="w-8 h-8 text-gold" />
          <div>
            <h2 className="text-3xl font-bold">Pre-Flight Check ✅</h2>
            <p className="text-sm text-gray-400 mt-1">
              Answer all 5 questions before starting any task
            </p>
          </div>
        </div>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Progress Indicator */}
      <Card className={`${isComplete ? 'bg-green-500/10 border-green-500/30' : 'bg-gold/10 border-gold/30'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isComplete ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-gold" />
            )}
            <div>
              <h3 className="font-semibold">
                {isComplete ? 'Ready to Proceed ✓' : 'Incomplete Pre-Flight Check'}
              </h3>
              <p className="text-sm text-gray-400">
                {completedCount}/5 questions answered
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="w-full bg-surface rounded-full h-2 w-32">
              <div
                className={`${
                  isComplete ? 'bg-green-500' : 'bg-gold'
                } h-2 rounded-full transition-all`}
                style={{ width: `${(completedCount / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Framework Info */}
      <Card className="bg-blue/10 border-blue/30">
        <h3 className="font-bold mb-2">The Unified Pre-Flight Check</h3>
        <p className="text-sm text-gray-300 mb-3">
          This combines SFFCMM (strategy), Mission Control (outcomes), and PMP (execution) into 5 essential questions.
          If you cannot answer all 5, do not start the task.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gold/20 border border-gold/40 rounded-full text-xs font-semibold text-gold">
            SFFCMM
          </span>
          <span className="px-3 py-1 bg-blue/20 border border-blue/40 rounded-full text-xs font-semibold text-blue">
            Mission Control
          </span>
          <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs font-semibold text-purple-500">
            PMP
          </span>
        </div>
      </Card>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map(q => {
          const isFilled = check[q.key].trim().length > 0;
          const frameworkColor =
            q.framework === 'SFFCMM'
              ? 'text-gold'
              : q.framework === 'Mission Control'
              ? 'text-blue'
              : q.framework === 'PMP'
              ? 'text-purple-500'
              : 'text-gray-400';

          return (
            <Card key={q.key} className={`${isFilled ? 'border-green-500/30' : 'border-border'}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gold text-black font-bold text-sm">
                  {q.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold ${frameworkColor}`}>
                      {q.framework}
                    </span>
                    {isFilled && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  </div>
                  <h3 className="font-bold text-lg">{q.question}</h3>
                  <p className="text-sm text-gray-400 mt-1">{q.help}</p>
                </div>
              </div>
              <Textarea
                value={check[q.key]}
                onChange={e => setCheck({ ...check, [q.key]: e.target.value })}
                placeholder={`Answer question ${q.number}...`}
                rows={4}
                className={isFilled ? 'border-green-500/50' : ''}
              />
            </Card>
          );
        })}
      </div>

      {/* Final Check */}
      {isComplete && (
        <Card className="bg-green-500/10 border-green-500/30">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-bold text-green-500">Pre-Flight Check Complete!</h3>
              <p className="text-sm text-gray-400 mt-1">
                All questions answered. You are ready to start this task with clarity.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
