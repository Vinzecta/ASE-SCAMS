import {
    LayoutDashboard,
    Calendar,
    DoorOpen,
    MonitorPlay,
    FileText,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: DoorOpen, label: "Book a room", path: "/schedule" },
];

export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside className="w-64 bg-blue-900 text-white flex flex-col h-full">
            <div className="p-6 border-b border-blue-800">
                <h3 className="font-bold text-lg text-white">SCAMS</h3>
                <p className="text-sm text-blue-200">Lecturer Portal</p>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={item.label}>
                                <button
                                    onClick={() => navigate(item.path)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive
                                            ? "bg-blue-700 text-white" // Khi đang chọn
                                            : "text-blue-100 hover:bg-blue-800" // Khi bình thường
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-blue-800">
                <p className="text-sm text-blue-200">© 2025 SCAMS</p>
            </div>
        </aside>
    );
}
