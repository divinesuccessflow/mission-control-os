'use client';

import { useMemo } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import { Rocket, Calendar } from 'lucide-react';
import { MissionControlData, AIProsperityChecklist } from '@/types';
import { calculateDaysRemaining } from '@/lib/utils';

interface AIProsperityProps {
  data: MissionControlData;
  onUpdate: (data: MissionControlData) => void;
}

export default function AIProsperity({ data, onUpdate }: AIProsperityProps) {
  const daysToLaunch = calculateDaysRemaining(data.aiProsperityLaunchDate);
  const launchDate = new Date(data.aiProsperityLaunchDate);

  const checklistItems: { key: keyof AIProsperityChecklist; label: string }[] = [
    { key: 'curriculumFinalized', label: 'Curriculum finalized' },
    { key: 'masterpromptReady', label: 'Masterprompt ready' },
    { key: 'buildPlaybookDone', label: 'Build Playbook done' },
    { key: 'launchKitComplete', label: 'Launch Kit complete' },
    { key: 'pricingSet', label: 'Pricing set (₹9,999 / ₹14,999 / ₹29,999)' },
    { key: 'landingPageLive', label: 'Landing page live' },
    { key: 'paymentGateway', label: 'Payment gateway (Razorpay)' },
    { key: 'tenSignupsTarget', label: '10 signups target' },
    { key: 'linkedInPromotion', label: 'LinkedIn promotion' },
    { key: 'emailSequence', label: 'Email sequence' },
  ];

  const handleToggleChecklistItem = (key: keyof AIProsperityChecklist) => {
    onUpdate({
      ...data,
      aiProsperityChecklist: {
        ...data.aiProsperityChecklist,
        [key]: !data.aiProsperityChecklist[key],
      },
    });
  };

  const handleUpdateSignups = (signups: number) => {
    onUpdate({
      ...data,
      aiProsperitySignups: signups,
    });
  };

  const completedItems = Object.values(data.aiProsperityChecklist).filter(Boolean).length;
  const totalItems = checklistItems.length;

  const urgencyColor = useMemo(() => {
    if (daysToLaunch <= 7) return 'text-red-500';
    if (daysToLaunch <= 14) return 'text-orange-500';
    return 'text-gold';
  }, [daysToLaunch]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Rocket className="w-8 h-8 text-gold" />
        <div>
          <h2 className="text-3xl font-bold">AI Prosperity Movement 🚀</h2>
          <p className="text-sm text-gray-400 mt-1">
            Launch: {launchDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Countdown */}
      <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Calendar className="w-12 h-12 text-purple-500" />
            <div>
              <p className="text-sm text-gray-400">Time to Launch</p>
              <p className={`text-4xl font-bold ${urgencyColor}`}>
                {daysToLaunch > 0 ? `${daysToLaunch} days` : 'LIVE!'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Signups</p>
            <div className="flex items-center gap-2 mt-1">
              <Input
                type="number"
                value={data.aiProsperitySignups}
                onChange={e => handleUpdateSignups(parseInt(e.target.value) || 0)}
                className="w-20 text-center text-2xl font-bold"
              />
              <span className="text-2xl font-bold text-gray-400">/ 10</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Progress */}
      <Card className="bg-gold/10 border-gold/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Launch Readiness</span>
          <span className="text-sm text-gold font-bold">
            {completedItems}/{totalItems}
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-3">
          <div
            className="bg-gradient-to-r from-gold to-yellow-500 h-3 rounded-full transition-all"
            style={{ width: `${(completedItems / totalItems) * 100}%` }}
          />
        </div>
      </Card>

      {/* Launch Checklist */}
      <Card>
        <h3 className="font-semibold mb-4">Launch Checklist</h3>
        <div className="space-y-2">
          {checklistItems.map(item => (
            <label
              key={item.key}
              className="flex items-center gap-3 cursor-pointer hover:bg-surface p-3 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={data.aiProsperityChecklist[item.key]}
                onChange={() => handleToggleChecklistItem(item.key)}
                className="w-5 h-5 accent-gold"
              />
              <span
                className={`flex-1 ${
                  data.aiProsperityChecklist[item.key]
                    ? 'text-gray-400 line-through'
                    : 'text-gray-300'
                }`}
              >
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </Card>

      {/* Pricing Tiers */}
      <Card>
        <h3 className="font-semibold mb-4">Pricing Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface rounded-lg border border-border text-center">
            <h4 className="font-semibold text-gray-400 mb-2">Foundation</h4>
            <p className="text-3xl font-bold text-gold">₹9,999</p>
          </div>
          <div className="p-4 bg-blue/10 rounded-lg border border-blue/30 text-center">
            <h4 className="font-semibold text-blue mb-2">Builder</h4>
            <p className="text-3xl font-bold text-blue">₹14,999</p>
            <span className="text-xs text-blue">POPULAR</span>
          </div>
          <div className="p-4 bg-gold/10 rounded-lg border border-gold/30 text-center">
            <h4 className="font-semibold text-gold mb-2">Elite</h4>
            <p className="text-3xl font-bold text-gold">₹29,999</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
