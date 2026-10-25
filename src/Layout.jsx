import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  CheckSquare, 
  GraduationCap, 
  Timer, 
  Settings, 
  Menu, 
  X, 
  Sun, 
  Sparkles, 
  Calculator, 
  TrendingUp, 
  Users, 
  BarChart3, 
  FolderOpen, 
  Layers, 
  FileQuestion, 
  CalendarDays,
  Boxes,
  HelpCircle,
  LogOut,
  Search,
  Plus
} from 'lucide-react';
import { cn } from "@/lib/utils";
import FloatingTimer from '@/components/shared/FloatingTimer';
import NotificationManager from '@/components/shared/NotificationManager';
import UpcomingAlertsPanel from '@/components/shared/UpcomingAlertsPanel';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard', category: 'Core' },
  { name: 'My Day', icon: Sun, page: 'MyDay', category: 'Core' },
  { name: 'Tasks', icon: CheckSquare, page: 'Tasks', category: 'Core' },
  { name: 'Calendar', icon: Calendar, page: 'Calendar', category: 'Core' },
  { name: 'Timetable', icon: CalendarDays, page: 'Timetable', category: 'Core' },
  { name: 'Assignments', icon: BookOpen, page: 'Assignments', category: 'Study' },
  { name: 'Exams', icon: GraduationCap, page: 'Exams', category: 'Study' },
  { name: 'Notes', icon: BookOpen, page: 'Notes', category: 'Study' },
  { name: 'Flashcards', icon: Layers, page: 'Flashcards', category: 'Study' },
  { name: 'Practice Tests', icon: FileQuestion, page: 'PracticeTests', category: 'Study' },
  { name: 'Study Groups', icon: Users, page: 'StudyGroups', category: 'Social' },
  { name: 'Events', icon: CalendarDays, page: 'Events', category: 'Social' },
  { name: 'Grade Tracker', icon: TrendingUp, page: 'GradeTracker', category: 'Performance' },
  { name: 'Analytics', icon: BarChart3, page: 'Analytics', category: 'Performance' },
  { name: 'Files', icon: FolderOpen, page: 'Files', category: 'Library' },
  { name: 'AI Assistant', icon: Sparkles, page: 'AIAssistant', category: 'Tools' },
  { name: 'Focus Timer', icon: Timer, page: 'FocusTimer', category: 'Tools' },
  { name: 'Calculator', icon: Calculator, page: 'Calculator', category: 'Tools' },
  { name: 'Math Solver', icon: Calculator, page: 'MathSolver', category: 'Tools' },
  { name: 'Whiteboard', icon: Boxes, page: 'Whiteboard', category: 'Tools' },
  { name: 'Settings', icon: Settings, page: 'Settings', category: 'Settings' },
];

