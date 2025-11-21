import { useState } from "react";
import { BookingForm } from "./BookingForm";
import { ScheduleTimeline } from "./ScheduleTimeline";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/common/Sidebar";

export default function RoomBooking() {
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

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
