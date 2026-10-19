import { useState } from 'react';
import {
  ArrowRight, BarChart3, BookOpen, CalendarDays, Check, CheckCircle2,
  ChevronRight, Clock3, FileText, Flame, FolderOpen, Grid3X3, ListTodo,
  MoreHorizontal, Play, Plus, Search, Send, Sparkles, Target,
  Timer, TrendingUp, Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const content = {
  Dashboard: ['Saturday, October 10, 2026', 'Good morning, Alex', 'A calm plan for a focused day.', 'violet'],
  'My Day': ['Saturday, October 10', 'Make today count', 'Your day, shaped around what matters most.', 'amber'],
  Tasks: ['Workspace', 'Tasks & priorities', 'Capture everything. Focus on the next right thing.', 'blue'],
  Calendar: ['October 2026', 'Your calendar', 'Protect time for deep work and the people who matter.', 'indigo'],
  Events: ['Campus life', 'Find your people', 'Discover workshops, clubs, and moments worth showing up for.', 'pink'],
  Timetable: ['Weekly rhythm', 'Your timetable', 'A repeatable week makes progress feel lighter.', 'teal'],
  Assignments: ['Coursework', 'Assignments', 'Turn every brief into a clear next step.', 'orange'],
  Exams: ['Preparation', 'Exam season, made simpler', 'See what is ahead and build confidence one session at a time.', 'red'],
  Notes: ['Knowledge base', 'A home for your ideas', 'Write it down once. Find it whenever you need it.', 'yellow'],
  Flashcards: ['Active recall', 'Remember more, faster', 'Short, focused reviews that make learning stick.', 'purple'],
  'Practice Tests': ['Test yourself', 'Practice with purpose', 'Find the gaps before they become surprises.', 'cyan'],
  'Study Groups': ['Learn together', 'Better together', 'Find a study rhythm that keeps you curious and accountable.', 'green'],
  'Grade Tracker': ['Performance', 'Know where you stand', 'See the work that will make the biggest difference.', 'emerald'],
  Analytics: ['Your patterns', 'Study smarter', 'A clear view of your time, focus, and progress.', 'sky'],
  Files: ['Library', 'Everything in its place', 'Your course materials, one searchable home.', 'slate'],
  Calculator: ['Quick tool', 'Calculator', 'Simple answers when you need them.', 'blue'],
  'Math Solver': ['Step by step', 'Math solver', 'Understand the method, not just the result.', 'indigo'],
  'AI Assistant': ['StudyFlow intelligence', 'Ask anything', 'An always-available study partner for the tricky moments.', 'violet'],
  'Focus Timer': ['Deep work', 'Protect your focus', 'One session. One intention. No noise.', 'rose'],
  Settings: ['Workspace preferences', 'Make it yours', 'Tune StudyFlow to fit the way you work.', 'slate'],
  Whiteboard: ['Visual thinking', 'Think out loud', 'Map ideas, sketch connections, see the bigger picture.', 'fuchsia'],
};

const gradients = {
  violet: 'from-violet-600 to-indigo-600', amber: 'from-amber-500 to-orange-500',
  blue: 'from-blue-600 to-cyan-500', indigo: 'from-indigo-600 to-violet-600',
  pink: 'from-pink-500 to-rose-500', teal: 'from-teal-500 to-emerald-500',
  orange: 'from-orange-500 to-amber-500', red: 'from-rose-600 to-red-500',
  yellow: 'from-yellow-500 to-amber-500', purple: 'from-purple-600 to-fuchsia-500',
  cyan: 'from-cyan-600 to-blue-500', green: 'from-emerald-600 to-teal-500',
  emerald: 'from-emerald-600 to-green-500', sky: 'from-sky-600 to-blue-500',
  slate: 'from-slate-700 to-slate-500', rose: 'from-rose-600 to-pink-500',
  fuchsia: 'from-fuchsia-600 to-purple-500',
};

function Shell({ page, children, action, icon: Icon = Sparkles }) {
  const [eyebrow, title, description, accent] = content[page] || content.Dashboard;
  return <div className="mx-auto max-w-[1440px] space-y-6 pb-10">
    <section className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${gradients[accent]} p-7 text-white shadow-xl shadow-slate-200/50 lg:p-9`}>
      <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[28px] border-white/10" />
      <div className="relative max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">{eyebrow}</p>
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 lg:text-base">{description}</p>
        {action && <Button className="mt-6 rounded-xl bg-white font-semibold text-slate-900 shadow-lg hover:bg-white/90"><Plus className="h-4 w-4" />{action}</Button>}
      </div>
      <Icon className="absolute bottom-9 right-10 hidden h-12 w-12 text-white/80 lg:block" />
    </section>{children}
  </div>;
}

function Card({ children, className = '' }) { return <div className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm lg:p-6 ${className}`}>{children}</div>; }
function SectionTitle({ title, detail, action }) { return <div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-900">{title}</h2>{detail && <p className="mt-1 text-sm text-slate-500">{detail}</p>}</div>{action && <button className="text-sm font-semibold text-violet-600">{action}</button>}</div>; }

function Dashboard() {
  return <Shell page="Dashboard" action="Plan my day"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {[[Flame, 'Focus streak', '6 days', '↑ 2 from last week'], [Clock3, 'Study time', '12h 40m', '↑ 18% this week'], [CheckCircle2, 'Tasks done', '18 / 24', '75% completion'], [Target, 'Next milestone', 'Biology exam', 'in 12 days']].map(([Icon, label, value, meta]) => <Card key={label}><div className="flex justify-between text-slate-400"><span className="text-sm">{label}</span><Icon className="h-4 w-4" /></div><p className="mt-3 text-2xl font-bold text-slate-900">{value}</p><p className="mt-1 text-xs font-medium text-emerald-600">{meta}</p></Card>)}
  </div><div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]"><TaskList /><Upcoming /></div></Shell>;
}

