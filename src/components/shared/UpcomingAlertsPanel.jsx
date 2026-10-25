import React, { useState, useRef, useEffect } from "react";
import { Bell, Clock, CheckCircle2, BookOpen, AlertCircle, X } from "lucide-react";

export default function UpcomingAlertsPanel() {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);
  const panelRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "How Machine Learning Works",
      desc: "Live class starting at 12:00 PM",
      time: "In 25 mins",
      type: "class",
      unread: true,
    },
    {
      id: 2,
      title: "Biology Lab Report",
      desc: "Assignment deadline tonight at 11:59 PM",
      time: "Today",
      type: "deadline",
      unread: true,
    },
    {
      id: 3,
      title: "Spaced Repetition Due",
      desc: "18 cards in 'AI Basics' ready for review",
      time: "1 hour ago",
      type: "recall",
      unread: true,
    },
    {
      id: 4,
      title: "Study Group: Calculus Crew",
      desc: "Weekly session scheduled for Tuesday 4:00 PM",
      time: "Tomorrow",
      type: "group",
      unread: true,
    },
    {
      id: 5,
      title: "Focus Goal Milestone",
      desc: "You completed 8.4 hours of study this week!",
      time: "2 hours ago",
      type: "achievement",
      unread: true,
    },
  ];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) setUnreadCount(0);
        }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#171426] border border-violet-500/20 text-slate-300 transition-all hover:bg-violet-600/20 hover:text-white hover:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        aria-label="View notifications"
        aria-expanded={open}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white shadow-glow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="region"
          aria-label="Notifications"
          className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#141122] border border-violet-500/30 p-4 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between pb-3 border-b border-violet-500/15">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-sm">Notifications</h3>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-violet-600/30 text-violet-300 border border-violet-500/30">
                5 new
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
              aria-label="Close notifications"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 p-2.5 rounded-xl bg-[#1a172c]/70 border border-violet-500/10 hover:border-violet-500/30 transition-all cursor-pointer group"
              >
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400 group-hover:bg-violet-600/30">
                  {n.type === "class" && <Clock className="h-3.5 w-3.5" />}
                  {n.type === "deadline" && <AlertCircle className="h-3.5 w-3.5 text-rose-400" />}
                  {n.type === "recall" && <BookOpen className="h-3.5 w-3.5 text-violet-400" />}
                  {n.type === "group" && <BookOpen className="h-3.5 w-3.5 text-blue-400" />}
                  {n.type === "achievement" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-semibold text-slate-200 truncate">{n.title}</p>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-violet-500/15 flex items-center justify-between">
            <span className="text-[10px] text-slate-500">Demo alerts · Local state</span>
            <button
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-violet-400 hover:text-violet-300"
            >
              Dismiss all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