export default function Layout({ children, currentPageName }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDrawerOpen, setToolsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState({
    name: 'Anastasiia H.',
    course: 'AI Course',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  });
  const location = useLocation();

  useEffect(() => {
    // Ensure dark mode is active by default
    document.documentElement.classList.add('dark');

    let mounted = true;
    base44.auth.me().then((u) => {
      if (mounted && u) {
        setUser((prev) => ({
          ...prev,
          name: u.full_name || prev.name,
          email: u.email,
        }));
      }
    }).catch(() => {
      // Continue with prototype guest profile
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDrawerOpen(false);
  }, [location.pathname]);

  const activePage = currentPageName || 'Dashboard';
  const pageTitle = activePage === 'Dashboard' 
    ? 'Overview' 
    : navItems.find((n) => n.page === activePage)?.name || activePage;

  return (
    <div className="min-h-screen bg-canvas text-slate-100 antialiased selection:bg-violet-600/30 selection:text-white flex flex-col lg:flex-row">
      
      {/* ─── DESKTOP SLIM ICON RAIL / DOCK ─── */}
      <aside
        className={cn(
          "hidden lg:flex fixed left-3 top-3 bottom-3 z-40 flex-col items-center justify-between rounded-3xl bg-[#141122]/90 border border-violet-500/15 p-3 shadow-2xl backdrop-blur-xl transition-all duration-300",
          sidebarExpanded ? "w-64 items-stretch px-4" : "w-[72px]"
        )}
      >
        {/* Top: Logo & Soundwave */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <Link to="/" className="flex items-center gap-3 group focus:outline-none" aria-label="StudyFlow Home">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/30 to-purple-800/30 border border-violet-500/30 text-violet-400 shadow-glow-sm transition-transform group-hover:scale-105">
              <div className="flex items-center gap-0.5">
                <span className="w-1 h-3.5 bg-violet-400 rounded-full animate-pulse" />
                <span className="w-1 h-5.5 bg-violet-300 rounded-full animate-pulse delay-75" />
                <span className="w-1 h-4 bg-violet-400 rounded-full animate-pulse delay-150" />
                <span className="w-1 h-2.5 bg-violet-500 rounded-full" />
              </div>
            </div>
            {sidebarExpanded && (
              <div className="overflow-hidden">
                <span className="font-bold text-lg tracking-tight text-white">StudyFlow</span>
                <span className="block text-[10px] text-violet-400 tracking-wider uppercase font-semibold">AI Learning</span>
              </div>
            )}
          </Link>
        </div>

        {/* Center: Main Quick Dock Items */}
        <nav className="flex flex-col items-center gap-3 my-auto w-full">
          {/* Dashboard / Home */}
          <Link
            to="/Dashboard"
            className={cn(
              "relative flex items-center justify-center rounded-2xl transition-all duration-200 group focus:outline-none",
              sidebarExpanded ? "w-full px-3 py-2.5 justify-start gap-3" : "h-11 w-11",
              activePage === 'Dashboard'
                ? "bg-violet-600/25 border border-violet-500/40 text-violet-300 shadow-glow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-[#1f1b36]"
            )}
            title="Dashboard"
          >
            <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
            {sidebarExpanded && <span className="text-sm font-medium">Overview</span>}
            {activePage === 'Dashboard' && !sidebarExpanded && (
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-violet-400 shadow-glow-sm" />
            )}
          </Link>

          {/* All Tools / Modules Switcher Button */}
          <button
            onClick={() => setToolsDrawerOpen(true)}
            className={cn(
              "relative flex items-center justify-center rounded-2xl transition-all duration-200 group focus:outline-none",
              sidebarExpanded ? "w-full px-3 py-2.5 justify-start gap-3" : "h-11 w-11",
              toolsDrawerOpen || (activePage !== 'Dashboard' && activePage !== 'Settings')
                ? "bg-violet-600/20 border border-violet-500/30 text-violet-300"
                : "text-slate-400 hover:text-slate-200 hover:bg-[#1f1b36]"
            )}
            title="All Tools & Modules"
            aria-label="Open all modules menu"
          >
            <Boxes className="h-5 w-5 flex-shrink-0" />
            {sidebarExpanded && <span className="text-sm font-medium">All Modules</span>}
          </button>

          {/* AI Assistant Quick Nav */}
          <Link
            to="/AIAssistant"
            className={cn(
              "relative flex items-center justify-center rounded-2xl transition-all duration-200 group focus:outline-none",
              sidebarExpanded ? "w-full px-3 py-2.5 justify-start gap-3" : "h-11 w-11",
              activePage === 'AIAssistant'
                ? "bg-violet-600/25 border border-violet-500/40 text-violet-300 shadow-glow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-[#1f1b36]"
            )}
            title="AI Assistant"
          >
            <Sparkles className="h-5 w-5 flex-shrink-0" />
            {sidebarExpanded && <span className="text-sm font-medium">AI Assistant</span>}
          </Link>

          {/* Settings */}
          <Link
            to="/Settings"
            className={cn(
              "relative flex items-center justify-center rounded-2xl transition-all duration-200 group focus:outline-none",
              sidebarExpanded ? "w-full px-3 py-2.5 justify-start gap-3" : "h-11 w-11",
              activePage === 'Settings'
                ? "bg-violet-600/25 border border-violet-500/40 text-violet-300 shadow-glow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-[#1f1b36]"
            )}
            title="Settings"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {sidebarExpanded && <span className="text-sm font-medium">Settings</span>}
          </Link>
        </nav>

        {/* Bottom Dock Utilities */}
        <div className="flex flex-col items-center gap-2 pb-2 w-full pt-3 border-t border-violet-500/10">
          <button
            onClick={() => setToolsDrawerOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-violet-300 hover:bg-[#1f1b36] transition-colors focus:outline-none"
            title="Help & Info"
            aria-label="Help and Info"
          >
            <HelpCircle className="h-5 w-5" />
          </button>

          <Link
            to="/Settings"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors focus:outline-none"
            title="Account / Logout"
            aria-label="Account Settings"
          >
            <LogOut className="h-5 w-5" />
          </Link>

          {/* Expand/Collapse Rail Toggle */}
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="hidden xl:flex text-[10px] text-slate-500 hover:text-violet-400 transition-colors pt-1"
            title={sidebarExpanded ? "Collapse Rail" : "Expand Rail"}
          >
            {sidebarExpanded ? "◀ Collapse" : "▶"}
          </button>
        </div>
      </aside>

      {/* ─── ALL MODULES FLYOUT / DRAWER ─── */}
      {toolsDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setToolsDrawerOpen(false)}
          />
          <div className="relative ml-0 lg:ml-24 my-auto h-full lg:h-[88vh] w-full max-w-md rounded-none lg:rounded-3xl bg-[#141122] border border-violet-500/20 p-6 shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-left-4 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-violet-500/15">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                  <Boxes className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-base">StudyFlow Modules</h2>
                  <p className="text-xs text-slate-400">All 21 study tools & workspaces</p>
                </div>
              </div>
              <button
                onClick={() => setToolsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick search inside drawer */}
            <div className="my-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-[#1a172e] border border-violet-500/20 pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {/* Modules Grid / Categories */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {['Core', 'Study', 'Tools', 'Performance', 'Social', 'Library', 'Settings'].map((category) => {
                const items = navItems.filter((item) => 
                  item.category === category &&
                  (searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                );
                if (items.length === 0) return null;

                return (
                  <div key={category} className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-400 px-2">{category}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {items.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = activePage === item.page;
                        return (
                          <Link
                            key={item.page}
                            to={createPageUrl(item.page)}
                            onClick={() => setToolsDrawerOpen(false)}
                            className={cn(
                              "flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all",
                              isCurrent 
                                ? "bg-violet-600/30 text-white border border-violet-500/40 font-medium"
                                : "text-slate-300 hover:text-white hover:bg-[#1f1b36] border border-transparent"
                            )}
                          >
                            <Icon className={cn("h-4 w-4", isCurrent ? "text-violet-300" : "text-slate-400")} />
                            <span className="truncate">{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── MOBILE HEADER BAR ─── */}
      <header className="lg:hidden sticky top-0 left-0 right-0 h-16 bg-[#131020]/95 border-b border-violet-500/15 backdrop-blur-xl z-30 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1b172e] border border-violet-500/20 text-slate-300 hover:text-white"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600/30 border border-violet-500/30 text-violet-300">
              <span className="w-1 h-3 bg-violet-400 rounded-full" />
              <span className="w-1 h-4 bg-violet-300 rounded-full mx-0.5" />
              <span className="w-1 h-2 bg-violet-400 rounded-full" />
            </div>
            <span className="font-bold text-white text-base">StudyFlow</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <UpcomingAlertsPanel />
          <div className="h-8 w-8 rounded-full overflow-hidden border border-violet-500/30">
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      {/* ─── MOBILE DRAWER MENU ─── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-[#131020] border-r border-violet-500/20 p-5 flex flex-col z-50">
            <div className="flex items-center justify-between pb-4 border-b border-violet-500/15">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-violet-600/30 flex items-center justify-center text-violet-300 font-bold">SF</div>
                <span className="font-bold text-white text-lg">StudyFlow</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.page;
                return (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                      isActive
                        ? "bg-violet-600/30 text-white font-medium border border-violet-500/40 shadow-glow-sm"
                        : "text-slate-300 hover:bg-[#1a172e] hover:text-white"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isActive ? "text-violet-300" : "text-slate-400")} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-violet-500/15 flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover border border-violet-500/30" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-violet-400 truncate">{user.course}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        sidebarExpanded ? "lg:pl-[280px]" : "lg:pl-[96px]"
      )}>
        {/* Top Header Bar (Desktop & Tablet) */}
        <header className="hidden lg:flex items-center justify-between px-6 pt-6 pb-2">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {pageTitle}
            </h1>
          </div>

          {/* Right Controls: Search, Alerts, Profile Pill */}
          <div className="flex items-center gap-3">
            {/* Search Pill */}
            <div className="relative w-64 xl:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Start searching here..."
                className="w-full rounded-full bg-[#161326] border border-violet-500/20 pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all shadow-inner"
              />
            </div>

            {/* Notification Bell */}
            <UpcomingAlertsPanel />

            {/* User Profile Pill */}
            <div className="flex items-center gap-3 rounded-full bg-[#161326] border border-violet-500/20 pl-2 pr-4 py-1.5 shadow-sm hover:border-violet-500/40 transition-colors">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover border border-violet-400/40"
              />
              <div className="text-left leading-tight hidden xl:block">
                <p className="text-xs font-bold text-white">{user.name}</p>
                <p className="text-[10px] font-medium text-slate-400">{user.course}</p>
              </div>
              <button 
                className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white transition-all ml-1"
                title="Quick action: Add study goal"
                aria-label="Add study goal"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full">
          {children}
        </main>
      </div>

      {/* Global Background Elements */}
      <FloatingTimer />
      <NotificationManager />
    </div>
  );
}