function TaskList({ title = 'Today’s focus' }) {
  const [done, setDone] = useState([0]); const tasks = ['Review lecture notes', 'Finish biology problem set', 'Read chapter 4 summary'];
  return <Card><SectionTitle title={title} detail="A little progress is still progress." action="View all" /><div className="space-y-3">{tasks.map((task, i) => <button key={task} onClick={() => setDone((v) => v.includes(i) ? v.filter((x) => x !== i) : [...v, i])} className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left hover:border-violet-200 hover:bg-violet-50/40"><span className={`flex h-6 w-6 items-center justify-center rounded-full border ${done.includes(i) ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 text-transparent'}`}><Check className="h-3.5 w-3.5" /></span><span className={`flex-1 text-sm font-medium ${done.includes(i) ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task}</span><span className="text-xs text-slate-400">{['10:00 AM', '2:00 PM', '4:30 PM'][i]}</span></button>)}</div></Card>;
}

function Upcoming() { return <Card><SectionTitle title="Upcoming" detail="The next few things on your radar." /><div className="space-y-2">{[['Biology · Lab report', 'Today, 11:59 PM', 'bg-rose-500'], ['Focus session', 'Tomorrow, 9:00 AM', 'bg-violet-500'], ['Study group · Library', 'Tue, 4:00 PM', 'bg-emerald-500']].map(([name, time, color]) => <div key={name} className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50"><span className={`h-2.5 w-2.5 rounded-full ${color}`} /><div className="flex-1"><p className="text-sm font-semibold text-slate-700">{name}</p><p className="mt-1 text-xs text-slate-400">{time}</p></div><ChevronRight className="h-4 w-4 text-slate-300" /></div>)}</div></Card>; }

function MyDay() { return <Shell page="My Day" action="Add focus block" icon={Target}><div className="grid gap-6 xl:grid-cols-[1fr_340px]"><Card><SectionTitle title="Saturday, October 10" detail="Your ideal day has room to breathe." /><div className="space-y-0">{[['09:00', 'Morning reset', 'Plan the day and clear your inbox', 'bg-amber-100 text-amber-700'], ['10:00', 'Deep work', 'Review lecture notes', 'bg-violet-100 text-violet-700'], ['14:00', 'Biology problem set', '12 questions · estimated 90 min', 'bg-blue-100 text-blue-700'], ['16:30', 'Read & reflect', 'Chapter 4 summary', 'bg-emerald-100 text-emerald-700']].map(([time, name, detail, color]) => <div key={time} className="flex gap-4 border-l-2 border-slate-100 pb-7 pl-5 last:pb-0"><span className="w-14 pt-1 text-xs font-semibold text-slate-400">{time}</span><div className={`flex-1 rounded-xl p-4 ${color}`}><p className="font-semibold">{name}</p><p className="mt-1 text-xs opacity-75">{detail}</p></div></div>)}</div></Card><Card className="h-fit"><SectionTitle title="Daily intention" /><div className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">“Do less, but do it with full attention.”</div><div className="mt-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Day progress</p><div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-2 w-1/3 rounded-full bg-amber-500" /></div><p className="mt-2 text-sm text-slate-500">1 of 3 focus blocks complete</p></div></Card></div></Shell>; }

function Tasks() { return <Shell page="Tasks" action="New task" icon={ListTodo}><div className="grid gap-6 xl:grid-cols-[1fr_300px]"><Card><div className="mb-5 flex gap-2 rounded-xl bg-slate-50 p-1"><button className="flex-1 rounded-lg bg-white py-2 text-sm font-semibold text-slate-800 shadow-sm">All tasks <span className="text-slate-400">24</span></button><button className="flex-1 py-2 text-sm text-slate-500">Today <span>6</span></button><button className="flex-1 py-2 text-sm text-slate-500">Completed</button></div><TaskList title="All tasks" /></Card><Card className="h-fit"><SectionTitle title="By subject" /><div className="space-y-4">{[['Biology', 8, 'bg-rose-500'], ['Mathematics', 6, 'bg-blue-500'], ['History', 5, 'bg-amber-500'], ['Design', 5, 'bg-emerald-500']].map(([name, count, color]) => <div key={name}><div className="flex justify-between text-sm"><span className="font-medium text-slate-700">{name}</span><span className="text-slate-400">{count}</span></div><div className="mt-2 h-1.5 rounded-full bg-slate-100"><div className={`h-1.5 rounded-full ${color}`} style={{ width: `${count * 10}%` }} /></div></div>)}</div></Card></div></Shell>; }

function CalendarPage({ timetable = false }) { const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']; return <Shell page={timetable ? 'Timetable' : 'Calendar'} action={timetable ? 'Edit timetable' : 'Add event'} icon={CalendarDays}><Card><div className="mb-6 flex items-center justify-between"><div><p className="text-sm font-medium text-slate-500">October 2026</p><h2 className="mt-1 text-xl font-bold text-slate-900">{timetable ? 'Weekly class schedule' : 'Week of October 5 – 11'}</h2></div><div className="flex gap-2"><Button variant="outline" size="sm">Today</Button><Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button></div></div><div className="grid grid-cols-5 gap-2">{days.map((day, i) => <div key={day} className="min-h-[360px] rounded-xl bg-slate-50 p-3"><p className="text-xs font-semibold uppercase text-slate-400">{day}</p><p className="mt-1 text-lg font-bold text-slate-800">{5 + i}</p><div className="mt-6 space-y-2">{[['Biology', 'bg-rose-100 text-rose-700'], ['Focus block', 'bg-violet-100 text-violet-700'], ['Study group', 'bg-emerald-100 text-emerald-700']].slice(0, i === 2 ? 3 : 2).map(([name, color]) => <div key={name} className={`rounded-lg p-2 text-xs font-semibold ${color}`}>{name}<p className="mt-1 text-[10px] font-normal opacity-70">{i + 9}:00 AM</p></div>)}</div></div>)}</div></Card></Shell>; }

function LibraryPage({ type }) { const isFiles = type === 'Files'; const isNotes = type === 'Notes'; const title = isFiles ? 'Recent files' : isNotes ? 'Recent notes' : 'Your decks'; const entries = isFiles ? ['Biology lecture slides.pdf', 'Research proposal.docx', 'Lab results spreadsheet.xlsx', 'Reading list.pdf'] : isNotes ? ['Cellular respiration', 'Research ideas', 'Week 4 reflections', 'History essay outline'] : ['Biology · Chapter 4', 'Spanish vocabulary', 'Organic chemistry', 'World history']; return <Shell page={type} action={isFiles ? 'Upload file' : isNotes ? 'New note' : 'Create deck'} icon={isFiles ? FolderOpen : isNotes ? FileText : BookOpen}><div className="flex flex-wrap gap-3"><div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400"><Search className="h-4 w-4" /> Search {type.toLowerCase()}...</div><Button variant="outline"><Grid3X3 className="h-4 w-4" /> Sort</Button></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{entries.map((entry, i) => <Card key={entry} className="group cursor-pointer transition hover:-translate-y-1 hover:border-violet-200"><div className={`flex h-11 w-11 items-center justify-center rounded-xl ${['bg-violet-100 text-violet-600', 'bg-amber-100 text-amber-600', 'bg-emerald-100 text-emerald-600', 'bg-blue-100 text-blue-600'][i]}`}><FileText className="h-5 w-5" /></div><h3 className="mt-4 truncate font-semibold text-slate-800">{entry}</h3><p className="mt-2 text-xs text-slate-400">{isFiles ? `${i + 2}.${i + 1} MB · Updated today` : isNotes ? 'Edited 2 hours ago' : `${42 + i * 18} cards · 78% mastered`}</p><ArrowRight className="mt-5 h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-500" /></Card>)}</div></Shell>; }

function Assessments({ exams = false }) {
  const palettes = {
    rose: ['border-l-rose-500', 'bg-rose-100 text-rose-700', 'bg-rose-500'],
    amber: ['border-l-amber-500', 'bg-amber-100 text-amber-700', 'bg-amber-500'],
    blue: ['border-l-blue-500', 'bg-blue-100 text-blue-700', 'bg-blue-500'],
  };
  const rows = exams
    ? [['Biology final', 'Oct 22', '12 days away', 'rose'], ['World history midterm', 'Nov 04', '25 days away', 'amber'], ['Mathematics quiz', 'Nov 12', '33 days away', 'blue']]
    : [['Lab report', 'Biology', 'Due today', 'rose'], ['Problem set 4', 'Mathematics', 'Due tomorrow', 'amber'], ['Essay outline', 'History', 'Due Oct 15', 'blue']];
  return <Shell page={exams ? 'Exams' : 'Assignments'} action={exams ? 'Add exam' : 'Add assignment'} icon={exams ? Target : BookOpen}><div className="grid gap-4 md:grid-cols-3">{rows.map(([name, subject, time, color]) => { const [border, tag, fill] = palettes[color]; return <Card key={name} className={`border-l-4 ${border}`}><div className="flex justify-between"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tag}`}>{subject}</span><MoreHorizontal className="h-4 w-4 text-slate-400" /></div><h3 className="mt-6 text-lg font-bold text-slate-800">{name}</h3><p className="mt-2 text-sm text-slate-500">{time}</p><div className="mt-6 h-1.5 rounded-full bg-slate-100"><div className={`h-1.5 rounded-full ${fill} ${exams ? 'w-1/3' : 'w-2/3'}`} /></div></Card>; })}</div></Shell>;
}

function AnalyticsPage({ grades = false }) { return <Shell page={grades ? 'Grade Tracker' : 'Analytics'} action={grades ? 'Add a grade' : 'View full report'} icon={grades ? TrendingUp : BarChart3}><div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]"><Card><SectionTitle title={grades ? 'Grade overview' : 'Study hours'} detail={grades ? 'Current performance by subject' : 'Your last 7 days'} /><div className="flex h-56 items-end gap-4 border-b border-slate-100 px-4 pb-0 pt-6">{[42, 65, 50, 78, 62, 88, 72, 94, 68, 82, 76, 90].map((height, i) => <div key={i} className="flex flex-1 flex-col justify-end gap-2"><div className={`rounded-t-md ${grades ? 'bg-emerald-400' : 'bg-violet-400'}`} style={{ height: `${height}%` }} /><span className="text-center text-[10px] text-slate-400">{i + 1}</span></div>)}</div></Card><Card><SectionTitle title="Highlights" detail="Small signals, useful context." /><div className="space-y-4">{[['Best subject', 'Biology', '92%', '↑ 4%'], ['Focus average', '38 min', 'per session', '↑ 12%'], ['Weekly goal', '8.5h', 'of 10 hours', '85%']].map(([label, value, meta, change]) => <div key={label} className="flex items-center gap-3"><div className="flex-1"><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-xl font-bold text-slate-800">{value}</p></div><div className="text-right text-xs font-semibold text-emerald-600">{change}<p className="mt-1 font-normal text-slate-400">{meta}</p></div></div>)}</div></Card></div></Shell>; }

function ToolPage({ page }) { const [running, setRunning] = useState(false); const isAI = page === 'AI Assistant'; const isTimer = page === 'Focus Timer'; const isWhiteboard = page === 'Whiteboard'; return <Shell page={page} action={isTimer ? undefined : isWhiteboard ? 'New board' : isAI ? undefined : 'Clear'} icon={isTimer ? Timer : isAI ? Sparkles : isWhiteboard ? Grid3X3 : Target}><Card className="mx-auto max-w-4xl">{isAI ? <><div className="flex min-h-[300px] flex-col justify-end rounded-xl bg-slate-50 p-5"><div className="max-w-md rounded-2xl rounded-bl-sm bg-white p-4 shadow-sm"><p className="text-sm font-semibold text-slate-800">StudyFlow AI</p><p className="mt-2 text-sm leading-6 text-slate-600">Hi Alex! I can explain a concept, quiz you, or help build a study plan. What are you working on?</p></div></div><div className="mt-4 flex gap-2 rounded-xl border border-slate-200 p-2"><input className="flex-1 bg-transparent px-3 text-sm outline-none" placeholder="Ask anything about your studies..." /><Button size="icon"><Send className="h-4 w-4" /></Button></div></> : isTimer ? <div className="flex flex-col items-center py-12"><p className="text-sm font-semibold uppercase tracking-wider text-rose-500">Focus session</p><p className="my-6 text-7xl font-bold tracking-tight text-slate-900">25:00</p><div className="flex gap-3"><Button onClick={() => setRunning(!running)} className="rounded-xl bg-rose-600 hover:bg-rose-700"><Play className="h-4 w-4" />{running ? 'Pause' : 'Start timer'}</Button><Button variant="outline" className="rounded-xl">Reset</Button></div></div> : isWhiteboard ? <div className="h-[420px] rounded-xl border-2 border-dashed border-slate-200 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:22px_22px]"><div className="m-6 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm"><Plus className="h-4 w-4" /> Add a thought</div></div> : <><div className="mb-4 flex gap-2"><input className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400" placeholder="Enter an expression..." /><Button>Calculate</Button></div><div className="flex h-64 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">{page === 'Math Solver' ? 'Your worked solution will appear here' : 'Ready for your next calculation'}</div></>}</Card></Shell>; }

function SettingsPage() { return <Shell page="Settings" action="Save changes" icon={Target}><div className="grid gap-6 lg:grid-cols-[220px_1fr]"><Card className="h-fit"><nav className="space-y-1">{['Profile', 'Appearance', 'Notifications', 'Study preferences'].map((item, i) => <button key={item} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${i === 0 ? 'bg-violet-50 font-semibold text-violet-700' : 'text-slate-500 hover:bg-slate-50'}`}>{item}</button>)}</nav></Card><Card><SectionTitle title="Profile" detail="How you appear in StudyFlow." /><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium text-slate-600">First name<input className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" value="Alex" readOnly /></label><label className="text-sm font-medium text-slate-600">Email<input className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" value="alex@example.com" readOnly /></label></div></Card></div></Shell>; }

function Events() { return <Shell page="Events" action="Create event" icon={Users}><div className="grid gap-4 md:grid-cols-3">{['Design club meetup', 'Library workshop', 'Campus welcome night'].map((name, i) => <Card key={name} className="overflow-hidden p-0"><div className={`h-28 bg-gradient-to-br ${['from-pink-500 to-orange-400', 'from-indigo-500 to-cyan-400', 'from-emerald-500 to-teal-400'][i]}`} /><div className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-violet-600">OCT {12 + i * 2} · 4:00 PM</p><h3 className="mt-2 font-bold text-slate-800">{name}</h3><p className="mt-2 text-sm text-slate-500">Meet other students and explore something new.</p><button className="mt-4 text-sm font-semibold text-violet-600">View details <ArrowRight className="ml-1 inline h-3 w-3" /></button></div></Card>)}</div></Shell>; }

function Groups() { return <Shell page="Study Groups" action="Create a group" icon={Users}><div className="grid gap-4 md:grid-cols-3">{[['Biology Buddies', '8 members', 'bg-rose-100 text-rose-600'], ['Calculus Crew', '5 members', 'bg-blue-100 text-blue-600'], ['Essay Workshop', '12 members', 'bg-amber-100 text-amber-600']].map(([name, members, color]) => <Card key={name}><div className={`flex h-12 w-12 items-center justify-center rounded-full ${color}`}><Users className="h-5 w-5" /></div><h3 className="mt-4 font-bold text-slate-800">{name}</h3><p className="mt-1 text-sm text-slate-500">{members} · Next session Tue</p><Button variant="outline" className="mt-5 w-full">Join group</Button></Card>)}</div></Shell>; }

export default function PageTemplate({ page }) {
  if (page === 'Dashboard') return <Dashboard />;
  if (page === 'My Day') return <MyDay />;
  if (page === 'Tasks') return <Tasks />;
  if (page === 'Calendar') return <CalendarPage />;
  if (page === 'Timetable') return <CalendarPage timetable />;
  if (page === 'Events') return <Events />;
  if (page === 'Study Groups') return <Groups />;
  if (page === 'Assignments') return <Assessments />;
  if (page === 'Exams') return <Assessments exams />;
  if (['Notes', 'Flashcards', 'Files'].includes(page)) return <LibraryPage type={page} />;
  if (page === 'Analytics') return <AnalyticsPage />;
  if (page === 'Grade Tracker') return <AnalyticsPage grades />;
  if (['Calculator', 'Math Solver', 'AI Assistant', 'Focus Timer', 'Whiteboard'].includes(page)) return <ToolPage page={page} />;
  if (page === 'Settings') return <SettingsPage />;
  return <Shell page={page} action="Get started" icon={Sparkles}><Card><SectionTitle title="Your workspace" detail="A focused space for your next step." /><TaskList /></Card></Shell>;
}
