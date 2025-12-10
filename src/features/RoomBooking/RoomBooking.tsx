import { useState, useEffect } from "react";
import { BookingForm } from "./BookingForm";
import { ScheduleTimeline } from "./ScheduleTimeline";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../services/checkToken";

export default function RoomBooking() {
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthorization = async () => {
          const token = localStorage.getItem("accessToken");
    
          if (!token) {
            navigate("/log-in");
            return;
          }
    
          if (isTokenExpired(token)) {
            try {
              const res = await fetch("http://localhost:3000/api/auth/refresh", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({refreshToken: localStorage.getItem("refreshToken")}),
              })
    
              if (!res.ok) {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                navigate("/log-in");
                return;
              }
    
              const data = await res.json();
              localStorage.setItem("accessToken", data.accessToken);
              localStorage.setItem("refreshToken", data.refreshToken);
            } catch (err) {
              navigate("log-in");
            }
          } else {
            const userString = localStorage.getItem("user");
            if ( !userString ) {
                return;
            }

            const user = JSON.parse(userString);
            if (user.role === "student") {
                navigate("/calendar-check");
            }
          }
        }
    
        checkAuthorization();
      }, [navigate]);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold mb-6 text-blue-900">
                            Register New Class / Book a Room
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <BookingForm onRoomSelect={setSelectedRoom} />
                            </div>

                            <div className="lg:col-span-1">
                                <ScheduleTimeline selectedRoom={selectedRoom} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
