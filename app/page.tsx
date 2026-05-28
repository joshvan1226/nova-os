"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  CalendarDays,
  Check,
  ChevronRight,
  Command,
  Dumbbell,
  FileText,
  Flame,
  Globe2,
  Home,
  Plus,
  Search,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

type Task = {
  id: number;
  title: string;
  tag: string;
  priority: string;
  done: boolean;
};

type Habit = {
  id: number;
  title: string;
  meta: string;
  done: boolean;
};

type Goal = {
  id: number;
  title: string;
  category: string;
  done: boolean;
};

type Module = {
  id: number;
  label: string;
  visible: boolean;
};

type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  start: string;
  end: string;
  type: "fixed" | "flexible" | "protected";
  recurring?: string;
};

const navItems = [
  { label: "Home", icon: Home },
  { label: "CRM", icon: Users },
  { label: "Brain", icon: Bot },
  { label: "Websites", icon: Globe2 },
  { label: "Fitness", icon: Dumbbell },
  { label: "Finance", icon: Wallet },
  { label: "Journal", icon: FileText },
];

const startingTasks: Task[] = [
  { id: 1, title: "Follow up with website lead", tag: "sales", priority: "+3", done: false },
  { id: 2, title: "Build Zane session notes", tag: "fitness", priority: "+2", done: false },
  { id: 3, title: "Review trading journal", tag: "finance", priority: "+1", done: false },
];

const startingHabits: Habit[] = [
  { id: 1, title: "Bible + prayer", meta: "spirit · 0/1", done: false },
  { id: 2, title: "Gym / cardio", meta: "body · 0/1", done: false },
  { id: 3, title: "Client outreach", meta: "business · 0/5", done: false },
  { id: 4, title: "Deep work block", meta: "focus · 0/2 hr", done: false },
  { id: 5, title: "Read / study", meta: "mind · 0/30 min", done: false },
  { id: 6, title: "Night journal", meta: "reset · 0/1", done: false },
];

const startingModules: Module[] = [
  { id: 1, label: "Tasks", visible: true },
  { id: 2, label: "Habits", visible: true },
  { id: 3, label: "Calendar", visible: true },
  { id: 4, label: "Finance", visible: true },
  { id: 5, label: "Journal", visible: true },
  { id: 6, label: "AI Worker", visible: true },
];

const startingEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Train myself",
    date: "Tomorrow",
    start: "11:30 AM",
    end: "12:30 PM",
    type: "flexible",
    recurring: "Daily routine",
  },
  {
    id: 2,
    title: "Bible study",
    date: "Thursday",
    start: "7:00 PM",
    end: "8:30 PM",
    type: "protected",
    recurring: "Weekly",
  },
];

const projects = [
  { name: "Nova OS", type: "AI Worker App", status: "Core v1", progress: 35 },
  { name: "Personal Training", type: "Client Programs", status: "Building", progress: 48 },
  { name: "Trading System", type: "MES / NQ", status: "Review", progress: 55 },
];

