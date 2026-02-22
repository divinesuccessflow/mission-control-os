'use client';

import { useState, useMemo } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { DollarSign, Plus, TrendingUp, Trash2 } from 'lucide-react';
import { MissionControlData, AdCampaign, RevenueSource } from '@/types';
import { formatNumber } from '@/lib/utils';

interface RevenueAdsProps {
  data: MissionControlData;
  onUpdate: (data: MissionControlData) => void;
}

export default function RevenueAds({ data, onUpdate }: RevenueAdsProps) {
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    platform: '',
    campaign: '',
    spend: '',
    revenue: '',
  });

  const thisMonthRevenue = useMemo(() => {
    const thisMonth = new Date().toISOString().slice(0, 7);
    const monthData = data.revenueByMonth.find(m => m.month === thisMonth);
    return monthData?.amount || 0;
  }, [data.revenueByMonth]);

  const handleAddCampaign = () => {
    if (!newCampaign.platform || !newCampaign.campaign) {
      alert('Please fill in platform and campaign name');
      return;
    }

    const campaign: AdCampaign = {
      id: `campaign${Date.now()}`,
      platform: newCampaign.platform,
      campaign: newCampaign.campaign,
      spend: parseFloat(newCampaign.spend) || 0,
      revenue: parseFloat(newCampaign.revenue) || 0,
    };

    onUpdate({
      ...data,
      adCampaigns: [...data.adCampaigns, campaign],
    });

    setNewCampaign({ platform: '', campaign: '', spend: '', revenue: '' });
    setShowAddCampaign(false);
  };

  const handleUpdateCampaign = (id: string, updates: Partial<AdCampaign>) => {
    onUpdate({
      ...data,
      adCampaigns: data.adCampaigns.map(c => (c.id === id ? { ...c, ...updates } : c)),
    });
  };

  const handleDeleteCampaign = (id: string) => {
    if (confirm('Delete this campaign?')) {
      onUpdate({
        ...data,
        adCampaigns: data.adCampaigns.filter(c => c.id !== id),
      });
    }
  };

  const handleUpdateRevenueSource = (source: string, amount: number) => {
    const existing = data.revenueSources.find(r => r.source === source);
    if (existing) {
      onUpdate({
        ...data,
        revenueSources: data.revenueSources.map(r =>
          r.source === source ? { ...r, amount } : r
        ),
      });
    } else {
      onUpdate({
        ...data,
        revenueSources: [...data.revenueSources, { source, amount }],
      });
    }
  };

  const handleUpdateMonthlyRevenue = (month: string, amount: number) => {
    const existing = data.revenueByMonth.find(r => r.month === month);
    if (existing) {
      onUpdate({
        ...data,
        revenueByMonth: data.revenueByMonth.map(r =>
          r.month === month ? { ...r, amount } : r
        ),
      });
    } else {
      onUpdate({
        ...data,
        revenueByMonth: [...data.revenueByMonth, { month, amount }],
      });
    }
  };

  const maxRevenue = Math.max(...data.revenueByMonth.map(m => m.amount), 1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <DollarSign className="w-8 h-8 text-gold" />
        <div>
          <h2 className="text-3xl font-bold">Revenue & Ads 💰</h2>
          <p className="text-sm text-gray-400 mt-1">
            This month: ₹{formatNumber(thisMonthRevenue)} / Goal: ₹{formatNumber(data.revenueGoal)}
          </p>
        </div>
      </div>

      {/* Monthly Goal Progress */}
      <Card className="bg-gradient-to-br from-gold/20 to-gold/5 border-gold/30">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Monthly Goal: ₹1 Crore</h3>
          <span className="text-sm text-gold font-bold">
            {((thisMonthRevenue / data.revenueGoal) * 100).toFixed(2)}%
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-4">
          <div
            className="bg-gradient-to-r from-gold to-yellow-500 h-4 rounded-full transition-all"
            style={{ width: `${Math.min(100, (thisMonthRevenue / data.revenueGoal) * 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          ₹{formatNumber(data.revenueGoal - thisMonthRevenue)} remaining
        </p>
      </Card>

      {/* Revenue by Source */}
      <Card>
        <h3 className="font-semibold mb-4">Revenue by Source</h3>
        <div className="space-y-3">
          {data.revenueSources.map(source => (
            <div key={source.source} className="flex items-center gap-3">
              <Input
                value={source.source}
                className="flex-1"
                readOnly
              />
              <Input
                type="number"
                value={source.amount}
                onChange={e =>
                  handleUpdateRevenueSource(source.source, parseFloat(e.target.value) || 0)
                }
                className="w-32"
                placeholder="Amount"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Revenue Chart */}
      <Card>
        <h3 className="font-semibold mb-4">Monthly Revenue</h3>
        <div className="space-y-2">
          {data.revenueByMonth
            .sort((a, b) => b.month.localeCompare(a.month))
            .map(month => (
              <div key={month.month} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    {new Date(month.month + '-01').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                  <span className="text-gold font-semibold">₹{formatNumber(month.amount)}</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-gold to-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${(month.amount / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Ad Campaigns */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Ad Campaigns</h3>
          <Button onClick={() => setShowAddCampaign(!showAddCampaign)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Campaign
          </Button>
        </div>

        {showAddCampaign && (
          <div className="mb-4 p-4 bg-surface rounded-lg border border-border">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input
                placeholder="Platform (Meta/Google)"
                value={newCampaign.platform}
                onChange={e => setNewCampaign({ ...newCampaign, platform: e.target.value })}
              />
              <Input
                placeholder="Campaign name"
                value={newCampaign.campaign}
                onChange={e => setNewCampaign({ ...newCampaign, campaign: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Spend"
                value={newCampaign.spend}
                onChange={e => setNewCampaign({ ...newCampaign, spend: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Revenue"
                value={newCampaign.revenue}
                onChange={e => setNewCampaign({ ...newCampaign, revenue: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddCampaign}>Add</Button>
              <Button variant="secondary" onClick={() => setShowAddCampaign(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {data.adCampaigns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-gray-400 font-semibold">Platform</th>
                  <th className="text-left py-2 text-gray-400 font-semibold">Campaign</th>
                  <th className="text-right py-2 text-gray-400 font-semibold">Spend</th>
                  <th className="text-right py-2 text-gray-400 font-semibold">Revenue</th>
                  <th className="text-right py-2 text-gray-400 font-semibold">ROAS</th>
                  <th className="text-right py-2"></th>
                </tr>
              </thead>
              <tbody>
                {data.adCampaigns.map(campaign => {
                  const roas = campaign.spend > 0 ? (campaign.revenue / campaign.spend).toFixed(2) : '0';
                  return (
                    <tr key={campaign.id} className="border-b border-border/50">
                      <td className="py-2">{campaign.platform}</td>
                      <td className="py-2">{campaign.campaign}</td>
                      <td className="py-2 text-right">₹{formatNumber(campaign.spend)}</td>
                      <td className="py-2 text-right">₹{formatNumber(campaign.revenue)}</td>
                      <td className="py-2 text-right text-gold font-semibold">{roas}x</td>
                      <td className="py-2 text-right">
                        <button
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No ad campaigns yet</p>
        )}
      </Card>
    </div>
  );
}
