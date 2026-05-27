import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Circle,
  Command,
  Dumbbell,
  FileText,
  Flame,
  Globe2,
  Home,
  LayoutDashboard,
  MessageSquareText,
  Plus,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", icon: Home },
  { label: "CRM", icon: Users },
  { label: "Brain", icon: Bot },
  { label: "Websites", icon: Globe2 },
  { label: "Fitness", icon: Dumbbell },
  { label: "Finance", icon: Wallet },
  { label: "Journal", icon: FileText },
];

const tasks = [
  { title: "Finish 413 Physiques homepage polish", tag: "websites", priority: "+5" },
  { title: "Follow up with website lead", tag: "sales", priority: "+3" },
  { title: "Build Zane session notes", tag: "fitness", priority: "+2" },
  { title: "Outline Romans study questions", tag: "bible", priority: "+2" },
  { title: "Review trading journal", tag: "finance", priority: "+1" },
];

const habits = [
  { title: "Bible + prayer", meta: "spirit · 0/1" },
  { title: "Gym / cardio", meta: "body · 0/1" },
  { title: "Client outreach", meta: "business · 0/5" },
  { title: "Deep work block", meta: "focus · 0/2 hr" },
  { title: "Read / study", meta: "mind · 0/30 min" },
  { title: "Night journal", meta: "reset · 0/1" },
];

const projects = [
  { name: "413 Physiques", type: "Client Website", status: "Active", progress: 72 },
  { name: "Personal Training", type: "Client Programs", status: "Building", progress: 48 },
  { name: "Nova OS", type: "AI Worker App", status: "MVP", progress: 18 },
  { name: "Trading System", type: "MES / NQ", status: "Review", progress: 55 },
];

const quickActions = [
  "Write client text",
  "Build workout plan",
  "Audit a website",
  "Create proposal",
  "Plan my day",
  "Generate content ideas",
];

