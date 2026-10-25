import React, { useState } from 'react';
import { 
  Maximize2, 
  Sparkles, 
  Mic, 
  Send, 
  ArrowUpRight, 
  ArrowDownRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardView() {
  const [selectedDay, setSelectedDay] = useState(2); // Tuesday 06
  const [promptInput, setPromptInput] = useState('');
  const [aiConversation, setAiConversation] = useState([
    {
      sender: 'ai',
      text: "Hi Anastasiia! I'm your AI study partner. Ready to review your Neural Networks lecture before class at 4:00 PM?",
      isPrototype: true
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [isAiExpanded, setIsAiExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Week days for calendar
  const weekDays = [
    { dayName: 'Su', date: '04', full: 'Sunday, Oct 4' },
    { dayName: 'Mo', date: '05', full: 'Monday, Oct 5' },
    { dayName: 'Tu', date: '06', full: 'Tuesday, Oct 6' },
    { dayName: 'We', date: '07', full: 'Wednesday, Oct 7' },
    { dayName: 'Th', date: '08', full: 'Thursday, Oct 8' },
    { dayName: 'Fr', date: '09', full: 'Friday, Oct 9' },
  ];

  // Schedule lectures for timeline
  const scheduleEvents = [
    {
      id: 'ml-class',
      timeSlot: '12:00 - 13:45',
      title: 'How Machine Learning Works: From Data to Decisions',
      topOffset: 'top-[36px]',
      height: 'h-[110px]',
      attendees: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80'
      ],
      meetUrl: '#'
    },
    {
      id: 'nn-class',
      timeSlot: '16:00 - 17:45',
      title: 'Neural Networks Explained: Patterns, Layers, Intelligence',
      topOffset: 'top-[296px]',
      height: 'h-[110px]',
      attendees: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&auto=format&fit=crop&q=80'
      ],
      meetUrl: '#'
    }
  ];

  // AI Prompt suggestions
  const quickTips = [
    "Tip: Active Recall",
    "Explain Backpropagation",
    "Quiz me on 3 questions"
  ];

  const handleSendPrompt = (textToSend) => {
    const text = textToSend || promptInput;
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text };
    setAiConversation((prev) => [...prev, userMsg]);
    setPromptInput('');
    setIsAiThinking(true);

    // Simulated prototype AI response
    setTimeout(() => {
      let reply = "Here's a breakdown: Neural networks process data in layers using weighted connections and non-linear activation functions. In Phase 4, I will extract specific slide citations from your uploaded ML materials.";
      if (text.includes("Quiz")) {
        reply = "Question 1: What is the primary purpose of an activation function in a multi-layer perceptron? (A) Data normalization, (B) Introducing non-linearity, (C) Weight initialization.";
      } else if (text.includes("Recall") || text.includes("Tip")) {
        reply = "Active Recall Tip: After reading a lecture section, close your notes and write out the core equations from memory. This strengthens neural pathways 3x faster than passive re-reading.";
      }
      setAiConversation((prev) => [
        ...prev, 
        { sender: 'ai', text: reply, isPrototype: true }
      ]);
      setIsAiThinking(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      
      {/* ─── PROTOTYPE CLARITY BANNER ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#141024]/80 border border-violet-500/20 text-xs text-slate-300 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-violet-400 shadow-glow-sm animate-pulse" />
          <span className="font-semibold text-white">StudyFlow Redesign (Phase 2):</span>
          <span className="text-slate-400">Interactive dashboard matching the dark violet design system.</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-violet-300">
          <span className="px-2 py-0.5 rounded-full bg-violet-600/20 border border-violet-500/30">
            Mock data · Ready for Supabase sync
          </span>
        </div>
      </div>

      {/* ─── 3-COLUMN MAIN DASHBOARD GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ─── COLUMN 1: CALENDAR & TIMELINE (4 COLS) ─── */}
        <div className="lg:col-span-4 xl:col-span-4">
          <div className="rounded-3xl bg-[#13111C]/90 border border-violet-500/15 p-5 shadow-card-dark backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Calendar <span className="text-violet-400 font-semibold">(2)</span>
              </h2>
              <button
                onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none"
                title="Expand calendar"
                aria-label="Expand calendar modal"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>

            {/* Day Selector Pills */}
            <div className="grid grid-cols-6 gap-1.5 mb-6">
              {weekDays.map((d, index) => {
                const isSelected = selectedDay === index;
                return (
                  <button
                    key={d.dayName}
                    onClick={() => setSelectedDay(index)}
                    className={cn(
                      "flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all duration-200 text-xs",
                      isSelected
                        ? "bg-white text-slate-950 font-bold shadow-lg scale-105"
                        : "bg-[#181528] text-slate-400 hover:text-slate-200 hover:bg-[#201c34] font-medium"
                    )}
                  >
                    <span className="text-[10px] uppercase opacity-75">{d.dayName}</span>
                    <span className="text-sm mt-0.5">{d.date}</span>
                  </button>
                );
              })}
            </div>

            {/* Vertical Hourly Timeline */}
            <div className="relative border-t border-violet-500/10 pt-4 min-h-[460px]">
              
              {/* Timeline Hour Marks */}
              <div className="space-y-12">
                {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                  <div key={time} className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                    <span className="w-10 flex-shrink-0">{time}</span>
                    <div className="flex-1 border-b border-dashed border-violet-500/15" />
                  </div>
                ))}
              </div>

              {/* Live Current Time Line Marker (15:30) */}
              <div className="absolute left-0 right-0 top-[230px] flex items-center z-10 pointer-events-none">
                <div className="bg-[#1b172d] border border-violet-400/50 text-violet-300 font-bold text-[11px] px-2 py-0.5 rounded-full shadow-glow-sm">
                  15:30
                </div>
                <div className="flex-1 border-t-2 border-violet-500 shadow-glow-sm ml-1" />
              </div>

              {/* Class Event Card 1 (12:00 - 13:45) */}
              <div className="absolute left-12 right-0 top-[2px] p-3.5 rounded-2xl bg-[#1b182a]/95 border border-violet-500/25 shadow-lg backdrop-blur-md hover:border-violet-400/50 transition-all">
                <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                  <span className="font-semibold text-violet-300">| 12:00 - 13:45</span>
                  {/* Attendee Avatars */}
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {scheduleEvents[0].attendees.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="Classmate"
                        className="inline-block h-5 w-5 rounded-full ring-1 ring-[#1b182a] object-cover"
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                  {scheduleEvents[0].title}
                </h3>
                <div className="mt-2.5 flex justify-end">
                  <a
                    href="#join"
                    onClick={(e) => { e.preventDefault(); alert("Prototype: Class launch URL will connect to live video link in Phase 3."); }}
                    className="inline-flex items-center px-4 py-1 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    Join
                  </a>
                </div>
              </div>

              {/* Class Event Card 2 (16:00 - 17:45) */}
              <div className="absolute left-12 right-0 top-[262px] p-3.5 rounded-2xl bg-[#1b182a]/95 border border-violet-500/25 shadow-lg backdrop-blur-md hover:border-violet-400/50 transition-all">
                <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                  <span className="font-semibold text-violet-300">| 16:00 - 17:45</span>
                  {/* Attendee Avatars */}
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {scheduleEvents[1].attendees.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="Classmate"
                        className="inline-block h-5 w-5 rounded-full ring-1 ring-[#1b182a] object-cover"
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                  {scheduleEvents[1].title}
                </h3>
                <div className="mt-2.5 flex justify-end">
                  <a
                    href="#join"
                    onClick={(e) => { e.preventDefault(); alert("Prototype: Class launch URL will connect to live video link in Phase 3."); }}
                    className="inline-flex items-center px-4 py-1 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    Join
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ─── COLUMN 2: METRICS & LAST LESSON (4 COLS) ─── */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          
          {/* Card 1: Points & Hours Split Metric */}
          <div className="rounded-3xl bg-[#13111C]/90 border border-violet-500/15 p-5 shadow-card-dark backdrop-blur-xl">
            <div className="grid grid-cols-2 divide-x divide-violet-500/15">
              {/* Points */}
              <div className="pr-4">
                <p className="text-xl xl:text-2xl font-black text-white tracking-tight">836/1500</p>
                <p className="text-xs text-slate-400 mt-0.5">Points</p>
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>240 this week</span>
                </div>
              </div>

              {/* Hours */}
              <div className="pl-4">
                <p className="text-xl xl:text-2xl font-black text-white tracking-tight">8,4</p>
                <p className="text-xs text-slate-400 mt-0.5">Hours</p>
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-rose-400">
                  <ArrowDownRight className="h-3.5 w-3.5" />
                  <span>94% from last week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Lessons Mastery & Circular Ring */}
          <div className="rounded-3xl bg-[#13111C]/90 border border-violet-500/15 p-5 shadow-card-dark backdrop-blur-xl flex items-center justify-between">
            <div>
              <p className="text-2xl xl:text-3xl font-black text-white tracking-tight">62/105</p>
              <p className="text-xs text-slate-400 mt-1">Lessons</p>
              <span className="inline-block mt-3 text-[11px] font-medium text-violet-400 bg-violet-600/15 px-2.5 py-0.5 rounded-full border border-violet-500/25">
                On track for finals
              </span>
            </div>

            {/* Circular SVG Progress Ring (59%) */}
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-[#201c34]"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.59)}`}
                  strokeLinecap="round"
                  className="text-violet-500 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-base font-bold text-white tracking-tight">
                59%
              </span>
            </div>
          </div>

          {/* Card 3: "Last Lesson" Progress Feed */}
          <div className="rounded-3xl bg-[#13111C]/90 border border-violet-500/15 p-5 shadow-card-dark backdrop-blur-xl">
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">Last lesson</h2>
            
            <div className="space-y-3">
              {/* Module 1 */}
              <div className="rounded-2xl bg-[#191629] border border-violet-500/20 p-4 transition-all hover:border-violet-500/40">
                <h3 className="text-xs font-bold text-white">Key AI Concepts You Should Know</h3>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm">👩‍🎓</span>
                  <span className="text-[11px] text-slate-300 font-medium">You can be better!</span>
                </div>

                {/* Progress bar with percentage pill */}
                <div className="mt-3 relative">
                  <div className="h-1.5 w-full bg-[#292242] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-600 to-violet-300 rounded-full" style={{ width: '76%' }} />
                  </div>
                  <span className="absolute -top-4 right-0 text-[10px] text-slate-400 font-mono">76%</span>
                </div>

                <div className="mt-3 flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">5 min ago</span>
                  <button
                    onClick={() => alert("Resume Lesson: 'Key AI Concepts You Should Know'")}
                    className="px-3.5 py-1 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Module 2 */}
              <div className="rounded-2xl bg-[#191629] border border-violet-500/20 p-4 transition-all hover:border-violet-500/40">
                <h3 className="text-xs font-bold text-white">AI Basics: Terms, Models, and Data</h3>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm">👩‍🎓</span>
                  <span className="text-[11px] text-slate-300 font-medium">You're almost done!</span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 relative">
                  <div className="h-1.5 w-full bg-[#292242] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-600 to-violet-300 rounded-full" style={{ width: '96%' }} />
                  </div>
                  <span className="absolute -top-4 right-0 text-[10px] text-slate-400 font-mono">96%</span>
                </div>

                <div className="mt-3 flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">2 h ago</span>
                  <button
                    onClick={() => alert("Resume Lesson: 'AI Basics: Terms, Models, and Data'")}
                    className="px-3.5 py-1 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ─── COLUMN 3: GREETING & AI ASSISTANT (4 COLS) ─── */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          
          {/* Card 1: Greeting & 3D Character Avatar */}
          <div className="rounded-3xl bg-[#13111C]/90 border border-violet-500/15 p-6 shadow-card-dark backdrop-blur-xl relative overflow-hidden flex flex-col items-center text-center">
            {/* Ambient Violet Radial Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-violet-600/20 rounded-full blur-2xl pointer-events-none" />

            <h2 className="text-xl font-extrabold text-white tracking-tight">Hi, Anastasiia!</h2>
            <p className="text-xs text-slate-400 mt-1">Ready to make progress today?</p>

            {/* 3D Memoji / Avatar Representation */}
            <div className="my-4 relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-600/30 to-purple-800/30 p-1.5 shadow-glow-md flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80"
                  alt="Anastasiia Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-violet-400/50"
                />
              </div>
              <span className="absolute bottom-0 right-1 text-2xl animate-bounce">✨</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-violet-300 bg-violet-600/15 px-3 py-1 rounded-full border border-violet-500/25">
              <span>Next goal: Complete 1 practice quiz</span>
            </div>
          </div>

          {/* Card 2: Dedicated AI Assistant Orb & Chat */}
          <div className="rounded-3xl bg-[#13111C]/90 border border-violet-500/15 p-5 shadow-card-dark backdrop-blur-xl flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">AI Assistant</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">
                  Grounded Tutor
                </span>
              </div>
              <button
                onClick={() => setIsAiExpanded(!isAiExpanded)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none"
                title="Expand AI Assistant"
                aria-label="Expand AI Assistant modal"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>

            {/* Glowing 3D Orb Visualizer */}
            <div className="my-3 flex flex-col items-center justify-center py-2 relative">
              <div className="relative flex items-center justify-center">
                {/* Outer Glow Halo */}
                <div className="absolute w-28 h-28 rounded-full bg-violet-600/25 blur-xl animate-pulse-glow" />
                
                {/* 3D Sphere Body */}
                <div className="relative h-20 w-20 rounded-full bg-gradient-to-tr from-[#1b0836] via-[#6d28d9] to-[#c084fc] shadow-glow-lg border border-violet-300/40 flex items-center justify-center overflow-hidden">
                  {/* Swirling Specular Reflections */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_25%,rgba(255,255,255,0.7),transparent_50%)]" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-transparent via-violet-300/30 to-transparent animate-orb-rotate" />
                  <Sparkles className="h-6 w-6 text-white/90 drop-shadow-md z-10" />
                </div>
              </div>
            </div>

            {/* Conversation Log Preview */}
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto pr-1">
              {aiConversation.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "text-xs p-2.5 rounded-2xl leading-relaxed",
                    msg.sender === 'user'
                      ? "bg-violet-600/25 text-white ml-6 border border-violet-500/30 text-right"
                      : "bg-[#19152b] text-slate-200 mr-2 border border-violet-500/15"
                  )}
                >
                  <p>{msg.text}</p>
                  {msg.isPrototype && (
                    <span className="block mt-1 text-[9px] text-violet-400/80 font-mono">
                      (Prototype mock response · Edge function connection in Phase 4)
                    </span>
                  )}
                </div>
              ))}
              {isAiThinking && (
                <div className="bg-[#19152b] text-slate-400 text-xs p-2.5 rounded-2xl border border-violet-500/15 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span>AI tutor is analyzing course notes...</span>
                </div>
              )}
            </div>

            {/* Quick Suggestions Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
              {quickTips.map((tip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(tip)}
                  className="px-3 py-1 rounded-full bg-[#1b172d] hover:bg-violet-600/25 text-slate-300 hover:text-white border border-violet-500/20 text-[11px] whitespace-nowrap transition-colors"
                >
                  {tip}
                </button>
              ))}
            </div>

            {/* Interactive Prompt Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt();
              }}
              className="flex items-center gap-2 rounded-full bg-[#171426] border border-violet-500/25 px-3 py-1.5 focus-within:border-violet-500/60 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all shadow-inner"
            >
              <button
                type="button"
                onClick={() => {
                  setIsListening(!isListening);
                  if (!isListening) {
                    setPromptInput("Summarize Key AI Concepts from Chapter 3");
                  }
                }}
                className={cn(
                  "p-1.5 rounded-full text-slate-400 hover:text-white transition-colors focus:outline-none",
                  isListening && "text-rose-400 bg-rose-500/20 animate-pulse"
                )}
                title="Voice input (mock speech-to-text)"
                aria-label="Microphone input"
              >
                <Mic className="h-4 w-4" />
              </button>

              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ask me about..."
                className="flex-1 bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
              />

              <button
                type="submit"
                disabled={!promptInput.trim()}
                className="p-1.5 rounded-full bg-violet-600/30 text-violet-300 hover:bg-violet-600 hover:text-white disabled:opacity-40 disabled:hover:bg-violet-600/30 disabled:hover:text-violet-300 transition-all focus:outline-none"
                aria-label="Send prompt"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* ─── EXPANDED CALENDAR MODAL ─── */}
      {isCalendarExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl bg-[#141122] border border-violet-500/30 p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-violet-500/15">
              <h3 className="font-bold text-lg text-white">Full Week Schedule</h3>
              <button
                onClick={() => setIsCalendarExpanded(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-4 space-y-3">
              {scheduleEvents.map((evt) => (
                <div key={evt.id} className="p-4 rounded-2xl bg-[#1a172c] border border-violet-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-violet-400">{evt.timeSlot}</span>
                    <h4 className="font-bold text-white text-sm mt-0.5">{evt.title}</h4>
                  </div>
                  <button className="px-4 py-1.5 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-slate-200">
                    Join Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── EXPANDED AI ASSISTANT MODAL ─── */}
      {isAiExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl bg-[#141122] border border-violet-500/30 p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-violet-500/15">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-400" />
                <h3 className="font-bold text-lg text-white">Dedicated StudyFlow AI Tutor</h3>
              </div>
              <button
                onClick={() => setIsAiExpanded(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-4 text-sm text-slate-300 space-y-3">
              <p>
                In <strong>Phase 4</strong>, this modal connects directly to the server-side Supabase Edge Function with retrieval-augmented generation (RAG) over your uploaded PDFs, lecture transcripts, and slide decks.
              </p>
              <div className="p-4 rounded-2xl bg-[#1a172c] border border-violet-500/20">
                <span className="text-xs font-bold text-violet-300 block mb-1">Upcoming Capabilities:</span>
                <ul className="text-xs space-y-1 text-slate-400 list-disc list-inside">
                  <li>Direct citations from course syllabus and uploaded lecture slides.</li>
                  <li>Automatic generation of spaced-repetition flashcards.</li>
                  <li>Multi-turn Socratic tutoring and quiz self-evaluation.</li>
                </ul>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsAiExpanded(false)}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white font-medium text-xs hover:bg-violet-700"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
