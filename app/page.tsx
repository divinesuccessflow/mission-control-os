'use client';

import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, Music, BookOpen, ShoppingBag, Users, Users2, 
  GraduationCap, Rocket, FileText, Globe, DollarSign, 
  FolderKanban, CheckSquare, BookMarked, Copy, Check,
  Plus, ChevronDown, ChevronUp, X, Target, TrendingUp, Award
} from 'lucide-react';
import { 
  Book, Song, Client, Partnership, Session, ContentPost, 
  LandingPage, DigitalProduct, Project, DailyKPI, KPIData, 
  Achievement, KPIStats 
} from './types';
import {
  initialBooks, initialSongs, initialClients, initialPartnerships,
  initialSessions, initialContentPosts, initialLandingPages,
  initialDigitalProducts, initialProjects
} from './initialData';

type NavItem = 
  | 'dashboard' | 'kpis' | 'songs' | 'books' | 'gumroad' | 'clients' 
  | 'partnerships' | 'ap3' | 'ap4' | 'content' | 'landing' 
  | 'revenue' | 'projects' | 'preflight' | 'knowledge';

export default function Home() {
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [partnerships, setPartnerships] = useState<Partnership[]>(initialPartnerships);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [contentPosts, setContentPosts] = useState<ContentPost[]>(initialContentPosts);
  const [landingPages, setLandingPages] = useState<LandingPage[]>(initialLandingPages);
  const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>(initialDigitalProducts);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  // KPI Dashboard State
  const [kpiData, setKpiData] = useState<KPIData>({});
  const [kpiStats, setKpiStats] = useState<KPIStats>({
    totalPoints: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    achievements: []
  });
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showAnimation, setShowAnimation] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('missionControlData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBooks(data.books || initialBooks);
        setSongs(data.songs || initialSongs);
        setClients(data.clients || initialClients);
        setPartnerships(data.partnerships || initialPartnerships);
        setSessions(data.sessions || initialSessions);
        setContentPosts(data.contentPosts || initialContentPosts);
        setLandingPages(data.landingPages || initialLandingPages);
        setDigitalProducts(data.digitalProducts || initialDigitalProducts);
        setProjects(data.projects || initialProjects);
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
    
    // Load KPI data
    const savedKPI = localStorage.getItem('kpiData');
    if (savedKPI) {
      try {
        setKpiData(JSON.parse(savedKPI));
      } catch (e) {
        console.error('Error loading KPI data:', e);
      }
    }
    
    const savedKPIStats = localStorage.getItem('kpiStats');
    if (savedKPIStats) {
      try {
        setKpiStats(JSON.parse(savedKPIStats));
      } catch (e) {
        console.error('Error loading KPI stats:', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const data = {
      books, songs, clients, partnerships, sessions, 
      contentPosts, landingPages, digitalProducts, projects
    };
    localStorage.setItem('missionControlData', JSON.stringify(data));
  }, [books, songs, clients, partnerships, sessions, contentPosts, landingPages, digitalProducts, projects]);
  
  // Save KPI data
  useEffect(() => {
    localStorage.setItem('kpiData', JSON.stringify(kpiData));
  }, [kpiData]);
  
  useEffect(() => {
    localStorage.setItem('kpiStats', JSON.stringify(kpiStats));
  }, [kpiStats]);

  // Render Charts
  useEffect(() => {
    if (activeNav !== 'kpis') return;
    if (typeof window === 'undefined' || !(window as any).Chart) return;

    const Chart = (window as any).Chart;

    // Daily Bar Chart
    const dailyCanvas = document.getElementById('dailyChart') as HTMLCanvasElement;
    if (dailyCanvas) {
      const ctx = dailyCanvas.getContext('2d');
      if (ctx) {
        const kpi = getKPIForDate(selectedDate);
        const labels = ['Books', 'Songs', 'Extensions', 'Registrations', 'Emails', 'WhatsApp', 'LinkedIn', 'Web Apps', 'Landing Pages', 'Revenue'];
        const actualData = [
          kpi.books, kpi.songs, kpi.extensions, kpi.registrations,
          kpi.emails, kpi.whatsapp, kpi.linkedin, kpi.webApps,
          kpi.landingPages, kpi.revenue
        ];
        const targetData = [
          kpiTargets.books, kpiTargets.songs, kpiTargets.extensions,
          kpiTargets.registrations, kpiTargets.emails, kpiTargets.whatsapp,
          kpiTargets.linkedin, kpiTargets.webApps, kpiTargets.landingPages,
          kpiTargets.revenue
        ];
        
        const percentages = actualData.map((val, i) => (val / targetData[i]) * 100);
        const colors = percentages.map(p => {
          if (p >= 100) return 'rgba(34, 197, 94, 0.8)';
          if (p >= 50) return 'rgba(234, 179, 8, 0.8)';
          return 'rgba(239, 68, 68, 0.8)';
        });

        // Destroy existing chart
        Chart.getChart(dailyCanvas)?.destroy();

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Actual',
                data: actualData,
                backgroundColor: colors,
                borderColor: colors.map(c => c.replace('0.8', '1')),
                borderWidth: 1
              },
              {
                label: 'Target',
                data: targetData,
                backgroundColor: 'rgba(107, 114, 128, 0.3)',
                borderColor: 'rgba(107, 114, 128, 0.6)',
                borderWidth: 1,
                borderDash: [5, 5]
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#e7e9ea' }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: '#e7e9ea' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              },
              x: {
                ticks: { color: '#e7e9ea' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              }
            }
          }
        });
      }
    }

    // Weekly Trend Chart
    const weeklyCanvas = document.getElementById('weeklyChart') as HTMLCanvasElement;
    if (weeklyCanvas) {
      const ctx = weeklyCanvas.getContext('2d');
      if (ctx) {
        const dates = [];
        const scores = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          dates.push(dateStr.slice(5)); // MM-DD format
          const kpi = getKPIForDate(dateStr);
          scores.push(calculateDailyScore(kpi));
        }

        // Destroy existing chart
        Chart.getChart(weeklyCanvas)?.destroy();

        new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: 'Daily Score',
              data: scores,
              borderColor: 'rgb(234, 179, 8)',
              backgroundColor: 'rgba(234, 179, 8, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#e7e9ea' }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 1000,
                ticks: { color: '#e7e9ea' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              },
              x: {
                ticks: { color: '#e7e9ea' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              }
            }
          }
        });
      }
    }
  }, [activeNav, selectedDate, kpiData]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied!`);
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // KPI Helper Functions
  const kpiTargets = {
    books: 3,
    songs: 5,
    extensions: 1,
    registrations: 10,
    emails: 1000,
    whatsapp: 50,
    linkedin: 25,
    webApps: 1,
    landingPages: 2,
    revenue: 33333
  };

  const getKPIForDate = (date: string): DailyKPI => {
    return kpiData[date] || {
      books: 0, songs: 0, extensions: 0, registrations: 0,
      emails: 0, whatsapp: 0, linkedin: 0, webApps: 0,
      landingPages: 0, revenue: 0
    };
  };

  const calculateDailyScore = (kpi: DailyKPI): number => {
    let total = 0;
    Object.keys(kpiTargets).forEach((key) => {
      const k = key as keyof DailyKPI;
      const percentage = (kpi[k] / kpiTargets[k]) * 100;
      total += Math.min(percentage, 150); // Cap at 150% per KPI
    });
    return Math.round(total);
  };

  const updateKPI = (date: string, field: keyof DailyKPI, value: number) => {
    const newKpiData = { ...kpiData };
    if (!newKpiData[date]) {
      newKpiData[date] = getKPIForDate(date);
    }
    newKpiData[date][field] = value;
    setKpiData(newKpiData);
    
    // Trigger animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
    
    // Recalculate stats
    recalculateStats(newKpiData);
  };

  const recalculateStats = (data: KPIData) => {
    const dates = Object.keys(data).sort();
    let totalPoints = 0;
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    // Calculate total points and streaks
    dates.forEach((date, index) => {
      const score = calculateDailyScore(data[date]);
      totalPoints += score;
      
      if (score >= 800) { // 80% of max (10 KPIs × 100 = 1000)
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
      
      // Current streak (from most recent backwards)
      if (index === dates.length - 1) {
        currentStreak = tempStreak;
      }
    });
    
    // Calculate level (every 1000 points = 1 level)
    const level = Math.floor(totalPoints / 1000) + 1;
    
    // Check achievements
    const achievements = checkAchievements(data, currentStreak, totalPoints);
    
    setKpiStats({
      totalPoints,
      level,
      currentStreak,
      longestStreak,
      achievements
    });
  };

  const checkAchievements = (data: KPIData, streak: number, points: number): Achievement[] => {
    const achievements: Achievement[] = [
      {
        id: 'first-1k-emails',
        title: 'Email Champion',
        description: 'Send 1,000 emails in a single day',
        icon: '📧',
        unlocked: false
      },
      {
        id: '10-books',
        title: 'Author Pro',
        description: 'Publish 10 books total',
        icon: '📚',
        unlocked: false
      },
      {
        id: '7-day-streak',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        unlocked: false
      },
      {
        id: 'perfect-day',
        title: 'Perfect Day',
        description: 'Hit 100% on all KPIs in one day',
        icon: '💯',
        unlocked: false
      },
      {
        id: 'revenue-1l',
        title: 'Revenue Milestone',
        description: 'Earn ₹1,00,000 total',
        icon: '💰',
        unlocked: false
      },
      {
        id: 'level-5',
        title: 'Level 5',
        description: 'Reach level 5',
        icon: '⭐',
        unlocked: false
      }
    ];

    // Check each achievement
    Object.values(data).forEach(kpi => {
      if (kpi.emails >= 1000) achievements[0].unlocked = true;
      const allGreen = Object.keys(kpiTargets).every(k => {
        const key = k as keyof DailyKPI;
        return kpi[key] >= kpiTargets[key];
      });
      if (allGreen) achievements[3].unlocked = true;
    });

    const totalBooks = Object.values(data).reduce((sum, kpi) => sum + kpi.books, 0);
    if (totalBooks >= 10) achievements[1].unlocked = true;

    if (streak >= 7) achievements[2].unlocked = true;

    const totalRevenue = Object.values(data).reduce((sum, kpi) => sum + kpi.revenue, 0);
    if (totalRevenue >= 100000) achievements[4].unlocked = true;

    const level = Math.floor(points / 1000) + 1;
    if (level >= 5) achievements[5].unlocked = true;

    return achievements;
  };

  const getColorForPercentage = (percentage: number): string => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const navItems = [
    { id: 'dashboard' as NavItem, icon: HomeIcon, label: 'Dashboard' },
    { id: 'kpis' as NavItem, icon: Target, label: '🎯 Daily KPIs' },
    { id: 'songs' as NavItem, icon: Music, label: 'Songs (50)' },
    { id: 'books' as NavItem, icon: BookOpen, label: 'Books (500)' },
    { id: 'gumroad' as NavItem, icon: ShoppingBag, label: 'Gumroad' },
    { id: 'clients' as NavItem, icon: Users, label: 'Clients' },
    { id: 'partnerships' as NavItem, icon: Users2, label: 'Partnerships' },
    { id: 'ap3' as NavItem, icon: GraduationCap, label: 'AI Prosperity 3.0' },
    { id: 'ap4' as NavItem, icon: Rocket, label: 'AI Prosperity 4.0' },
    { id: 'content' as NavItem, icon: FileText, label: 'Content Plan' },
    { id: 'landing' as NavItem, icon: Globe, label: 'Landing Pages' },
    { id: 'revenue' as NavItem, icon: DollarSign, label: 'Revenue & Ads' },
    { id: 'projects' as NavItem, icon: FolderKanban, label: 'Projects Hub' },
    { id: 'preflight' as NavItem, icon: CheckSquare, label: 'Pre-Flight' },
    { id: 'knowledge' as NavItem, icon: BookMarked, label: 'Knowledge Docs' },
  ];

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const ap4LaunchDate = new Date('2026-03-11');
  const daysUntilLaunch = getDaysUntil(ap4LaunchDate);

  return (
    <div className="flex h-screen bg-[#0f1419] text-[#e7e9ea]">
      {/* Sidebar */}
      <div className="w-64 bg-[#16181c] border-r border-[#2f3336] overflow-y-auto">
        <div className="p-4 border-b border-[#2f3336]">
          <h1 className="text-xl font-bold text-gold-500">Mission Control OS</h1>
          <p className="text-xs text-gray-500">V3.0</p>
        </div>
        <nav className="p-2">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                activeNav === id
                  ? 'bg-gold-500/10 text-gold-500'
                  : 'hover:bg-[#253340] text-gray-300'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Dashboard */}
          {activeNav === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">🏠 Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-gold-500 text-2xl mb-2">📚</div>
                  <div className="text-2xl font-bold">{books.length}/500</div>
                  <div className="text-sm text-gray-400">Books</div>
                </div>
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-gold-500 text-2xl mb-2">🎵</div>
                  <div className="text-2xl font-bold">{songs.length}/50</div>
                  <div className="text-sm text-gray-400">Songs</div>
                </div>
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-blue-500 text-2xl mb-2">👥</div>
                  <div className="text-2xl font-bold">{clients.filter(c => c.status === 'Active').length}</div>
                  <div className="text-sm text-gray-400">Active Clients</div>
                </div>
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-green-500 text-2xl mb-2">🚀</div>
                  <div className="text-2xl font-bold">{daysUntilLaunch}</div>
                  <div className="text-sm text-gray-400">Days to AP 4.0</div>
                </div>
              </div>

              <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-gold-500">⚡ What to do NOW</h3>
                <ul className="space-y-2">
                  {sessions.find(s => s.status === 'Next') && (
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500">•</span>
                      <span>Prepare AI Prosperity 3.0 Session 8 content</span>
                    </li>
                  )}
                  {books.filter(b => b.status === 'KDP Upload').length > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500">•</span>
                      <span>Upload {books.filter(b => b.status === 'KDP Upload').length} books to KDP</span>
                    </li>
                  )}
                  {songs.filter(s => s.status === 'Suno Ready').length > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500">•</span>
                      <span>Generate {songs.filter(s => s.status === 'Suno Ready').length} songs in Suno</span>
                    </li>
                  )}
                  {clients.filter(c => c.status === 'Proposal').length > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500">•</span>
                      <span>Follow up on {clients.filter(c => c.status === 'Proposal').length} pending proposals</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="text-gold-500">•</span>
                    <span>AI Prosperity 4.0 launches in {daysUntilLaunch} days - fill 49 more seats</span>
                  </li>
                  {contentPosts.filter(p => p.status === 'Draft').length > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500">•</span>
                      <span>Schedule {contentPosts.filter(p => p.status === 'Draft').slice(0, 3).length} LinkedIn posts</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* KPI Dashboard */}
          {activeNav === 'kpis' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">🎯 Daily KPI Tracker</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gold-400 text-sm">Level</span>
                    <Award className="text-gold-500" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gold-500">{kpiStats.level}</div>
                  <div className="text-xs text-gray-400 mt-1">{kpiStats.totalPoints.toLocaleString()} XP</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-orange-400 text-sm">Current Streak</span>
                    <span className="text-2xl">🔥</span>
                  </div>
                  <div className="text-3xl font-bold text-orange-500">{kpiStats.currentStreak}</div>
                  <div className="text-xs text-gray-400 mt-1">days</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-400 text-sm">Best Streak</span>
                    <TrendingUp className="text-blue-500" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-blue-500">{kpiStats.longestStreak}</div>
                  <div className="text-xs text-gray-400 mt-1">days</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-400 text-sm">Achievements</span>
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-500">
                    {kpiStats.achievements.filter(a => a.unlocked).length}/{kpiStats.achievements.length}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">unlocked</div>
                </div>
              </div>

              {/* Date Selector */}
              <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm text-gray-400">Select Date:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-[#0f1419] border border-[#2f3336] rounded px-3 py-2 text-sm"
                  />
                  <button
                    onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                    className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded text-sm"
                  >
                    Today
                  </button>
                  <div className="ml-auto text-sm">
                    Daily Score: <span className="text-gold-500 font-bold text-xl ml-2">
                      {calculateDailyScore(getKPIForDate(selectedDate))}
                    </span>
                  </div>
                </div>

                {/* KPI Input Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries({
                    books: { label: 'Books Published', icon: '📚', target: 3 },
                    songs: { label: 'Songs Created', icon: '🎵', target: 5 },
                    extensions: { label: 'Chrome Extensions', icon: '🧩', target: 1 },
                    registrations: { label: 'Registrations', icon: '📝', target: 10 },
                    emails: { label: 'Emails Sent', icon: '📧', target: 1000 },
                    whatsapp: { label: 'WhatsApp Messages', icon: '💬', target: 50 },
                    linkedin: { label: 'LinkedIn DMs', icon: '💼', target: 25 },
                    webApps: { label: 'Web Apps Deployed', icon: '🌐', target: 1 },
                    landingPages: { label: 'Landing Pages', icon: '🎯', target: 2 },
                    revenue: { label: 'Revenue (₹)', icon: '💰', target: 33333 }
                  }).map(([key, { label, icon, target }]) => {
                    const kpi = getKPIForDate(selectedDate);
                    const value = kpi[key as keyof DailyKPI];
                    const percentage = (value / target) * 100;
                    const colorClass = getColorForPercentage(percentage);
                    
                    return (
                      <div key={key} className="bg-[#0f1419] border border-[#2f3336] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{icon}</span>
                          <div className="flex-1">
                            <div className="text-sm text-gray-400">{label}</div>
                            <div className="text-xs text-gray-500">Target: {target.toLocaleString()}</div>
                          </div>
                        </div>
                        
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => updateKPI(selectedDate, key as keyof DailyKPI, Number(e.target.value))}
                          className="w-full bg-[#16181c] border border-[#2f3336] rounded px-3 py-2 mb-3 text-lg font-bold"
                          min="0"
                        />
                        
                        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`absolute top-0 left-0 h-full ${colorClass} transition-all duration-300`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-400 mt-1 text-right">
                          {percentage.toFixed(0)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Visualizations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">📊 Today's Progress</h3>
                  <canvas id="dailyChart" height="300"></canvas>
                </div>
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">📈 7-Day Trend</h3>
                  <canvas id="weeklyChart" height="300"></canvas>
                </div>
              </div>

              <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">🗓️ Activity Heatmap (Last 30 Days)</h3>
                <div id="heatmap" className="grid grid-cols-7 gap-2">
                  {(() => {
                    const days = [];
                    const today = new Date();
                    for (let i = 29; i >= 0; i--) {
                      const date = new Date(today);
                      date.setDate(date.getDate() - i);
                      const dateStr = date.toISOString().split('T')[0];
                      const kpi = getKPIForDate(dateStr);
                      const score = calculateDailyScore(kpi);
                      const percentage = (score / 1000) * 100;
                      
                      let bgColor = 'bg-gray-800';
                      if (percentage >= 80) bgColor = 'bg-green-500';
                      else if (percentage >= 50) bgColor = 'bg-yellow-500';
                      else if (percentage > 0) bgColor = 'bg-red-500';
                      
                      days.push(
                        <div
                          key={dateStr}
                          className={`aspect-square rounded ${bgColor} cursor-pointer hover:opacity-75 transition-opacity`}
                          title={`${dateStr}: ${score} points (${percentage.toFixed(0)}%)`}
                          onClick={() => setSelectedDate(dateStr)}
                        />
                      );
                    }
                    return days;
                  })()}
                </div>
                <div className="flex items-center justify-end gap-4 mt-4 text-xs text-gray-400">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-gray-800 rounded"></div>
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-gold-500">🏆 Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {kpiStats.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`border rounded-lg p-4 ${
                        achievement.unlocked
                          ? 'bg-gold-500/10 border-gold-500/30'
                          : 'bg-gray-800/20 border-gray-700 opacity-50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <div className="font-bold mb-1">{achievement.title}</div>
                      <div className="text-xs text-gray-400">{achievement.description}</div>
                      {achievement.unlocked && achievement.unlockedDate && (
                        <div className="text-xs text-gold-500 mt-2">
                          Unlocked: {achievement.unlockedDate}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Export/Import */}
              <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">📥 Data Management</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const dataStr = JSON.stringify({ kpiData, kpiStats }, null, 2);
                      const dataBlob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(dataBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `kpi-data-${new Date().toISOString().split('T')[0]}.json`;
                      link.click();
                      showToast('KPI data exported!');
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Export JSON
                  </button>
                  <label className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
                    Import JSON
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            try {
                              const data = JSON.parse(event.target?.result as string);
                              if (data.kpiData) setKpiData(data.kpiData);
                              if (data.kpiStats) setKpiStats(data.kpiStats);
                              showToast('KPI data imported!');
                            } catch (err) {
                              showToast('Error importing data!');
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* XP Animation */}
              {showAnimation && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="text-6xl font-bold text-gold-500 animate-bounce">
                    +XP 🎉
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Songs Section */}
          {activeNav === 'songs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">🎵 Songs ({songs.length}/50)</h2>
                <button className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={20} />
                  Add Song
                </button>
              </div>

              <div className="grid gap-4">
                {songs.map((song) => (
                  <div key={song.id} className="bg-[#16181c] border border-[#2f3336] rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-gold-500 font-bold">#{song.number}</span>
                          <h3 className="text-lg font-semibold">{song.title}</h3>
                          {song.raga && (
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                              {song.raga}
                            </span>
                          )}
                          {song.emotion && (
                            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                              {song.emotion}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            song.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                            song.status === 'Suno Ready' ? 'bg-gold-500/20 text-gold-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {song.status}
                          </span>
                        </div>
                        
                        {song.lyrics && (
                          <div className="mb-3">
                            <button
                              onClick={() => toggleExpand(`lyrics-${song.id}`)}
                              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                              {expandedItems.has(`lyrics-${song.id}`) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              Lyrics
                            </button>
                            {expandedItems.has(`lyrics-${song.id}`) && (
                              <div className="mt-2 p-3 bg-[#0f1419] rounded border border-[#2f3336] whitespace-pre-wrap text-sm text-gray-300">
                                {song.lyrics}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {song.lyrics && (
                          <button
                            onClick={() => copyToClipboard(song.lyrics!, 'Lyrics')}
                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded"
                            title="Copy Lyrics"
                          >
                            <Copy size={16} />
                          </button>
                        )}
                        {song.sunoPrompt && (
                          <button
                            onClick={() => copyToClipboard(song.sunoPrompt!, 'Suno prompt')}
                            className="p-2 bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 rounded"
                            title="Copy Suno Prompt"
                          >
                            <Music size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {song.sunoPrompt && expandedItems.has(`suno-${song.id}`) && (
                      <div className="mt-3 p-3 bg-[#0f1419] rounded border border-[#2f3336] text-sm text-gray-300">
                        <div className="font-semibold mb-1 text-gold-400">Suno Prompt:</div>
                        {song.sunoPrompt}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Books Section */}
          {activeNav === 'books' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">📚 Books ({books.length}/500)</h2>
                <button className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={20} />
                  Add Book
                </button>
              </div>

              <div className="grid gap-4">
                {books.map((book) => (
                  <div key={book.id} className="bg-[#16181c] border border-[#2f3336] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>{book.wordCount.toLocaleString()} words</span>
                          <span>•</span>
                          <span>{book.languages.length} language{book.languages.length > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        book.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                        book.status === 'KDP Upload' ? 'bg-gold-500/20 text-gold-400' :
                        book.status === 'Idea' ? 'bg-gray-500/20 text-gray-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {book.status}
                      </span>
                    </div>

                    {book.languages.length > 1 && (
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-1">Languages:</div>
                        <div className="flex flex-wrap gap-1">
                          {book.languages.map(lang => (
                            <span key={lang} className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {book.imagePrompt && (
                      <div className="mb-3">
                        <button
                          onClick={() => toggleExpand(`prompt-${book.id}`)}
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          {expandedItems.has(`prompt-${book.id}`) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          Image Prompt
                        </button>
                        {expandedItems.has(`prompt-${book.id}`) && (
                          <div className="mt-2 p-3 bg-[#0f1419] rounded border border-[#2f3336] text-sm text-gray-300 flex justify-between items-start">
                            <span>{book.imagePrompt}</span>
                            <button
                              onClick={() => copyToClipboard(book.imagePrompt!, 'Image prompt')}
                              className="ml-2 p-1 hover:bg-[#2f3336] rounded"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {book.kdpChecklist && (
                      <div>
                        <button
                          onClick={() => toggleExpand(`kdp-${book.id}`)}
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          {expandedItems.has(`kdp-${book.id}`) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          KDP Checklist
                        </button>
                        {expandedItems.has(`kdp-${book.id}`) && (
                          <div className="mt-2 p-3 bg-[#0f1419] rounded border border-[#2f3336] text-sm">
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(book.kdpChecklist).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2">
                                  {value ? (
                                    <Check size={16} className="text-green-500" />
                                  ) : (
                                    <X size={16} className="text-gray-500" />
                                  )}
                                  <span className="capitalize">{key}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {book.amazonLinks && (
                      <div className="mt-3 p-3 bg-[#0f1419] rounded border border-[#2f3336]">
                        <div className="text-sm font-semibold text-yellow-500 mb-2">📦 Amazon Status</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <div className="text-gray-500 text-xs">Kindle eBook</div>
                            <div className={`font-medium ${book.amazonLinks.ebookStatus === 'Live' ? 'text-green-400' : book.amazonLinks.ebookStatus === 'In Review' ? 'text-yellow-400' : 'text-gray-500'}`}>
                              {book.amazonLinks.ebookStatus} {book.amazonLinks.ebookPrice && `• ${book.amazonLinks.ebookPrice}`}
                            </div>
                            {book.amazonLinks.ebookASIN && (
                              <a href={`https://www.amazon.com/dp/${book.amazonLinks.ebookASIN}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs">
                                ASIN: {book.amazonLinks.ebookASIN} ↗
                              </a>
                            )}
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs">Paperback</div>
                            <div className={`font-medium ${book.amazonLinks.paperbackStatus === 'Live' ? 'text-green-400' : book.amazonLinks.paperbackStatus === 'In Review' ? 'text-yellow-400' : 'text-gray-500'}`}>
                              {book.amazonLinks.paperbackStatus} {book.amazonLinks.paperbackPrice && `• ${book.amazonLinks.paperbackPrice}`}
                            </div>
                            {book.amazonLinks.paperbackASIN && (
                              <a href={`https://www.amazon.com/dp/${book.amazonLinks.paperbackASIN}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs">
                                ASIN: {book.amazonLinks.paperbackASIN} ↗
                              </a>
                            )}
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs">Hardcover</div>
                            <div className={`font-medium ${book.amazonLinks.hardcoverStatus === 'Live' ? 'text-green-400' : 'text-gray-500'}`}>
                              {book.amazonLinks.hardcoverStatus || 'Not Started'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clients Section */}
          {activeNav === 'clients' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">👥 Active Clients ({clients.length})</h2>
                <button className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={20} />
                  Add Client
                </button>
              </div>

              <div className="grid gap-4">
                {clients.map((client) => (
                  <div key={client.id} className="bg-[#16181c] border border-[#2f3336] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{client.name}</h3>
                        {client.revenue !== undefined && (
                          <div className="text-sm text-gray-400">Revenue: €{client.revenue}</div>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        client.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        client.status === 'Proposal' ? 'bg-gold-500/20 text-gold-400' :
                        client.status === 'Prospect' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {client.status}
                      </span>
                    </div>

                    {client.tasks.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-2">Tasks:</div>
                        <ul className="space-y-1">
                          {client.tasks.map((task, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <span className="text-gold-500 mt-1">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {client.notes && (
                      <div className="text-sm text-gray-400 italic">
                        {client.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Partnerships Section */}
          {activeNav === 'partnerships' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">🤝 Partnerships ({partnerships.length})</h2>
                <button className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={20} />
                  Add Partnership
                </button>
              </div>

              <div className="grid gap-4">
                {partnerships.map((partner) => (
                  <div key={partner.id} className="bg-[#16181c] border border-[#2f3336] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{partner.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                            {partner.type}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            partner.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {partner.status}
                          </span>
                        </div>
                      </div>
                      {partner.revenueShared !== undefined && (
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Revenue Shared</div>
                          <div className="text-lg font-bold text-gold-500">
                            €{partner.revenueShared.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                    {partner.notes && (
                      <div className="text-sm text-gray-400">
                        {partner.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Prosperity 3.0 */}
          {activeNav === 'ap3' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">🎓 AI Prosperity 3.0</h2>
              
              <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Session Progress</h3>
                <div className="grid grid-cols-5 gap-3">
                  {sessions.map((session) => (
                    <div
                      key={session.number}
                      className={`p-4 rounded-lg text-center ${
                        session.status === 'Completed' ? 'bg-green-500/20 border border-green-500/50' :
                        session.status === 'Next' ? 'bg-gold-500/20 border border-gold-500/50' :
                        'bg-gray-500/10 border border-gray-500/30'
                      }`}
                    >
                      <div className="text-lg font-bold">Session {session.number}</div>
                      <div className="text-xs mt-1">{session.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">📝 What to Pitch for Session 8</h3>
                <textarea
                  className="w-full bg-[#0f1419] border border-[#2f3336] rounded p-3 text-sm min-h-32"
                  placeholder="Add notes for Session 8 pitch..."
                  defaultValue="- Review AI coding agents capabilities
- Demonstrate live coding assistant
- Q&A on practical implementation"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-2xl font-bold mb-1">15</div>
                  <div className="text-sm text-gray-400">Participants</div>
                </div>
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-2xl font-bold mb-1">70%</div>
                  <div className="text-sm text-gray-400">Completion Rate</div>
                </div>
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-2xl font-bold mb-1 text-gold-500">₹2.1L</div>
                  <div className="text-sm text-gray-400">Revenue Generated</div>
                </div>
              </div>
            </div>
          )}

          {/* AI Prosperity 4.0 */}
          {activeNav === 'ap4' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">🚀 AI Prosperity 4.0</h2>
              
              <div className="bg-gradient-to-r from-gold-500/20 to-blue-500/20 border border-gold-500/50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Launch Date</div>
                  <div className="text-3xl font-bold mb-2">March 11, 2026</div>
                  <div className="text-5xl font-bold text-gold-500 mb-2">{daysUntilLaunch}</div>
                  <div className="text-sm text-gray-400">Days Remaining</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-sm text-gray-400 mb-2">Early Bird</div>
                  <div className="text-2xl font-bold text-green-500">₹9,999</div>
                </div>
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-sm text-gray-400 mb-2">Standard</div>
                  <div className="text-2xl font-bold text-blue-500">₹14,999</div>
                </div>
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-sm text-gray-400 mb-2">Premium</div>
                  <div className="text-2xl font-bold text-gold-500">₹29,999</div>
                </div>
              </div>

              <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold">Fill-Up Progress</h3>
                  <span className="text-gold-500 font-bold">1/50 Seats</span>
                </div>
                <div className="w-full bg-[#0f1419] rounded-full h-4">
                  <div className="bg-gold-500 h-4 rounded-full" style={{ width: '2%' }}></div>
                </div>
              </div>

              <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">10-Week Curriculum</h3>
                <div className="space-y-3">
                  {[
                    'Week 1: AI Prosperity Mindset + $5K Blueprint',
                    'Week 2: AI Coding Agents Mastery',
                    'Week 3: Your First Digital Product',
                    'Week 4: Chrome Extension Empire',
                    'Week 5: Full-Stack SaaS',
                    'Week 6: AI Consulting Practice',
                    'Week 7: Marketing & Sales Automation',
                    'Week 8: Scale & Systematize',
                    'Week 9: Multiple Revenue Streams',
                    'Week 10: Launch Week + Demo Day',
                  ].map((week, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-[#0f1419] rounded border border-[#2f3336]">
                      <span className="text-gold-500 font-bold">{idx + 1}</span>
                      <span>{week}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Plan */}
          {activeNav === 'content' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">📝 Content Plan</h2>
              
              <div className="mb-6">
                <div className="flex gap-2 mb-4">
                  {['LinkedIn', 'Twitter/X', 'Instagram', 'YouTube', 'Email'].map(platform => (
                    <button
                      key={platform}
                      className="px-4 py-2 bg-[#16181c] border border-[#2f3336] rounded-lg hover:bg-[#253340]"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {contentPosts.map((post) => (
                  <div key={post.id} className="bg-[#16181c] border border-[#2f3336] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{post.topic}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                            {post.platform}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            post.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                            post.status === 'Scheduled' ? 'bg-gold-500/20 text-gold-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {post.status}
                          </span>
                        </div>
                      </div>
                      {post.draftText && (
                        <button
                          onClick={() => copyToClipboard(post.draftText, 'Post text')}
                          className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded"
                        >
                          <Copy size={16} />
                        </button>
                      )}
                    </div>

                    {post.draftText && (
                      <div className="mb-3 p-3 bg-[#0f1419] rounded border border-[#2f3336] text-sm whitespace-pre-wrap">
                        {post.draftText}
                      </div>
                    )}

                    {post.imagePrompt && (
                      <div>
                        <button
                          onClick={() => toggleExpand(`img-${post.id}`)}
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          {expandedItems.has(`img-${post.id}`) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          Image Prompt
                        </button>
                        {expandedItems.has(`img-${post.id}`) && (
                          <div className="mt-2 p-3 bg-[#0f1419] rounded border border-[#2f3336] text-sm flex justify-between items-start">
                            <span>{post.imagePrompt}</span>
                            <button
                              onClick={() => copyToClipboard(post.imagePrompt!, 'Image prompt')}
                              className="ml-2 p-1 hover:bg-[#2f3336] rounded"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Landing Pages */}
          {activeNav === 'landing' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">🌐 Landing Pages ({landingPages.length})</h2>
              
              <div className="grid gap-4">
                {landingPages.map((page) => (
                  <div key={page.id} className="bg-[#16181c] border border-[#2f3336] rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{page.name}</h3>
                        <a
                          href={page.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mb-2"
                        >
                          {page.url}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            page.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                            page.status.includes('Fix') ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {page.status}
                          </span>
                        </div>
                        {page.notes && (
                          <div className="text-sm text-gray-400 mt-2">{page.notes}</div>
                        )}
                      </div>
                      <button
                        onClick={() => copyToClipboard(page.url, 'URL')}
                        className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gumroad/Digital Products */}
          {activeNav === 'gumroad' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">🛒 Digital Products ({digitalProducts.length})</h2>
                <button className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={20} />
                  Add Product
                </button>
              </div>

              <div className="grid gap-4">
                {digitalProducts.map((product) => (
                  <div key={product.id} className="bg-[#16181c] border border-[#2f3336] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                        <div className="text-gold-500 font-bold">{product.price}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        product.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                        product.status === 'Ready to Upload' ? 'bg-gold-500/20 text-gold-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {product.status}
                      </span>
                    </div>

                    {product.gumroadLink && (
                      <a
                        href={product.gumroadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mb-3"
                      >
                        View on Gumroad
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}

                    {product.uploadChecklist && (
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Upload Checklist:</div>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(product.uploadChecklist).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2 text-sm">
                              {value ? (
                                <Check size={16} className="text-green-500" />
                              ) : (
                                <X size={16} className="text-gray-500" />
                              )}
                              <span className="capitalize">{key}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Hub */}
          {activeNav === 'projects' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">🏭 Projects Hub ({projects.length})</h2>
              
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-[#16181c] border border-[#2f3336] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                        <p className="text-sm text-gray-400">{project.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        project.status === 'Development' ? 'bg-blue-500/20 text-blue-400' :
                        project.status === 'On Hold' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    {project.progress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gold-500 font-semibold">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-[#0f1419] rounded-full h-2">
                          <div
                            className="bg-gold-500 h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Revenue & Ads */}
          {activeNav === 'revenue' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">💰 Revenue & Ads</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-sm text-gray-400 mb-2">Total Revenue (Feb)</div>
                  <div className="text-3xl font-bold text-gold-500">₹2,45,000</div>
                </div>
                <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                  <div className="text-sm text-gray-400 mb-2">Ad Spend (Feb)</div>
                  <div className="text-3xl font-bold text-blue-500">₹45,000</div>
                </div>
              </div>

              <div className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Revenue Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-[#0f1419] rounded">
                    <span>AI Prosperity 3.0</span>
                    <span className="text-gold-500 font-bold">₹2,10,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#0f1419] rounded">
                    <span>Consulting (Rosa, Daniel)</span>
                    <span className="text-gold-500 font-bold">₹25,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#0f1419] rounded">
                    <span>Partnership (Jolly Shah)</span>
                    <span className="text-gold-500 font-bold">₹10,000</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pre-Flight Check */}
          {activeNav === 'preflight' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">✅ Pre-Flight Check</h2>
              
              <div className="space-y-4">
                {[
                  { item: 'AI Prosperity 3.0 - Session 8 prep', done: false },
                  { item: 'Upload "Is Modi God Sent?" to KDP', done: false },
                  { item: 'Generate 3 Suno-ready songs', done: false },
                  { item: 'Follow up Rosa proposal', done: false },
                  { item: 'Schedule 5 LinkedIn posts', done: false },
                  { item: 'Fix Iceberg assessment tool', done: false },
                  { item: 'AI Prosperity 4.0 marketing plan', done: false },
                ].map((check, idx) => (
                  <div key={idx} className="bg-[#16181c] border border-[#2f3336] rounded-lg p-4 flex items-center gap-3">
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      check.done ? 'bg-green-500 border-green-500' : 'border-gray-500'
                    }`}>
                      {check.done && <Check size={16} className="text-white" />}
                    </div>
                    <span className={check.done ? 'line-through text-gray-500' : ''}>{check.item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Knowledge Docs */}
          {activeNav === 'knowledge' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">📖 Knowledge Docs</h2>
              
              <div className="grid gap-4">
                {[
                  { name: 'AI Prosperity Curriculum', path: '/clawd/Knowledge_Base/AI_Prosperity/' },
                  { name: 'Divine Teams Index', path: '/clawd/Divine_Teams/' },
                  { name: 'Client Files', path: '/clawd/Clients/' },
                  { name: 'Project Documentation', path: '/clawd/Projects/' },
                  { name: 'Scripts & Automation', path: '/clawd/scripts/' },
                ].map((doc, idx) => (
                  <div key={idx} className="bg-[#16181c] border border-[#2f3336] rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{doc.name}</h3>
                    <div className="text-sm text-gray-400 font-mono">{doc.path}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 toast-enter">
          <Check size={20} />
          {toast.message}
        </div>
      )}
    </div>
  );
}
