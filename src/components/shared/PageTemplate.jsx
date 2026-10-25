import React, { useState, useEffect } from 'react';
import {
  ArrowRight, BarChart3, BookOpen, CalendarDays, Check,
  ChevronRight, FileText, FolderOpen, Grid3X3, ListTodo,
  MoreHorizontal, Play, Pause, RotateCcw, Plus, Search, Sparkles, Target,
  Timer, TrendingUp, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function normalizePageName(page) {
  const map = {
    MyDay: 'My Day',
    StudyGroups: 'Study Groups',
    GradeTracker: 'Grade Tracker',
    MathSolver: 'Math Solver',
    AIAssistant: 'AI Assistant',
    FocusTimer: 'Focus Timer',
    PracticeTests: 'Practice Tests',
  };
  return map[page] || page;
}

const content = {
  Dashboard: ['Saturday, October 10, 2026', 'Good morning, Anastasiia', 'A calm plan for a focused day.', 'violet'],
  'My Day': ['Today', 'Make today count', 'Your day, shaped around your highest priority lectures and review sessions.', 'amber'],
  Tasks: ['Workspace', 'Tasks & priorities', 'Capture assignments, prioritize reviews, and track progress.', 'blue'],
  Calendar: ['October 2026', 'Your calendar', 'Coordinate lectures, study blocks, and exam dates.', 'indigo'],
  Events: ['Campus life', 'Workshops & Events', 'Discover study groups, AI seminars, and hackathons.', 'pink'],
  Timetable: ['Weekly rhythm', 'Your timetable', 'A repeatable schedule that keeps your coursework on track.', 'teal'],
  Assignments: ['Coursework', 'Assignments', 'Turn briefs into milestones with deadline countdowns.', 'orange'],
  Exams: ['Preparation', 'Exam season roadmap', 'Track review intervals and build confidence one session at a time.', 'red'],
  Notes: ['Knowledge base', 'Course Notes & Transcripts', 'Upload, review, and search your lecture materials.', 'yellow'],
  Flashcards: ['Active recall', 'Spaced Repetition Decks', 'Short reviews powered by the SM-2 learning algorithm.', 'purple'],
  'Practice Tests': ['Test yourself', 'Practice with purpose', 'Identify knowledge gaps before midterms and finals.', 'cyan'],
  'Study Groups': ['Learn together', 'Collaborative Study', 'Share flashcards, compare notes, and stay accountable.', 'green'],
  'Grade Tracker': ['Performance', 'Grade Tracker', 'Understand weighted grading criteria and track your GPA trajectory.', 'emerald'],
  Analytics: ['Your patterns', 'Learning Analytics', 'Insights on deep work hours, recall retention, and weekly goals.', 'sky'],
  Files: ['Library', 'Course Materials Library', 'Store syllabi, PDFs, problem sets, and lecture slides.', 'slate'],
  Calculator: ['Quick tool', 'Scientific Calculator', 'Fast calculations without context switching.', 'blue'],
  'Math Solver': ['Step by step', 'Math Solver', 'Step-by-step mathematical reasoning and equation breakdowns.', 'indigo'],
  'AI Assistant': ['StudyFlow intelligence', 'Grounded AI Study Partner', 'Ask questions grounded directly in your uploaded course materials.', 'violet'],
  'Focus Timer': ['Deep work', 'Pomodoro Focus Timer', '25-minute deep focus intervals with automated break tracking.', 'rose'],
  Settings: ['Preferences', 'Account & Platform Settings', 'Customize your profile, dark theme accents, and notifications.', 'slate'],
  Whiteboard: ['Visual thinking', 'Interactive Whiteboard', 'Brainstorm architectures, draw mind maps, and connect ideas.', 'fuchsia'],
};

const gradients = {
  violet: 'from-violet-700/60 to-purple-900/60',
  amber: 'from-amber-600/40 to-orange-900/40',
  blue: 'from-blue-700/40 to-indigo-900/40',
  indigo: 'from-indigo-700/40 to-violet-900/40',
  pink: 'from-pink-700/40 to-rose-900/40',
  teal: 'from-teal-700/40 to-emerald-900/40',
  orange: 'from-orange-700/40 to-amber-900/40',
  red: 'from-rose-700/40 to-red-900/40',
  yellow: 'from-amber-600/40 to-yellow-900/40',
  purple: 'from-purple-700/40 to-violet-900/40',
  cyan: 'from-cyan-700/40 to-blue-900/40',
  green: 'from-emerald-700/40 to-teal-900/40',
  emerald: 'from-emerald-700/40 to-green-900/40',
  sky: 'from-sky-700/40 to-blue-900/40',
  slate: 'from-slate-700/40 to-slate-900/40',
  rose: 'from-rose-700/40 to-pink-900/40',
  fuchsia: 'from-fuchsia-700/40 to-purple-900/40',
};

function Shell({ page, children, action, icon: Icon = Sparkles }) {
  const norm = normalizePageName(page);
  const [eyebrow, title, description, accent] = content[norm] || content.Dashboard;
  return (
    <div className="mx-auto max-w-[1440px] space-y-6 pb-12">
      {/* Prototype Indicator Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-[#141024]/80 border border-violet-500/20 text-xs text-slate-300 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-violet-400 shadow-glow-sm" />
          <span className="font-semibold text-white">Preview Module ({norm}):</span>
          <span className="text-slate-400">Client-side mock interface. Connects to Supabase backend in Phase 3.</span>
        </div>
        <span className="text-[10px] text-violet-300 font-mono bg-violet-600/20 px-2 py-0.5 rounded-full border border-violet-500/30">
          Route: /{page}
        </span>
      </div>

      <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[accent] || gradients.violet} p-7 text-white shadow-card-dark lg:p-9 border border-violet-500/20 backdrop-blur-xl`}>
        <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[28px] border-violet-500/10 pointer-events-none" />
        <div className="relative max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">{eyebrow}</p>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">{title}</h1>
          <p className="mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-200">{description}</p>
          {action && (
            <Button className="mt-5 rounded-full bg-white font-bold text-slate-900 shadow-md hover:bg-slate-200 text-xs px-4 py-2">
              <Plus className="h-3.5 w-3.5 mr-1" />
              {action}
            </Button>
          )}
        </div>
        <Icon className="absolute bottom-7 right-8 hidden h-14 w-14 text-white/10 lg:block pointer-events-none" />
      </section>
      
      {children}
    </div>
  );
}

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-3xl border border-violet-500/15 bg-[#13111C]/90 p-5 shadow-card-dark backdrop-blur-xl text-slate-100 lg:p-6 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ title, detail = '', action = null }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-base font-bold text-white tracking-tight">{title}</h2>
        {detail && <p className="mt-0.5 text-xs text-slate-400">{detail}</p>}
      </div>
      {action && (
        <button className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
          {action}
        </button>
      )}
    </div>
  );
}

function TaskList({ title = 'Today’s focus' }) {
  const [done, setDone] = useState([0]);
  const tasks = [
    'Review Machine Learning lecture slides (Chapter 3)',
    'Complete Backpropagation practice problem set',
    'Review 18 due flashcards in AI Basics deck'
  ];

  return (
    <Card>
      <SectionTitle title={title} detail="Consistent daily reviews build long-term retention." action="View all" />
      <div className="space-y-2.5">
        {tasks.map((task, i) => (
          <button
            key={task}
            onClick={() => setDone((v) => v.includes(i) ? v.filter((x) => x !== i) : [...v, i])}
            className="flex w-full items-center gap-3 rounded-2xl border border-violet-500/10 bg-[#181528] p-3 text-left hover:border-violet-500/30 hover:bg-[#1e1a33] transition-all"
          >
            <span className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
              done.includes(i) ? 'border-violet-500 bg-violet-600 text-white' : 'border-slate-500 text-transparent'
            }`}>
              <Check className="h-3 w-3" />
            </span>
            <span className={`flex-1 text-xs font-medium ${done.includes(i) ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
              {task}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              {['10:00 AM', '2:00 PM', '4:30 PM'][i]}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}

function Upcoming() {
  return (
    <Card>
      <SectionTitle title="Upcoming" detail="Next study milestones on your schedule." />
      <div className="space-y-2.5">
        {[
          ['Biology · Lab Report Submission', 'Tonight, 11:59 PM', 'bg-rose-500'],
          ['Neural Networks Live Lecture', 'Tomorrow, 4:00 PM', 'bg-violet-500'],
          ['Calculus Crew Study Group', 'Tue, 4:00 PM', 'bg-emerald-500']
        ].map(([name, time, color]) => (
          <div key={name} className="flex items-center gap-3 rounded-2xl bg-[#181528] p-3 border border-violet-500/10 hover:border-violet-500/30 transition-all">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{name}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{time}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-500" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function MyDay() {
  return (
    <Shell page="My Day" action="Add focus block" icon={Target}>
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Card>
          <SectionTitle title="Today's Schedule" detail="Balancing deep focus sessions with structured breaks." />
          <div className="space-y-4 pt-2">
            {[
              ['09:00', 'Morning Reset', 'Review flashcard deck and prioritize daily goals', 'bg-amber-500/15 border-amber-500/30 text-amber-300'],
              ['10:00', 'Machine Learning Review', 'Read Lecture 4 summary on Loss Functions', 'bg-violet-500/15 border-violet-500/30 text-violet-300'],
              ['14:00', 'Problem Set 3', 'Backpropagation calculations (estimated 60 min)', 'bg-blue-500/15 border-blue-500/30 text-blue-300'],
              ['16:00', 'Live Class', 'Neural Networks Explained with Professor', 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300']
            ].map(([time, name, detail, color]) => (
              <div key={time} className="flex gap-4 border-l-2 border-violet-500/20 pl-4">
                <span className="w-14 pt-1 text-xs font-mono font-semibold text-slate-400">{time}</span>
                <div className={`flex-1 rounded-2xl p-3.5 border ${color}`}>
                  <p className="font-bold text-xs text-white">{name}</p>
                  <p className="mt-0.5 text-[11px] opacity-80">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="h-fit">
          <SectionTitle title="Daily Intention" />
          <div className="rounded-2xl bg-violet-600/15 border border-violet-500/25 p-4 text-xs leading-relaxed text-violet-200">
            “Consistent daily recall builds deep mastery faster than last-minute cramming.”
          </div>
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Day progress</p>
            <div className="mt-2 h-2 rounded-full bg-[#1e1a33] overflow-hidden">
              <div className="h-2 w-1/3 rounded-full bg-gradient-to-r from-violet-600 to-purple-400" />
            </div>
            <p className="mt-2 text-xs text-slate-400">1 of 3 focus sessions completed</p>
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function Tasks() {
  return (
    <Shell page="Tasks" action="New task" icon={ListTodo}>
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <Card>
          <div className="mb-4 flex gap-2 rounded-2xl bg-[#181528] p-1 border border-violet-500/15">
            <button className="flex-1 rounded-xl bg-violet-600 py-1.5 text-xs font-bold text-white shadow-sm">All tasks <span className="text-violet-200">24</span></button>
            <button className="flex-1 py-1.5 text-xs text-slate-400 hover:text-white">Due Today <span className="text-violet-400">6</span></button>
            <button className="flex-1 py-1.5 text-xs text-slate-400 hover:text-white">Completed</button>
          </div>
          <TaskList title="Prioritized tasks" />
        </Card>

        <div className="space-y-6">
          <Upcoming />
          <Card className="h-fit">
            <SectionTitle title="By Subject" />
            <div className="space-y-4">
              {[
                ['Machine Learning', 8, 'bg-violet-500'],
                ['Calculus & Algebra', 6, 'bg-blue-500'],
                ['Biology', 5, 'bg-rose-500'],
                ['Computer Vision', 5, 'bg-emerald-500']
              ].map(([name, count, color]) => (
                <div key={name}>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-200">{name}</span>
                    <span className="text-slate-400 font-mono">{count}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-[#1e1a33]">
                    <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${Number(count) * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function CalendarPage({ timetable = false }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  return (
    <Shell page={timetable ? 'Timetable' : 'Calendar'} action={timetable ? 'Edit Timetable' : 'Add Event'} icon={CalendarDays}>
      <Card>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">October 2026</p>
            <h2 className="mt-0.5 text-lg font-bold text-white">
              {timetable ? 'Weekly Course Timetable' : 'Week of October 5 – 11'}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full text-xs border-violet-500/25">Today</Button>
            <Button variant="outline" size="icon" className="rounded-full border-violet-500/25"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {days.map((day, i) => (
            <div key={day} className="min-h-[280px] rounded-2xl bg-[#181528] p-3.5 border border-violet-500/15">
              <p className="text-[10px] font-bold uppercase tracking-wider text-violet-400">{day}</p>
              <p className="mt-0.5 text-base font-black text-white">{5 + i}</p>
              
              <div className="mt-4 space-y-2">
                {[
                  ['Machine Learning', 'bg-violet-600/20 text-violet-300 border-violet-500/30'],
                  ['Deep Work Session', 'bg-blue-600/20 text-blue-300 border-blue-500/30'],
                  ['Study Group', 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30']
                ].slice(0, i === 2 ? 3 : 2).map(([name, color]) => (
                  <div key={name} className={`rounded-xl p-2.5 text-xs font-semibold border ${color}`}>
                    {name}
                    <p className="mt-1 text-[10px] font-mono opacity-75">{i + 10}:00 AM</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Shell>
  );
}

function LibraryPage({ type }) {
  const norm = normalizePageName(type);
  const isFiles = norm === 'Files';
  const isNotes = norm === 'Notes';
  const isFlashcards = norm === 'Flashcards';

  const title = isFiles ? 'Course Documents' : isNotes ? 'Lecture Notes' : isFlashcards ? 'Active Recall Decks' : 'Practice Tests';
  const entries = isFiles 
    ? ['Machine Learning Lecture 04.pdf', 'Neural Networks Architecture.pdf', 'Lab Assignment 02.ipynb', 'Course Syllabus.pdf'] 
    : isNotes 
    ? ['Gradient Descent & Cost Functions', 'Convolutional Layers Explained', 'Attention Mechanisms Notes', 'Quiz 1 Review Reflections'] 
    : isFlashcards 
    ? ['AI Terminology & Fundamentals', 'Calculus for Deep Learning', 'Supervised vs Unsupervised Models', 'Optimization Algorithms'] 
    : ['ML Midterm Practice Exam', 'Linear Algebra Diagnostic', 'Neural Nets Self-Test', 'Finals Readiness Assessment'];

  return (
    <Shell page={norm} action={isFiles ? 'Upload file' : isNotes ? 'New note' : isFlashcards ? 'Create deck' : 'Start test'} icon={isFiles ? FolderOpen : isNotes ? FileText : BookOpen}>
      <div className="flex flex-wrap gap-3">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-2xl border border-violet-500/20 bg-[#161326] px-4 py-2.5 text-xs text-slate-400">
          <Search className="h-4 w-4" /> Search {title.toLowerCase()}...
        </div>
        <Button variant="outline" className="rounded-2xl border-violet-500/25 text-xs">
          <Grid3X3 className="h-3.5 w-3.5 mr-1.5" /> Sort
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
        {entries.map((entry, i) => (
          <Card key={entry} className="group cursor-pointer transition hover:-translate-y-1 hover:border-violet-500/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-300 border border-violet-500/30">
              <FileText className="h-4 w-4" />
            </div>
            <h3 className="mt-3 truncate font-bold text-sm text-white group-hover:text-violet-300 transition-colors">{entry}</h3>
            <p className="mt-1 text-[11px] text-slate-400 font-mono">
              {isFiles ? `${i + 2}.${i + 4} MB · Updated today` : isNotes ? 'Edited 2h ago' : isFlashcards ? `${36 + i * 14} cards · 82% mastery` : `${25 + i * 5} questions · 45m`}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-violet-400 group-hover:text-violet-300">
              <span>Open</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

function Assessments({ exams = false }) {
  const rows = exams
    ? [['Machine Learning Final Exam', 'AI Course', 'Dec 14 · 18 days away', 'border-rose-500 bg-rose-500/10 text-rose-300'],
       ['Linear Algebra Midterm', 'Math', 'Nov 20 · 24 days away', 'border-amber-500 bg-amber-500/10 text-amber-300'],
       ['Neural Networks Quiz', 'AI Course', 'Nov 02 · 6 days away', 'border-violet-500 bg-violet-500/10 text-violet-300']]
    : [['Loss Function Problem Set', 'Machine Learning', 'Due tonight at 11:59 PM', 'border-rose-500 bg-rose-500/10 text-rose-300'],
       ['Backpropagation Exercise', 'Mathematics', 'Due tomorrow at 5:00 PM', 'border-amber-500 bg-amber-500/10 text-amber-300'],
       ['Literature Review Summary', 'Research', 'Due Friday at 2:00 PM', 'border-violet-500 bg-violet-500/10 text-violet-300']];

  return (
    <Shell page={exams ? 'Exams' : 'Assignments'} action={exams ? 'Add Exam' : 'Add Assignment'} icon={exams ? Target : BookOpen}>
      <div className="grid gap-4 md:grid-cols-3">
        {rows.map(([name, subject, time, tag]) => (
          <Card key={name} className="flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${tag}`}>
                  {subject}
                </span>
                <MoreHorizontal className="h-4 w-4 text-slate-500 cursor-pointer" />
              </div>
              <h3 className="text-sm font-bold text-white">{name}</h3>
              <p className="mt-1 text-xs text-slate-400">{time}</p>
            </div>
            <div className="mt-6 pt-3 border-t border-violet-500/10 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Status: In Progress</span>
              <button className="text-xs font-semibold text-violet-400 hover:text-white">View details →</button>
            </div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

function AnalyticsPage({ grades = false }) {
  return (
    <Shell page={grades ? 'Grade Tracker' : 'Analytics'} action={grades ? 'Add a Grade' : 'Export Report'} icon={grades ? TrendingUp : BarChart3}>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <SectionTitle title={grades ? 'Grade Trajectory' : 'Study Hours (Last 12 Days)'} detail={grades ? 'Weighted GPA: 3.84 / 4.0' : 'Weekly target: 14 hours'} />
          <div className="flex h-52 items-end gap-3 border-b border-violet-500/15 px-2 pb-0 pt-6">
            {[42, 65, 50, 78, 62, 88, 72, 94, 68, 82, 76, 90].map((height, i) => (
              <div key={i} className="flex flex-1 flex-col justify-end gap-1.5 group">
                <div
                  className="rounded-t-md bg-gradient-to-t from-violet-700 to-violet-400 group-hover:from-violet-500 group-hover:to-white transition-all"
                  style={{ height: `${height}%` }}
                />
                <span className="text-center text-[10px] text-slate-500 font-mono">{i + 1}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle title="Performance Highlights" detail="Grounded study retention data." />
          <div className="space-y-3.5">
            {[
              ['Strongest Subject', 'Machine Learning', '94% mastery', '↑ 4%'],
              ['Average Focus Block', '42 min', 'per session', '↑ 14%'],
              ['Weekly Goal Progress', '8.4h / 12h', '70% completed', 'On track']
            ].map(([label, value, meta, change]) => (
              <div key={label} className="p-3 rounded-2xl bg-[#181528] border border-violet-500/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-base font-bold text-white mt-0.5">{value}</p>
                  <p className="text-[10px] text-slate-500">{meta}</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
                  {change}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function ToolPage({ page }) {
  const norm = normalizePageName(page);
  const isTimer = norm === 'Focus Timer';
  const isWhiteboard = norm === 'Whiteboard';
  const isSolver = norm === 'Math Solver';
  const isAI = norm === 'AI Assistant';

  // Working focus timer state
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    } else if (secondsLeft === 0) {
      setTimerRunning(false);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [timerRunning, secondsLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <Shell page={norm} action={isTimer ? undefined : isWhiteboard ? 'New Board' : undefined} icon={isTimer ? Timer : isAI ? Sparkles : Target}>
      <Card className="mx-auto max-w-3xl">
        {isTimer ? (
          <div className="flex flex-col items-center py-8">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-600/15 px-3 py-1 rounded-full border border-violet-500/25">
              Pomodoro Focus Session
            </span>
            <p className="my-6 text-7xl font-black tracking-tight text-white font-mono drop-shadow-[0_0_25px_rgba(139,92,246,0.35)]">
              {formatTime(secondsLeft)}
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setTimerRunning(!timerRunning)}
                className="rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs px-6 py-2.5 shadow-glow-sm"
              >
                {timerRunning ? <Pause className="h-4 w-4 mr-1.5" /> : <Play className="h-4 w-4 mr-1.5" />}
                {timerRunning ? 'Pause' : 'Start Focus'}
              </Button>
              <Button
                variant="outline"
                onClick={() => { setTimerRunning(false); setSecondsLeft(25 * 60); }}
                className="rounded-full border-violet-500/25 text-xs text-slate-300"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
              </Button>
            </div>
            <p className="mt-6 text-xs text-slate-400">
              Session 1 of 4 · Target: 100 minutes of deep study
            </p>
          </div>
        ) : isWhiteboard ? (
          <div className="h-[420px] rounded-2xl border-2 border-dashed border-violet-500/20 bg-[#161326] flex flex-col items-center justify-center p-6 text-center">
            <Grid3X3 className="h-10 w-10 text-violet-400/40 mb-3" />
            <h3 className="text-sm font-bold text-white">Visual Brainstorming Canvas</h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              Connect concepts, sketch network architectures, and map neural dependencies.
            </p>
            <Button className="mt-4 rounded-full bg-violet-600 text-white text-xs font-bold">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Canvas Note
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-2xl border border-violet-500/20 bg-[#171428] px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50"
                placeholder={isSolver ? "Enter mathematical expression (e.g. d/dx [x^3 * sin(x)])..." : "Calculate expression..."}
              />
              <Button className="rounded-2xl bg-violet-600 text-white text-xs font-bold px-4">
                Calculate
              </Button>
            </div>
            <div className="flex h-56 items-center justify-center rounded-2xl bg-[#171428] text-xs text-slate-400 border border-violet-500/10">
              {isSolver ? "Your step-by-step mathematical derivation will appear here" : "Ready for calculation"}
            </div>
          </div>
        )}
      </Card>
    </Shell>
  );
}

function SettingsPage() {
  return (
    <Shell page="Settings" action="Save changes" icon={Target}>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <Card className="h-fit">
          <nav className="space-y-1">
            {['Profile', 'Appearance', 'Notifications', 'Study Preferences', 'API Keys'].map((item, i) => (
              <button
                key={item}
                className={`w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors ${
                  i === 0 ? 'bg-violet-600/25 text-white font-bold border border-violet-500/30' : 'text-slate-400 hover:text-white hover:bg-[#1a172c]'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </Card>

        <Card>
          <SectionTitle title="Profile Settings" detail="How you appear in StudyFlow." />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                className="mt-1.5 w-full rounded-xl border border-violet-500/20 bg-[#181528] px-3 py-2 text-xs text-white focus:outline-none"
                defaultValue="Anastasiia H."
                readOnly
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Course / Major</label>
              <input
                className="mt-1.5 w-full rounded-xl border border-violet-500/20 bg-[#181528] px-3 py-2 text-xs text-white focus:outline-none"
                defaultValue="AI & Machine Learning"
                readOnly
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-violet-500/15">
            <p className="text-xs font-semibold text-slate-300 mb-2">Theme & Display</p>
            <div className="p-3 rounded-2xl bg-[#181528] border border-violet-500/15 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Dark Violet Theme</p>
                <p className="text-[10px] text-slate-400">Obsidian canvas with rich purple glow</p>
              </div>
              <span className="text-[10px] font-bold text-violet-400 bg-violet-600/20 px-2.5 py-1 rounded-full border border-violet-500/30">
                Active Default
              </span>
            </div>
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function Events() {
  return (
    <Shell page="Events" action="Create Event" icon={Users}>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['AI & Machine Learning Hackathon', 'OCT 18 · 10:00 AM', 'from-violet-600 to-purple-800'],
          ['Calculus Workshop: Partial Derivatives', 'OCT 22 · 4:00 PM', 'from-blue-600 to-indigo-800'],
          ['Deep Learning Reading Group', 'OCT 26 · 6:00 PM', 'from-emerald-600 to-teal-800']
        ].map(([name, time, gradient]) => (
          <Card key={name} className="overflow-hidden p-0 border border-violet-500/20">
            <div className={`h-24 bg-gradient-to-br ${gradient} p-4 flex items-end`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/30 px-2 py-0.5 rounded-full">
                {time}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-sm text-white">{name}</h3>
              <p className="mt-1 text-xs text-slate-400">Connect with classmates and work on collaborative projects.</p>
              <button className="mt-4 text-xs font-bold text-violet-400 hover:text-white flex items-center gap-1">
                View Event Details <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

function Groups() {
  return (
    <Shell page="Study Groups" action="Create a Group" icon={Users}>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Calculus Crew', '5 members', 'bg-blue-600/20 text-blue-300'],
          ['AI & Deep Learning Cohort', '12 members', 'bg-violet-600/20 text-violet-300'],
          ['Biology Problem Set Team', '8 members', 'bg-rose-600/20 text-rose-300']
        ].map(([name, members, color]) => (
          <Card key={name} className="flex flex-col justify-between">
            <div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${color} border border-violet-500/20`}>
                <Users className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold text-sm text-white">{name}</h3>
              <p className="mt-0.5 text-xs text-slate-400">{members} · Next session Tuesday</p>
            </div>
            <Button variant="outline" className="mt-5 w-full rounded-full border-violet-500/25 text-xs text-white hover:bg-violet-600 hover:border-violet-600">
              Join Group
            </Button>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

export default function PageTemplate({ page }) {
  const norm = normalizePageName(page);

  if (norm === 'My Day') return <MyDay />;
  if (norm === 'Tasks') return <Tasks />;
  if (norm === 'Calendar') return <CalendarPage />;
  if (norm === 'Timetable') return <CalendarPage timetable />;
  if (norm === 'Events') return <Events />;
  if (norm === 'Study Groups') return <Groups />;
  if (norm === 'Assignments') return <Assessments />;
  if (norm === 'Exams') return <Assessments exams />;
  if (['Notes', 'Flashcards', 'Files', 'Practice Tests'].includes(norm)) return <LibraryPage type={norm} />;
  if (norm === 'Analytics') return <AnalyticsPage />;
  if (norm === 'Grade Tracker') return <AnalyticsPage grades />;
  if (['Calculator', 'Math Solver', 'AI Assistant', 'Focus Timer', 'Whiteboard'].includes(norm)) return <ToolPage page={norm} />;
  if (norm === 'Settings') return <SettingsPage />;

  return (
    <Shell page={norm} action="Get started" icon={Sparkles}>
      <Card>
        <SectionTitle title="Your Workspace" detail="A focused space for your next study step." />
        <TaskList />
      </Card>
    </Shell>
  );
}