function GlassCard({ children, className = "" }) {
  return (
    <Card className={`border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30 backdrop-blur-xl ${className}`}>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
}

function SectionLabel({ number, title, right }) {
  return (
    <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-slate-500">
      <span>// {number} // {title}</span>
      {right && <span className="text-slate-400">{right}</span>}
    </div>
  );
}

export default function NovaOSDashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [capture, setCapture] = useState("");

  const today = useMemo(() => {
    return new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }, []);

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
              <div className="text-xs uppercase tracking-[0.34em] text-slate-500">Nova OS // v0</div>
              <div className="text-sm text-slate-300">Personal AI Worker Command Center</div>
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
            <Button size="sm" variant="ghost" className="h-8 rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-slate-200 hover:bg-white/10">
              Export
            </Button>
            <Button size="sm" className="h-8 rounded-xl bg-emerald-400/90 px-3 text-xs font-semibold text-black hover:bg-emerald-300">
              Demo On
            </Button>
            <span className="hidden sm:inline">{today}</span>
          </div>
        </motion.header>

        <main className="grid flex-1 grid-cols-1 gap-4 xl:grid-cols-[300px_1fr_330px]">
          <section className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
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
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Streak</div>
                    <div className="mt-2 flex items-end gap-1"><span className="text-2xl font-semibold">0</span><span className="pb-1 text-xs text-slate-500">days</span></div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Mode</div>
                    <div className="mt-2 flex items-center gap-2 text-sm"><Flame className="h-4 w-4 text-emerald-300" /> Execute</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <GlassCard>
                <SectionLabel number="02" title="Money Pulse" right="30D" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Monthly Goal</div>
                    <div className="mt-1 text-3xl font-semibold tracking-tight">$10,000</div>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">+0%</div>
                </div>
                <div className="mt-5 h-16 overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-2">
                  <svg viewBox="0 0 260 62" className="h-full w-full">
                    <path d="M0 48 C35 42 48 38 78 39 C113 40 113 27 148 26 C181 25 176 19 211 20 C237 21 244 13 260 12" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-300/70" />
                  </svg>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                    <p className="text-xs text-slate-500">Today</p>
                    <p className="mt-1 text-xl font-semibold">$0</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                    <p className="text-xs text-slate-500">Pipeline</p>
                    <p className="mt-1 text-xl font-semibold">$0</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <GlassCard>
                <SectionLabel number="03" title="Today · Key" right="+5" />
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <button key={task.title} className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-left transition hover:bg-white/[0.06]">
                      <Circle className="h-4 w-4 text-slate-600 group-hover:text-emerald-300" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-slate-200">{task.title}</p>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{task.tag}</p>
                      </div>
                      <span className="text-xs text-slate-500">{task.priority}</span>
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </section>

          <section className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="min-h-[150px]">
                <SectionLabel number="04" title="Session" right="Local" />
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Good afternoon, Josh.</h1>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-500">Command the day. Capture everything. Execute one thing at a time.</p>
                  </div>
                  <div className="text-left lg:text-right">
                    <div className="text-4xl font-semibold tabular-nums">13:17</div>
                    <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Local Time</div>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <Sparkles className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300" />
                    <input
                      value={capture}
                      onChange={(e) => setCapture(e.target.value)}
                      placeholder="Capture an idea, task, client note, or command..."
                      className="h-11 w-full rounded-2xl border border-white/10 bg-black/35 pl-10 pr-4 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-emerald-300/40"
                    />
                  </div>
                  <Button className="h-11 rounded-2xl bg-white text-black hover:bg-slate-200"><Zap className="mr-2 h-4 w-4" />Capture</Button>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <GlassCard>
                <SectionLabel number="05" title="Habits" right="0/6" />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {habits.map((habit) => (
                    <div key={habit.title} className="rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:bg-white/[0.05]">
                      <div className="flex items-center justify-between">
                        <CheckCircle2 className="h-4 w-4 text-slate-600" />
                        <span className="text-xs text-slate-600">+0</span>
                      </div>
                      <p className="mt-4 text-sm font-medium text-slate-200">{habit.title}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">{habit.meta}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <GlassCard>
                <SectionLabel number="06" title="Active Projects" right="4" />
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div key={project.name} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-medium text-slate-100">{project.name}</h3>
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{project.type}</p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-slate-400">{project.status}</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-emerald-300/70" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
              <GlassCard>
                <SectionLabel number="07" title="Calendar" right="This Week" />
                <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
                    <div key={day} className={`rounded-xl border p-3 ${idx === 4 ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-200" : "border-white/10 bg-black/20"}`}>
                      <p>{day}</p>
                      <p className="mt-1 text-lg text-slate-200">{idx + 1}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {["11:30 · Training session", "14:00 · Deep work", "19:00 · Bible study"].map((event) => (
                    <div key={event} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-slate-300">
                      <CalendarDays className="h-4 w-4 text-emerald-300" /> {event}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </section>

          <section className="space-y-4">
            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
              <GlassCard>
                <SectionLabel number="08" title="AI Worker" right="Nova" />
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300 text-black"><Bot className="h-5 w-5" /></div>
                    <div>
                      <p className="font-semibold">Nova is standing by.</p>
                      <p className="text-xs text-slate-400">Tell the system what to build, write, plan, or remember.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  {quickActions.map((action) => (
                    <button key={action} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.06]">
                      <span>{action}</span>
                      <ChevronRight className="h-4 w-4 text-slate-600" />
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <GlassCard>
                <SectionLabel number="09" title="Goals" right="2026" />
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                    <div className="mb-2 flex items-center gap-2 text-sm"><Target className="h-4 w-4 text-emerald-300" /> This Week</div>
                    <div className="flex gap-2"><input placeholder="Add a weekly goal" className="h-9 flex-1 rounded-xl border border-white/10 bg-black/40 px-3 text-sm outline-none placeholder:text-slate-600" /><Button size="icon" className="h-9 w-9 rounded-xl bg-white text-black"><Plus className="h-4 w-4" /></Button></div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                    <div className="mb-2 flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4 text-emerald-300" /> This Month</div>
                    <div className="flex gap-2"><input placeholder="Add a monthly goal" className="h-9 flex-1 rounded-xl border border-white/10 bg-black/40 px-3 text-sm outline-none placeholder:text-slate-600" /><Button size="icon" className="h-9 w-9 rounded-xl bg-white text-black"><Plus className="h-4 w-4" /></Button></div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <GlassCard>
                <SectionLabel number="10" title="Command Search" right="⌘K" />
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                  <input placeholder="Search projects, clients, notes..." className="h-11 w-full rounded-2xl border border-white/10 bg-black/35 pl-10 pr-3 text-sm outline-none placeholder:text-slate-600" />
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <GlassCard>
                <SectionLabel number="11" title="System Status" right="MVP" />
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center justify-between"><span>Frontend</span><span className="text-emerald-300">Ready</span></div>
                  <div className="flex items-center justify-between"><span>Mobile PWA</span><span>Next</span></div>
                  <div className="flex items-center justify-between"><span>Login / Database</span><span>Next</span></div>
                  <div className="flex items-center justify-between"><span>AI API</span><span>Next</span></div>
                </div>
              </GlassCard>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}
