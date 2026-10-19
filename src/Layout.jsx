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
  ChevronLeft,
  Sparkles,
  Calculator,
  TrendingUp,
  Users,
  BarChart3,
  FolderOpen,
  Layers,
  FileQuestion,
  CalendarDays
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FloatingTimer from '@/components/shared/FloatingTimer';
import NotificationManager from '@/components/shared/NotificationManager';
import UpcomingAlertsPanel from '@/components/shared/UpcomingAlertsPanel';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
  { name: 'My Day', icon: Sun, page: 'MyDay' },
  { name: 'Tasks', icon: CheckSquare, page: 'Tasks' },
  { name: 'Calendar', icon: Calendar, page: 'Calendar' },
  { name: 'Events', icon: CalendarDays, page: 'Events' },
  { name: 'Timetable', icon: Calendar, page: 'Timetable' },
  { name: 'Assignments', icon: BookOpen, page: 'Assignments' },
  { name: 'Exams', icon: GraduationCap, page: 'Exams' },
  { name: 'Notes', icon: BookOpen, page: 'Notes' },
  { name: 'Flashcards', icon: Layers, page: 'Flashcards' },
  { name: 'Practice Tests', icon: FileQuestion, page: 'PracticeTests' },
  { name: 'Study Groups', icon: Users, page: 'StudyGroups' },
  { name: 'Grade Tracker', icon: TrendingUp, page: 'GradeTracker' },
  { name: 'Analytics', icon: BarChart3, page: 'Analytics' },
  { name: 'Files', icon: FolderOpen, page: 'Files' },
  { name: 'Calculator', icon: Calculator, page: 'Calculator' },
  { name: 'Math Solver', icon: Calculator, page: 'MathSolver' },
  { name: 'AI Assistant', icon: Sparkles, page: 'AIAssistant' },
  { name: 'Focus Timer', icon: Timer, page: 'FocusTimer' },
  { name: 'Settings', icon: Settings, page: 'Settings' },
];

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    base44.auth.me().then((u) => {
      if (mounted) {
        setUser(u);
        if (u?.theme) setTheme(u.theme);
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', String(sidebarOpen));
  }, [sidebarOpen]);

  const NavLink = ({ item }) => {
    const isActive = currentPageName === item.page;
    return (
      <Link to={createPageUrl(item.page)}>
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer",
            isActive 
              ? "bg-gradient-to-r from-violet-500/10 to-indigo-500/10 text-violet-600 font-medium" 
              : "text-slate-600 hover:bg-slate-50"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5 transition-colors flex-shrink-0",
            isActive ? "text-violet-500" : "text-slate-400 group-hover:text-slate-600"
          )} />
          {sidebarOpen && (
            <span className="whitespace-nowrap overflow-hidden">
              {item.name}
            </span>
          )}
          {isActive && sidebarOpen && (
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <style>{`
        :root {
          --primary: 139 92 246;
          --primary-foreground: 255 255 255;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .glass {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex fixed left-0 top-0 h-screen flex-col glass z-40 shadow-xl shadow-slate-200/50 transition-all duration-300",
          sidebarOpen ? "w-[260px]" : "w-20"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-800 text-lg">StudyFlow</h1>
                <p className="text-xs text-slate-400">Your study companion</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <ChevronLeft className={cn("w-5 h-5 transition-transform", !sidebarOpen && "rotate-180")} />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink key={item.page} item={item} />
          ))}
        </nav>

        <div className="mt-auto">
          {sidebarOpen && (
            <div className="p-4 border-t border-slate-100">
              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-3 mb-3">
                <p className="text-2xl font-bold text-violet-700">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-xs text-violet-600">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          )}
          {user && sidebarOpen && (
            <div className="px-4 pb-4">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white font-medium text-sm">
                  {user.full_name?.[0] || user.email?.[0] || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{user.full_name || 'User'}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 glass z-40 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="text-slate-600"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-800">StudyFlow</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UpcomingAlertsPanel />
          <span className="text-sm font-medium text-slate-600">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          <div className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-white z-50 shadow-2xl">
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-slate-800">StudyFlow</h1>
                  <p className="text-xs text-slate-400">Your study companion</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-100px)]">
              {navItems.map((item) => (
                <NavLink key={item.page} item={item} />
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 min-h-screen",
        sidebarOpen ? "lg:ml-[260px]" : "lg:ml-20",
        "pt-16 lg:pt-0"
      )}>
        <div className="p-4 lg:p-8">
          {children}
          </div>
          </main>

          {/* Desktop top-right bell */}
      <div className="hidden lg:block fixed top-4 right-4 z-50">
        <UpcomingAlertsPanel />
      </div>

      {/* Global Components */}
          <FloatingTimer />
          <NotificationManager />
          </div>
          );
          }