import { Search, Plus, Filter, LayoutGrid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EmployeeDirectory() {
    const employees = [
        { id: "EMP-0042", name: "Sarah Jenkins", email: "sarah.j@nexus.com", dept: "Engineering", role: "Senior Backend Dev", status: "Active", isOnline: true },
        { id: "EMP-0089", name: "Michael Chen", email: "michael.c@nexus.com", dept: "Product", role: "Product Manager", status: "Active", isOnline: true },
        { id: "EMP-0102", name: "Emily Davis", email: "emily.d@nexus.com", dept: "Marketing", role: "Brand Specialist", status: "On Leave", isOnline: false },
        { id: "EMP-0156", name: "David Wilson", email: "david.w@nexus.com", dept: "Sales", role: "Account Executive", status: "Active", isOnline: false },
        { id: "EMP-0201", name: "Jessica Lee", email: "jessica.l@nexus.com", dept: "Engineering", role: "Frontend Developer", status: "Active", isOnline: true },
    ];

    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <style>{`.glass-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1rem; backdrop-filter: blur(10px); }`}</style>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Employee Directory</h2>
                    <p className="text-slate-400">Manage your team, track roles, and update employee statuses efficiently.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-black font-semibold rounded-full transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Employee
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                    { title: "TOTAL EMPLOYEES", count: "142", sub: "+12% from last month", textCol: "text-primary-500" },
                    { title: "ACTIVE NOW", count: "120", sub: "Currently clocked in", textCol: "text-slate-400" },
                    { title: "ON LEAVE", count: "22", sub: "Returning next week: 4", textCol: "text-amber-500" }
                ].map((s, i) => (
                    <div key={i} className="glass-card p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <UsersIcon className={`w-4 h-4 ${s.textCol}`} />
                            <h3 className="text-xs font-bold text-slate-400 tracking-wider">{s.title}</h3>
                        </div>
                        <p className="text-4xl font-bold text-white mb-2">{s.count}</p>
                        <p className={`text-xs ${s.textCol === 'text-primary-500' ? 'text-primary-500' : 'text-slate-500'}`}>{s.sub}</p>
                    </div>
                ))}
            </div>

            <div className="glass-card flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3 w-full sm:w-1/2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search by name, ID, or role..." className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-slate-500" />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="px-4 py-2 text-sm text-white bg-white/5 hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors border border-white/5">
                        Department <Filter className="w-3 h-3" />
                    </button>
                    <button className="px-4 py-2 text-sm text-white bg-white/5 hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors border border-white/5">
                        Location <Filter className="w-3 h-3" />
                    </button>
                    <div className="flex items-center bg-white/5 rounded-lg border border-white/5 p-1">
                        <button className="p-2 rounded-md bg-white/10 text-white"><List className="w-4 h-4" /></button>
                        <button className="p-2 rounded-md hover:bg-white/5 text-slate-400"><LayoutGrid className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-xs font-semibold tracking-wide text-slate-400">
                            <th className="p-4 pl-6">Employee Name</th>
                            <th className="p-4">Department</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {employees.map((emp) => (
                            <tr 
                                key={emp.id} 
                                onClick={() => navigate(`/admin/employees/${emp.id}`)}
                                className="hover:bg-white/5 transition-colors group cursor-pointer"
                            >
                                <td className="p-4 pl-6 flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden shrink-0">
                                            <img src={`https://ui-avatars.com/api/?name=${emp.name}&background=random`} alt={emp.name} />
                                        </div>
                                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#111812] ${emp.isOnline ? 'bg-primary-500' : 'bg-slate-500'}`}></span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white group-hover:text-primary-500 transition-colors">{emp.name}</p>
                                        <p className="text-xs text-slate-500">{emp.email} • {emp.id}</p>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-300">{emp.dept}</td>
                                <td className="p-4 text-sm text-slate-300">{emp.role}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${emp.status === 'Active' ? 'bg-primary-500/10 text-primary-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-primary-500' : 'bg-amber-500'}`}></span>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-slate-500 hover:text-white p-1 rounded hover:bg-white/10 transition-colors">
                                        •••
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-slate-400">
                    <p>Showing <span className="text-white font-medium">1-5</span> of <span className="text-white font-medium">142</span> employees</p>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-slate-500">&lt;</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500 text-black font-bold">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5">3</button>
                        <span className="px-2">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-slate-500">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UsersIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )
}

export const Component = EmployeeDirectory;
