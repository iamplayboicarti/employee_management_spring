import { Calendar, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export function AttendanceManagement() {
    return (
        <div className="space-y-6">
            <style>{`.glass-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1rem; backdrop-filter: blur(10px); }`}</style>
            
            <div className="flex justify-between items-end mb-6">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                        <span>Dashboard</span> <span className="text-slate-600">/</span> <span className="text-white">Attendance</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Overview</h2>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Oct 2023 
                    </button>
                    <button className="px-5 py-2 rounded-full bg-primary-500 text-black font-semibold text-sm flex items-center gap-2 hover:bg-primary-600 transition-colors">
                        + Request Leave
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: "Total Present", val: "42", outOf: "/45", badge: "+2%", icon: CheckCircle2, iColor: "text-primary-500" },
                    { label: "Late Arrivals", val: "3", badge: "Alert", badgeColor: "bg-amber-500/20 text-amber-500", icon: Clock, iColor: "text-amber-500" },
                    { label: "On Leave", val: "2", icon: Calendar, iColor: "text-blue-500" },
                    { label: "Pending Requests", val: "5", badge: "+2 new", badgeColor: "bg-purple-500/20 text-purple-400", icon: AlertTriangle, iColor: "text-purple-400" },
                ].map((s, i) => (
                    <div key={i} className="glass-card p-5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-full bg-white/5 ${s.iColor}`}>
                                <s.icon className="w-5 h-5" />
                            </div>
                            {s.badge && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${s.badgeColor || 'bg-primary-500/20 text-primary-500'}`}>
                                    {s.badge}
                                </span>
                            )}
                        </div>
                        <p className="text-sm font-medium text-slate-400 mb-1">{s.label}</p>
                        <p className="text-3xl font-bold text-white flex items-baseline gap-1">
                            {s.val} {s.outOf && <span className="text-sm text-slate-500 font-medium">{s.outOf}</span>}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">Team Schedule</h3>
                        <div className="flex bg-white/5 rounded-lg p-1 border border-white/5">
                            <button className="px-4 py-1 text-xs font-semibold rounded bg-primary-500 text-black">Week</button>
                            <button className="px-4 py-1 text-xs font-semibold rounded text-slate-400 hover:text-white">Month</button>
                        </div>
                    </div>
                    {/* Schedule Grid Placeholer */}
                    <div className="text-slate-400 text-sm flex flex-col gap-3">
                        <div className="grid grid-cols-4 border-b border-white/5 pb-2 font-semibold">
                            <div>EMPLOYEE</div><div>MON 23</div><div>TUE 24</div><div>WED 25</div>
                        </div>
                        {[
                            {n: "Sarah Jenkins", s1: "9:00 - 5:00", s2: "9:00 - 5:00", s3: "Late 9:30"},
                            {n: "Michael Chen", s1: "Vacation", s2: "Vacation", s3: "Vacation"},
                            {n: "Emily Davis", s1: "9:00 - 5:00", s2: "9:00 - 5:00", s3: "9:00 - 5:00"},
                            {n: "David Kim", s1: "Remote", s2: "Remote", s3: "Remote"}
                        ].map((row,i) =>(
                            <div key={i} className="grid grid-cols-4 items-center">
                                <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-700"></div><span className="text-white">{row.n}</span></div>
                                <div><span className={`px-2 py-1 rounded text-xs ${row.s1.includes('Vac') ? 'bg-blue-500/10 text-blue-400' : 'bg-primary-500/10 text-primary-500 border border-primary-500/20'}`}>{row.s1}</span></div>
                                <div><span className={`px-2 py-1 rounded text-xs ${row.s2.includes('Vac') ? 'bg-blue-500/10 text-blue-400' : 'bg-primary-500/10 text-primary-500 border border-primary-500/20'}`}>{row.s2}</span></div>
                                <div><span className={`px-2 py-1 rounded text-xs ${row.s3.includes('Vac') ? 'bg-blue-500/10 text-blue-400' : row.s3.includes('Late') ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-primary-500/10 text-primary-500 border border-primary-500/20'}`}>{row.s3}</span></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-white">Pending Requests</h3>
                        <span className="text-xs bg-primary-500/20 text-primary-500 px-2 py-0.5 rounded font-bold">5 New</span>
                    </div>
                    {/* Requests */}
                    {[
                        {n: "John Doe", role: "UI Designer", type: "SICK LEAVE", dates: "Oct 24 - Oct 26 (3 Days)", reason: "Flu symptoms, need rest", col: "text-purple-400 border-purple-500/20 bg-purple-500/10"},
                        {n: "Alice Smith", role: "Product Manager", type: "VACATION", dates: "Nov 10 - Nov 15 (5 Days)", reason: "Family trip planned", col: "text-blue-400 border-blue-500/20 bg-blue-500/10"}
                    ].map((req, i) => (
                        <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/5">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                                    <div><p className="text-sm font-bold text-white leading-tight">{req.n}</p><p className="text-[10px] text-slate-400">{req.role}</p></div>
                                </div>
                                <span className={`text-[9px] font-bold px-2 py-1 rounded border ${req.col}`}>{req.type}</span>
                            </div>
                            <div className="mb-4 text-xs">
                                <p className="text-white font-medium mb-1 flex items-center gap-1.5"><Calendar className="w-3 h-3 text-slate-400" /> {req.dates}</p>
                                <p className="text-slate-400 italic">"{req.reason}"</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-1.5 rounded-lg bg-primary-500 text-black font-semibold text-xs transition-colors hover:bg-primary-600">Approve</button>
                                <button className="flex-1 py-1.5 rounded-lg bg-white/5 text-white border border-white/10 font-semibold text-xs hover:bg-white/10 transition-colors">Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const Component = AttendanceManagement;
