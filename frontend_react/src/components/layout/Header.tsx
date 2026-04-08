import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu, User, Home, Search, Bell } from "lucide-react";
import { useAuthStore } from "@/features/auth/store";
import { useLogout } from "@/features/auth/hooks/useLogout";

interface HeaderProps {
    onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
    const user = useAuthStore((s) => s.user);
    const logout = useLogout();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Simple breadcrumb/title logic
    const getPageTitle = () => {
        if (location.pathname === "/admin" || location.pathname === "/admin/") return "Dashboard Overview";
        if (location.pathname.startsWith("/admin/directory")) return "Employee Directory";
        if (location.pathname.startsWith("/admin/attendance")) return "Attendance Management";
        if (location.pathname.startsWith("/admin/payroll")) return "Payroll & Compensation";
        if (location.pathname.startsWith("/admin/employees")) return "Employee Profile";
        
        // default fallback
        const parts = location.pathname.split("/").filter(Boolean);
        const lastPart = parts[parts.length - 1];
        if (!lastPart) return "Dashboard";
        return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
    }

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-8 bg-[#111812]/90 backdrop-blur-md border-b border-white/5">
            {/* Left: mobile toggle & Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuToggle}
                    className="p-2 -ml-2 rounded-lg hover:bg-white/5 lg:hidden transition-colors"
                >
                    <Menu className="w-5 h-5 text-slate-400" />
                </button>
                <h1 className="text-xl font-bold text-white hidden sm:block">
                    {getPageTitle()}
                </h1>
            </div>

            {/* Right: Search, Notifications, Profile */}
            <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="hidden md:flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-full focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
                    <Search className="w-4 h-4 text-slate-400 mr-2" />
                    <input 
                        type="text" 
                        placeholder="Search employees, reports..." 
                        className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-64"
                    />
                </div>

                {/* Notification Bell */}
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500 border-2 border-[#111812]"></span>
                </button>

                {/* Profile Dropdown */}
                <div ref={ref} className="relative">
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="flex items-center gap-2 rounded-full focus:outline-none"
                    >
                        <div className="w-9 h-9 rounded-full bg-white/10 text-primary-500 flex items-center justify-center font-bold">
                            <User className="w-4 h-4" />
                        </div>
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#16201a] shadow-xl py-1 z-50">
                            <div className="px-4 py-3 border-b border-white/10">
                                <p className="text-sm font-medium text-white leading-tight">
                                    {user?.name ?? "Admin User"}
                                </p>
                                <p className="text-xs text-slate-400 mt-1 truncate">
                                    {user?.email ?? "admin@nexus.hr"}
                                </p>
                            </div>
                            <div className="py-1">
                                <Link
                                    to="/"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    <Home className="w-4 h-4 text-slate-400" />
                                    Back to Home
                                </Link>
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        logout.mutate();
                                    }}
                                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
