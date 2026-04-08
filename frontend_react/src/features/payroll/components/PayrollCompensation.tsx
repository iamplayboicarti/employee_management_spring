import { useState } from "react";

export function PayrollCompensation() {
    const [filter, setFilter] = useState("All");

    const tableData = [
        { name: "Jane Doe", id: "EMP-001", r: "Software Engineer", b: "$8,000.00", d: "-$1,200.00", bonus: "+$500.00", net: "$7,300.00", stat: "Paid" },
        { name: "John Smith", id: "EMP-042", r: "Product Manager", b: "$9,500.00", d: "-$1,800.00", bonus: "$0.00", net: "$7,700.00", stat: "Processing" },
        { name: "Emily Chen", id: "EMP-009", r: "UX Designer", b: "$7,200.00", d: "-$1,100.00", bonus: "+$300.00", net: "$6,400.00", stat: "Paid" },
        { name: "Michael Brown", id: "EMP-112", r: "Sales Lead", b: "$6,800.00", d: "-$900.00", bonus: "+$1,500.00", net: "$7,400.00", stat: "Processing" },
    ];

    const filteredData = tableData.filter(r => filter === "All" || (filter === "Paid" && r.stat === "Paid") || (filter === "Pending" && r.stat === "Processing"));
    return (
        <div className="space-y-6">
            <style>{`.glass-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1rem; backdrop-filter: blur(10px); }`}</style>
            
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold text-white">Payroll & Compensation</h2>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-500 rounded-full text-xs font-bold border border-primary-500/20">OCT 2023</span>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm flex items-center gap-2">
                    October 2023
                </button>
            </div>
            
            <p className="text-slate-400 mb-6">Manage monthly salaries, process pending payments, and review compensation analytics for your organization.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { title: "TOTAL PAYROLL COST", val: "$142,500", sub: "vs last month ($139,024)", badge: "+2.5%" },
                    { title: "PENDING PAYMENTS", val: "$12,800", sub: "4 Employees", dot: "bg-amber-500" },
                    { title: "TOTAL DEDUCTIONS", val: "$22,400", sub: "15.7% of total gross", subRight: "Taxes & Benefits" },
                    { title: "PROCESSED", val: "142", outOf: "/156", progress: "91%" },
                ].map((c, i) => (
                    <div key={i} className="glass-card p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xs font-bold text-slate-400 tracking-wider flex items-center gap-2">
                                {c.title}
                            </h3>
                            {c.dot && <span className={`w-2 h-2 rounded-full ${c.dot}`}></span>}
                        </div>
                        <div className="flex items-end gap-3 mb-2">
                            <p className="text-3xl font-bold text-white">{c.val} {c.outOf && <span className="text-xl text-slate-500">{c.outOf}</span>}</p>
                            {c.badge && <span className="text-xs font-bold text-primary-500 mb-1">{c.badge}</span>}
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-slate-500">{c.sub}</p>
                            {c.subRight && <p className="text-[10px] text-slate-400">{c.subRight}</p>}
                        </div>
                        {c.progress && (
                            <div className="w-full bg-slate-800 h-1.5 mt-4 rounded-full overflow-hidden">
                                <div className="bg-primary-500 h-full" style={{width: c.progress}}></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="glass-card mt-6">
                <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5">
                    <div className="flex items-center gap-2 sm:gap-6 bg-white/5 p-1 rounded-full border border-white/10">
                        <button onClick={() => setFilter("All")} className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${filter === 'All' ? 'bg-primary-500 text-black' : 'text-slate-400 hover:text-white'}`}>All Employees</button>
                        <button onClick={() => setFilter("Pending")} className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${filter === 'Pending' ? 'bg-primary-500 text-black' : 'text-slate-400 hover:text-white'}`}>Pending</button>
                        <button onClick={() => setFilter("Paid")} className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${filter === 'Paid' ? 'bg-primary-500 text-black' : 'text-slate-400 hover:text-white'}`}>Paid</button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-sm text-slate-300 px-4 py-2 hover:text-white border border-white/10 rounded-lg">Export Excel</button>
                        <button className="text-sm text-black px-5 py-2 font-semibold bg-primary-500 hover:bg-primary-600 rounded-lg shadow-lg shadow-primary-500/20 transition-all">Process Payroll</button>
                    </div>
                </div>
                
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                            <th className="p-4 pl-6">Employee</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Base Salary</th>
                            <th className="p-4">Deductions</th>
                            <th className="p-4">Bonuses</th>
                            <th className="p-4">Net Pay</th>
                            <th className="p-4 pl-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                        {filteredData.map((row, i) => (
                            <tr key={i} className="hover:bg-white/5">
                                <td className="p-4 pl-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-slate-700"></div>
                                        <div><p className="font-semibold text-white">{row.name}</p><p className="text-[10px] text-slate-500">{row.id}</p></div>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-300">{row.r}</td>
                                <td className="p-4 text-slate-300">{row.b}</td>
                                <td className="p-4 text-red-400">{row.d}</td>
                                <td className="p-4 text-primary-500">{row.bonus}</td>
                                <td className="p-4 font-bold text-white">{row.net}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded text-xs font-bold ${row.stat === 'Paid' ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>{row.stat}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export const Component = PayrollCompensation;
