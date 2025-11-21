import { Calendar, Clock } from "lucide-react";

interface ScheduleTimelineProps {
    selectedRoom: string | null;
}

const mockSchedule = [
    {
        day: "Monday",
        time: "08:00 - 10:00",
        course: "Data Structures",
        lecturer: "Dr. Johnson",
    },
    {
        day: "Monday",
        time: "14:00 - 16:00",
        course: "Algorithms",
        lecturer: "Prof. Chen",
    },
    {
        day: "Tuesday",
        time: "10:00 - 12:00",
        course: "Database Systems",
        lecturer: "Dr. Williams",
    },
    {
        day: "Wednesday",
        time: "09:00 - 11:00",
        course: "Software Engineering",
        lecturer: "Dr. Brown",
    },
    {
        day: "Thursday",
        time: "13:00 - 15:00",
        course: "Computer Networks",
        lecturer: "Prof. Davis",
    },
    {
        day: "Friday",
        time: "11:00 - 13:00",
        course: "Web Development",
        lecturer: "Dr. Martinez",
    },
];

const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
];

export function ScheduleTimeline({ selectedRoom }: ScheduleTimelineProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-gray-900">Room Schedule</h3>
            </div>

            {!selectedRoom ? (
                <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                        Select a room to view its schedule
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                            Viewing schedule for:
                        </p>
                        <p className="text-blue-900">{selectedRoom}</p>
                    </div>

                    {/* Weekly Timeline */}
                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        <h4 className="text-sm text-gray-700">
                            This Week's Bookings
                        </h4>

                        {mockSchedule.map((booking, index) => (
                            <div
                                key={index}
                                className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-600"
                            >
                                <div className="flex items-start justify-between mb-1">
                                    <p className="text-gray-900">
                                        {booking.day}
                                    </p>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Clock className="w-3 h-3" />
                                        <p className="text-sm">
                                            {booking.time}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700">
                                    {booking.course}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {booking.lecturer}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Time Grid Visualization */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-sm text-gray-700 mb-3">
                            Today's Timeline
                        </h4>
                        <div className="space-y-1">
                            {timeSlots.map((time) => {
                                const isOccupied =
                                    time === "08:00" ||
                                    time === "14:00" ||
                                    time === "15:00";
                                return (
                                    <div
                                        key={time}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-xs text-gray-500 w-12">
                                            {time}
                                        </span>
                                        <div
                                            className={`flex-1 h-8 rounded ${
                                                isOccupied
                                                    ? "bg-blue-200 border border-blue-300"
                                                    : "bg-gray-100"
                                            }`}
                                        ></div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-200 border border-blue-300 rounded"></div>
                                <span className="text-gray-600">Occupied</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                                <span className="text-gray-600">Available</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
