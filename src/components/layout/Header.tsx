// import { Bell, User } from "lucide-react";

// export function Header() {
//     return (
//         <header className="bg-white border-b border-gray-200 px-6 py-4">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h2 className="text-blue-900">SCAMS Dashboard</h2>
//                     <p className="text-gray-600 text-sm">
//                         Smart Campus Management System
//                     </p>
//                 </div>

//                 <div className="flex items-center gap-4">
//                     <button className="relative p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
//                         <Bell className="w-5 h-5" />
//                         <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//                     </button>

//                     <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
//                         <div className="text-right">
//                             <p className="text-gray-900">Dr. Sarah Mitchell</p>
//                             <p className="text-sm text-gray-600">
//                                 Faculty of Engineering
//                             </p>
//                         </div>
//                         <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//                             <User className="w-5 h-5 text-white" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

import { Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;



    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
        navigate("/log-in");
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-blue-900">SCAMS Dashboard</h2>
                    <p className="text-gray-600 text-sm">
                        Smart Campus Management System
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="text-right">
                            <p className="text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">
                                Faculty of Engineering
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        {/* Nút Logout */}
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

