import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Calendar,
    Banknote,
    Settings,
    ChevronLeft,
    Hexagon,
    Building2,
    Shield,
    KeyRound
} from "lucide-react";

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/directory", label: "Directory", icon: Users },
    { to: "/admin/users", label: "Users Mgt", icon: Users },
    { to: "/admin/companies", label: "Companies", icon: Building2 },
    { to: "/admin/roles", label: "Roles", icon: Shield },
    { to: "/admin/permissions", label: "Permissions", icon: KeyRound },
    { to: "/admin/attendance", label: "Attendance", icon: Calendar },
    { to: "/admin/payroll", label: "Payroll", icon: Banknote },
    { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const location = useLocation();

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-sidebar text-white flex flex-col transition-all duration-300 z-40 ${isCollapsed ? "w-[68px]" : "w-64"
                }`}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 h-20 border-b border-white/5">
                <div className="flex items-center justify-center text-primary-500">
                    <Hexagon className="w-8 h-8 fill-primary-500 text-primary-500" />
                </div>
                {!isCollapsed && (
                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight whitespace-nowrap text-white">
                            Nexus HR
                        </span>
                        <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                            Admin Portal
                        </span>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 space-y-2 px-4 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    // Dashboard is active only exactly at /admin or /admin/
                    const isActive =
                        item.to === "/admin"
                            ? location.pathname === "/admin" || location.pathname === "/admin/"
                            : location.pathname.startsWith(item.to);

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                ? "bg-primary-500 text-black shadow-lg shadow-primary-500/20"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-black" : "text-slate-400 group-hover:text-primary-500 transition-colors"}`} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            {/* User Profile at bottom */}
            {!isCollapsed && (
                <div className="p-4 mx-4 mb-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-bold">
                        JR
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold truncate text-white">James Ross</span>
                        <span className="text-xs text-slate-400 truncate">HR Manager</span>
                    </div>
                </div>
            )}

            {/* Collapse toggle */}
            <div className="p-3 border-t border-white/5 flex justify-end">
                <button
                    onClick={onToggle}
                    className="flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                    title={isCollapsed ? "Expand" : "Collapse"}
                >
                    <ChevronLeft
                        className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""
                            }`}
                    />
                </button>
            </div>
        </aside>
    );
}
