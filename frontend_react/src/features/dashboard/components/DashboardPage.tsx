import { Users, UserCheck, ClipboardList, Download, Gift, PartyPopper } from "lucide-react";
import { BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useDashboardStats } from "../hooks/useDashboardStats";

export function DashboardPage() {
    const { data: statsData, isLoading } = useDashboardStats();

    // Mock Data based on the UI screenshot
    const stats = [
        {
            label: "Total Employees",
            value: isLoading ? "..." : (statsData?.data.totalUsers ?? "1,240"),
            subtext: "+5% vs last month",
            subtextColor: "text-primary-500",
            icon: Users,
        },
        {
            label: "Present Today",
            value: "1,180",
            subtext: "95% Attendance",
            subtextColor: "text-primary-500",
            icon: UserCheck,
        },
        {
            label: "Pending Approvals",
            value: "12",
            subtext: "Requires immediate action",
            subtextColor: "text-slate-400",
            icon: ClipboardList,
            iconColor: "text-amber-500"
        },
    ];

    const chartData = [
        { name: "JAN", hires: 40 },
        { name: "FEB", hires: 50 },
        { name: "MAR", hires: 35 },
        { name: "APR", hires: 60 },
        { name: "MAY", hires: 95 },
        { name: "JUN", hires: 55 },
        { name: "JUL", hires: 65 },
        { name: "AUG", hires: 80 },
    ];

    return (
        <div className="space-y-6">
            <style>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 1rem;
                    backdrop-filter: blur(10px);
                }
            `}</style>
            
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="glass-card p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                                <Icon className={`w-5 h-5 ${stat.iconColor ? stat.iconColor : 'text-slate-400'}`} />
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                                <div className="flex items-center gap-1.5">
                                    {stat.subtextColor === 'text-primary-500' && (
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                    <p className={`text-xs ${stat.subtextColor}`}>{stat.subtext}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Chart Section */}
                <div className="lg:col-span-2 glass-card p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-lg font-bold text-white">Recruitment Trends</h2>
                            <p className="text-sm text-slate-400">New hires over the last 12 months</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 text-primary-500 text-xs font-medium hover:bg-primary-500/10 transition-colors">
                            Export Report
                            <Download className="w-3 h-3" />
                        </button>
                    </div>
                    
                    {/* Real Bar Chart */}
                    <div className="flex-1 mt-8 h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 'bold'}} dy={10} />
                                <Tooltip
                                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                    contentStyle={{backgroundColor: '#16201a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff'}}
                                    itemStyle={{color: '#22c55e', fontWeight: 'bold'}}
                                />
                                <Bar dataKey="hires" radius={[4, 4, 4, 4]}>
                                    {chartData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 4 ? '#22c55e' : 'rgba(22, 163, 74, 0.4)'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Side Cards */}
                <div className="space-y-5 flex flex-col">
                    {/* Upcoming Birthdays */}
                    <div className="glass-card p-5 flex-1">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-bold">Upcoming Birthdays</h3>
                            <button className="text-primary-500 text-xs hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Sarah Miller", date: "Oct 24", role: "UX Designer" },
                                { name: "James Kim", date: "Oct 26", role: "Product Manager" }
                            ].map((person, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                                            <img src={`https://ui-avatars.com/api/?name=${person.name}&background=random`} alt={person.name} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{person.name}</p>
                                            <p className="text-xs text-slate-400">{person.date} • {person.role}</p>
                                        </div>
                                    </div>
                                    <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-primary-500 transition-colors">
                                        <Gift className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Work Anniversaries */}
                    <div className="glass-card p-5 flex-1">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-bold">Work Anniversaries</h3>
                            <PartyPopper className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Elena Rodriguez", yrs: "5 YRS" },
                                { name: "Marcus Thorne", yrs: "10 YRS" }
                            ].map((person, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                                            <img src={`https://ui-avatars.com/api/?name=${person.name}&background=random`} alt={person.name} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{person.name}</p>
                                            <p className="text-xs text-slate-400">{person.yrs.split(' ')[0]} Years Service</p>
                                        </div>
                                    </div>
                                    <div className="px-2.5 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-bold text-primary-500">
                                        {person.yrs}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const Component = DashboardPage;