const quickActions = [
  "Add client session",
  "Move flexible routine",
  "Build workout plan",
  "Create proposal",
  "Plan my day",
  "Log finance entry",
];

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30 backdrop-blur-xl ${className}`}>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Button({ children, className = "", ...props }: any) {
  return (
    <button className={`transition active:scale-[0.98] ${className}`} {...props}>
      {children}
    </button>
  );
}

function SectionLabel({ number, title, right }: { number: string; title: string; right?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-slate-500">
      <span>// {number} // {title}</span>
      {right && <span className="text-slate-400">{right}</span>}
    </div>
  );
}

function getEasternTime() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date());
}

export default function NovaOSDashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [clock, setClock] = useState(getEasternTime());
  const [capture, setCapture] = useState("");
  const [tasks, setTasks] = useState<Task[]>(startingTasks);
  const [habits, setHabits] = useState<Habit[]>(startingHabits);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goal, setGoal] = useState("");
  const [modules, setModules] = useState<Module[]>(startingModules);
  const [events, setEvents] = useState<CalendarEvent[]>(startingEvents);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setClock(getEasternTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  const today = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "long",
      month: "short",
      day: "numeric",
    }).format(new Date());
  }, []);

  const completedTasks = tasks.filter((task) => task.done).length;
  const completedHabits = habits.filter((habit) => habit.done).length;

  function addCapture() {
    if (!capture.trim()) return;
    setTasks((prev) => [
      { id: Date.now(), title: capture.trim(), tag: "capture", priority: "+1", done: false },
      ...prev,
    ]);
    setCapture("");
  }

  function addGoal() {
    if (!goal.trim()) return;
    setGoals((prev) => [{ id: Date.now(), title: goal.trim(), category: "weekly", done: false }, ...prev]);
    setGoal("");
  }

  function addCalendarEvent() {
    if (!eventTitle.trim()) return;
    setEvents((prev) => [
      {
        id: Date.now(),
        title: eventTitle.trim(),
        date: "Tomorrow",
        start: eventTime.trim() || "12:00 PM",
        end: "Auto",
        type: "fixed",
      },
      ...prev,
    ]);
    setEventTitle("");
    setEventTime("");
  }

  function simulateSmartReschedule() {
    const clientEvent: CalendarEvent = {
      id: Date.now(),
      title: "Client session",
      date: "Tomorrow",
      start: "12:00 PM",
      end: "12:30 PM",
      type: "fixed",
    };

    setEvents((prev) => {
      const moved = prev.map((event) =>
        event.title.toLowerCase().includes("train") && event.type === "flexible"
          ? { ...event, start: "12:30 PM", end: "1:30 PM" }
          : event
      );
      return [clientEvent, ...moved];
    });
  }

  function visible(label: string) {
    return modules.find((module) => module.label === label)?.visible;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#030607] text-slate-100">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-[-8%] top-[12%] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[25%] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] flex-col p-3 sm:p-5">
        <motion.header
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-3 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/10">
              <Command className="h-4 w-4 text-emerald-300" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.34em] text-slate-500">Nova OS // Core v1</div>
              <div className="text-sm text-slate-300">Editable AI Worker Command Center</div>
            </div>
          </div>

          <nav className="hidden flex-1 justify-center gap-1 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition ${
                    active
                      ? "border border-white/10 bg-white/10 text-white"
                      : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Button className="h-8 rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-slate-200 hover:bg-white/10">
              Export
            </Button>
            <Button className="h-8 rounded-xl bg-emerald-400/90 px-3 text-xs font-semibold text-black hover:bg-emerald-300">
              Live UI
            </Button>
            <span className="hidden sm:inline">{today}</span>
          </div>
        </motion.header>

        <main className="grid flex-1 grid-cols-1 gap-4 xl:grid-cols-[300px_1fr_330px]">
          <section className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}>
              <GlassCard>
                <SectionLabel number="01" title="Operator" right="Online" />
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-slate-700 to-slate-950 text-lg font-bold">
                    JV
                  </div>
                  <div>
                    <h2 className="font-semibold">Josh Van Arsdale</h2>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Founder · Builder</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3">
                  <p className="text-xs italic text-slate-400">Focus</p>
                  <p className="mt-1 text-sm text-slate-200">Build the empire. Move with precision.</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Tasks</div>
                    <div className="mt-2 flex items-end gap-1"><span className="text-2xl font-semibold">{completedTasks}</span><span className="pb-1 text-xs text-slate-500">/{tasks.length}</span></div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Mode</div>
                    <div className="mt-2 flex items-center gap-2 text-sm"><Flame className="h-4 w-4 text-emerald-300" /> Execute</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {visible("Finance") && (
              <GlassCard>
                <SectionLabel number="02" title="Finance Radar" right="Manual first" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Monthly Goal</div>
                    <div className="mt-1 text-3xl font-semibold tracking-tight">$10,000</div>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">Tradify later</div>
                </div>
                <div className="mt-5 h-16 overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-2">
                  <svg viewBox="0 0 260 62" className="h-full w-full">
                    <path d="M0 48 C35 42 48 38 78 39 C113 40 113 27 148 26 C181 25 176 19 211 20 C237 21 244 13 260 12" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-300/70" />
                  </svg>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3"><p className="text-xs text-slate-500">Today</p><p className="mt-1 text-xl font-semibold">$0</p></div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3"><p className="text-xs text-slate-500">Disposable</p><p className="mt-1 text-xl font-semibold">$0</p></div>
                </div>
              </GlassCard>
            )}

            {visible("Tasks") && (
              <GlassCard>
                <SectionLabel number="03" title="Today · Key" right={`${completedTasks}/${tasks.length}`} />
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div key={task.id} className={`group flex w-full items-center gap-3 rounded-2xl border border-white/10 p-3 transition ${task.done ? "bg-emerald-400/10" : "bg-black/20 hover:bg-white/[0.06]"}`}>
                      <button
                        onClick={() => setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, done: !t.done } : t))}
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${task.done ? "border-emerald-300 bg-emerald-300 text-black" : "border-slate-700 text-transparent"}`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className={`truncate text-sm ${task.done ? "text-slate-500 line-through" : "text-slate-200"}`}>{task.title}</p>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{task.tag}</p>
                      </div>
                      <span className="text-xs text-slate-500">{task.priority}</span>
                      <button onClick={() => setTasks((prev) => prev.filter((t) => t.id !== task.id))} className="text-slate-600 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </section>

          <section className="space-y-4">
            <GlassCard className="min-h-[150px]">
              <SectionLabel number="04" title="Session" right="America/New_York" />
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Good day, Josh.</h1>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-500">Command the day. Capture everything. Execute one thing at a time.</p>
                </div>
                <div className="text-left lg:text-right">
                  <div className="text-4xl font-semibold tabular-nums">{clock}</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Eastern Time</div>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Sparkles className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300" />
                  <input
                    value={capture}
                    onChange={(e) => setCapture(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCapture()}
                    placeholder="Add a task, idea, client note, or command..."
                    className="h-11 w-full rounded-2xl border border-white/10 bg-black/35 pl-10 pr-4 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-emerald-300/40"
                  />
                </div>
                <Button onClick={addCapture} className="h-11 rounded-2xl bg-white px-4 text-black hover:bg-slate-200"><Zap className="mr-2 inline h-4 w-4" />Capture</Button>
              </div>
            </GlassCard>

            {visible("Habits") && (
              <GlassCard>
                <SectionLabel number="05" title="Habits" right={`${completedHabits}/${habits.length}`} />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {habits.map((habit) => (
                    <button
                      key={habit.id}
                      onClick={() => setHabits((prev) => prev.map((h) => h.id === habit.id ? { ...h, done: !h.done } : h))}
                      className={`rounded-2xl border border-white/10 p-4 text-left transition ${habit.done ? "bg-emerald-400/10" : "bg-black/25 hover:bg-white/[0.05]"}`}
                    >
                      <div className="flex items-center justify-between"><Check className={`h-4 w-4 ${habit.done ? "text-emerald-300" : "text-slate-600"}`} /><span className="text-xs text-slate-600">+1</span></div>
                      <p className={`mt-4 text-sm font-medium ${habit.done ? "text-emerald-100" : "text-slate-200"}`}>{habit.title}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">{habit.meta}</p>
                    </button>
                  ))}
                </div>
              </GlassCard>
            )}

            <GlassCard>
              <SectionLabel number="06" title="Active Projects" right="3" />
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.name} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div><h3 className="font-medium text-slate-100">{project.name}</h3><p className="text-xs uppercase tracking-[0.18em] text-slate-500">{project.type}</p></div>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-slate-400">{project.status}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-emerald-300/70" style={{ width: `${project.progress}%` }} /></div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {visible("Calendar") && (
              <GlassCard>
                <SectionLabel number="07" title="Smart Calendar" right="Flexible engine" />
                <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
                    <div key={day} className={`rounded-xl border p-3 ${idx === 3 ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-200" : "border-white/10 bg-black/20"}`}>
                      <p>{day}</p><p className="mt-1 text-lg text-slate-200">{idx + 1}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_120px_auto]">
                  <input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Add event, e.g. Client session" className="h-10 rounded-xl border border-white/10 bg-black/35 px-3 text-sm outline-none placeholder:text-slate-600" />
                  <input value={eventTime} onChange={(e) => setEventTime(e.target.value)} placeholder="12:00 PM" className="h-10 rounded-xl border border-white/10 bg-black/35 px-3 text-sm outline-none placeholder:text-slate-600" />
                  <Button onClick={addCalendarEvent} className="h-10 rounded-xl bg-white px-4 text-sm font-semibold text-black">Add</Button>
                </div>
                <Button onClick={simulateSmartReschedule} className="mt-3 w-full rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm text-emerald-100 hover:bg-emerald-300/15">
                  Demo smart reschedule: add 12:00 client session and move training back
                </Button>
                <div className="mt-4 space-y-2">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-slate-300">
                      <CalendarDays className="h-4 w-4 text-emerald-300" />
                      <div className="min-w-0 flex-1"><p className="truncate">{event.start}–{event.end} · {event.title}</p><p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{event.type}{event.recurring ? ` · ${event.recurring}` : ""}</p></div>
                      <button onClick={() => setEvents((prev) => prev.filter((item) => item.id !== event.id))} className="text-slate-600 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </section>

          <section className="space-y-4">
            {visible("AI Worker") && (
              <GlassCard>
                <SectionLabel number="08" title="AI Worker" right="Nova" />
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300 text-black"><Bot className="h-5 w-5" /></div>
                    <div><p className="font-semibold">Nova is standing by.</p><p className="text-xs text-slate-400">Next phase connects this to OpenAI, Telegram, and persistent memory.</p></div>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  {quickActions.map((action) => (
                    <button key={action} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.06]">
                      <span>{action}</span><ChevronRight className="h-4 w-4 text-slate-600" />
                    </button>
                  ))}
                </div>
              </GlassCard>
            )}

            <GlassCard>
              <SectionLabel number="09" title="Goals" right="Editable" />
              <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                <div className="mb-2 flex items-center gap-2 text-sm"><Target className="h-4 w-4 text-emerald-300" /> This Week</div>
                <div className="flex gap-2"><input value={goal} onChange={(e) => setGoal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addGoal()} placeholder="Add a weekly goal" className="h-9 flex-1 rounded-xl border border-white/10 bg-black/40 px-3 text-sm outline-none placeholder:text-slate-600" /><Button onClick={addGoal} className="h-9 w-9 rounded-xl bg-white text-black"><Plus className="mx-auto h-4 w-4" /></Button></div>
              </div>
              <div className="mt-3 space-y-2">
                {goals.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-emerald-400/10 p-3 text-sm text-emerald-100">
                    <span className="flex-1">{item.title}</span>
                    <button onClick={() => setGoals((prev) => prev.filter((g) => g.id !== item.id))} className="text-slate-500 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <SectionLabel number="10" title="Modules" right="Show / Hide" />
              <div className="space-y-2">
                {modules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3 text-sm text-slate-300">
                    <span>{module.label}</span>
                    <button
                      onClick={() => setModules((prev) => prev.map((item) => item.id === module.id ? { ...item, visible: !item.visible } : item))}
                      className={`rounded-full px-3 py-1 text-xs ${module.visible ? "bg-emerald-300 text-black" : "bg-white/10 text-slate-400"}`}
                    >
                      {module.visible ? "On" : "Off"}
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <SectionLabel number="11" title="Command Search" right="⌘K" />
              <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" /><input placeholder="Search projects, clients, notes..." className="h-11 w-full rounded-2xl border border-white/10 bg-black/35 pl-10 pr-3 text-sm outline-none placeholder:text-slate-600" /></div>
            </GlassCard>
          </section>
        </main>
      </div>
    </div>
  );
}
