import { useState } from "react";
import { MessageSquare, Mail, MapPin, Edit, Phone, Building, Briefcase, FileText, BadgeDollarSign } from "lucide-react";

export function EmployeeProfile() {
    const [activeTab, setActiveTab] = useState("personal");
    return (
        <div className="space-y-6">
            <style>{`.glass-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1.5rem; backdrop-filter: blur(10px); }`}</style>
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                        <span>Employees</span> <span className="text-slate-600">/</span> <span className="text-white">Alex Johnson</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Employee Profile</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full border border-white/10 hover:bg-white/5 text-slate-400 flex justify-center items-center">
                        ...
                    </button>
                    <button className="px-6 py-2 rounded-full bg-primary-500 hover:bg-primary-600 text-black font-semibold flex items-center gap-2 transition-colors">
                        <Edit className="w-4 h-4" /> Edit Profile
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-card p-8 flex flex-col items-center text-center relative">
                        <div className="w-24 h-24 rounded-full bg-slate-700 mb-4 p-1">
                            <img src="https://ui-avatars.com/api/?name=Alex+Johnson&background=111812&color=fff&size=100" alt="Alex Johnson" className="rounded-full w-full h-full object-cover" />
                        </div>
                        <span className="absolute top-1/2 mt-1 -ml-8 w-3.5 h-3.5 bg-primary-500 border-2 border-[#1a221c] rounded-full"></span>
                        
                        <h3 className="text-2xl font-bold text-white mb-1">Alex Johnson</h3>
                        <p className="text-slate-400 text-sm mb-4">Senior Product Designer</p>
                        <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20 text-xs font-bold mb-6">
                            ● ACTIVE
                        </span>

                        <div className="flex gap-3 w-full mb-8">
                            <button className="flex-1 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                                <MessageSquare className="w-4 h-4" /> Message
                            </button>
                            <button className="flex-1 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                                <Mail className="w-4 h-4" /> Email
                            </button>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="flex-1 border border-white/10 rounded-2xl p-4 flex flex-col items-center bg-white/5">
                                <p className="text-2xl font-bold text-white">4.5</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Years Tenure</p>
                            </div>
                            <div className="flex-1 border border-white/10 rounded-2xl p-4 flex flex-col items-center bg-white/5">
                                <p className="text-2xl font-bold text-white">L4</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Level</p>
                            </div>
                        </div>
                        <div className="w-full border border-white/10 rounded-2xl p-4 mt-4 bg-white/5 text-center">
                            <p className="text-lg font-bold text-white">Design</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Department</p>
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">Contact Info</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-0.5">Phone</p>
                                    <p className="text-sm text-white">+1 (555) 012-3456</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-0.5">Email</p>
                                    <p className="text-sm text-white">alex.johnson@company.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0">
                                    <Building className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-0.5">Office</p>
                                    <p className="text-sm text-white">San Francisco HQ, Floor 4</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="lg:col-span-8 flex flex-col space-y-6">
                    <div className="flex gap-2 p-1 bg-white/5 rounded-full w-fit">
                        <button 
                            onClick={() => setActiveTab('personal')}
                            className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors ${activeTab === 'personal' ? 'bg-primary-500 text-black' : 'text-slate-400 hover:text-white'}`}>
                            Personal Info
                        </button>
                        <button 
                            onClick={() => setActiveTab('employment')}
                            className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors ${activeTab === 'employment' ? 'bg-primary-500 text-black' : 'text-slate-400 hover:text-white'}`}>
                            Employment
                        </button>
                        <button 
                            onClick={() => setActiveTab('documents')}
                            className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors ${activeTab === 'documents' ? 'bg-primary-500 text-black' : 'text-slate-400 hover:text-white'}`}>
                            Documents <span className="ml-1 bg-slate-700 text-[10px] px-1.5 py-0.5 rounded-full">3</span>
                        </button>
                        <button 
                            onClick={() => setActiveTab('salary')}
                            className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors ${activeTab === 'salary' ? 'bg-primary-500 text-black' : 'text-slate-400 hover:text-white'}`}>
                            Salary & Benefits
                        </button>
                    </div>

                    {/* TAB: PERSONAL INFO */}
                    {activeTab === 'personal' && (
                        <div className="space-y-6">

                    <div className="glass-card p-6 border-transparent">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-3 text-primary-500"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg> <span className="text-white">Identity Details</span></h3>
                            <button className="text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Full Legal Name</p>
                                <p className="text-sm text-white font-medium">Alex James<br/>Johnson</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Date of Birth</p>
                                <p className="text-sm text-white font-medium">Oct 24, 1990</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Gender</p>
                                <p className="text-sm text-white font-medium">Male</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Marital Status</p>
                                <p className="text-sm text-white font-medium">Single</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Nationality</p>
                                <p className="text-sm text-white font-medium flex items-center gap-2">🇺🇸 American</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">SSN / ID</p>
                                <p className="text-sm text-white font-medium tracking-widest">***-**-4589</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 border-transparent">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-3 text-primary-500"><MapPin className="w-5 h-5" /> <span className="text-white">Address & Emergency</span></h3>
                            <button className="text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Street Address</p>
                                <p className="text-sm text-white font-medium">1289 Innovation Drive, Apt 402</p>
                            </div>
                            <div></div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">City</p>
                                <p className="text-sm text-white font-medium">San Francisco</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">State / Province</p>
                                <p className="text-sm text-white font-medium">California</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Postal Code</p>
                                <p className="text-sm text-white font-medium">94107</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Country</p>
                                <p className="text-sm text-white font-medium">United States</p>
                            </div>
                        </div>

                        <div className="border-t border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Emergency Contact</p>
                                <p className="text-sm text-white font-medium">Martha Johnson (Mother)</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Emergency Phone</p>
                                <p className="text-sm text-white font-medium">+1 (555) 987-6543</p>
                            </div>
                        </div>
                    </div>
                        </div>
                    )}

                    {/* TAB: EMPLOYMENT */}
                    {activeTab === 'employment' && (
                        <div className="glass-card p-6 border-transparent flex flex-col items-center justify-center py-20">
                            <Briefcase className="w-12 h-12 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Employment History</h3>
                            <p className="text-slate-400 text-sm">Detailed employment records and performance reviews will appear here.</p>
                        </div>
                    )}

                    {/* TAB: DOCUMENTS */}
                    {activeTab === 'documents' && (
                        <div className="glass-card p-6 border-transparent flex flex-col items-center justify-center py-20">
                            <FileText className="w-12 h-12 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Employee Documents</h3>
                            <p className="text-slate-400 text-sm">Contracts, NDAs, and onboarding files will appear here.</p>
                        </div>
                    )}

                    {/* TAB: SALARY */}
                    {activeTab === 'salary' && (
                        <div className="glass-card p-6 border-transparent flex flex-col items-center justify-center py-20">
                            <BadgeDollarSign className="w-12 h-12 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Salary & Benefits</h3>
                            <p className="text-slate-400 text-sm">Payroll history, direct deposit info, and health benefits will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export const Component = EmployeeProfile;
