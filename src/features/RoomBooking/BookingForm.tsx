import { useState } from "react";
import { Search, CheckCircle, AlertCircle } from "lucide-react";
interface BookingFormProps {
    onRoomSelect: (roomId: string | null) => void;
}

const buildings = ["H6", "A4", "B2", "C3", "D1"];
const roomTypes = ["Lecture Hall", "Lab", "Tutorial Room", "Seminar Room"];
const capacities = ["20-30", "31-50", "51-100", "100+"];

const rooms = [
    {
        id: "H6-101",
        name: "H6-101",
        type: "Lecture Hall",
        capacity: 80,
        building: "H6",
    },
    { id: "H6-201", name: "H6-201", type: "Lab", capacity: 40, building: "H6" },
    {
        id: "A4-305",
        name: "A4-305",
        type: "Tutorial Room",
        capacity: 25,
        building: "A4",
    },
    {
        id: "A4-101",
        name: "A4-101",
        type: "Lecture Hall",
        capacity: 120,
        building: "A4",
    },
];

const daysOfWeek = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
];

export function BookingForm({ onRoomSelect }: BookingFormProps) {
    const [building, setBuilding] = useState("");
    const [roomType, setRoomType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [purpose, setPurpose] = useState("");
    const [availabilityChecked, setAvailabilityChecked] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);

    const handleRoomChange = (roomId: string) => {
        setSelectedRoom(roomId);
        onRoomSelect(roomId);
        setAvailabilityChecked(false);
    };

    const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const checkAvailability = () => {
        setAvailabilityChecked(true);
        setIsAvailable(Math.random() > 0.3);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Booking request submitted successfully!");
    };

    const filteredRooms = rooms.filter((room) => {
        if (building && room.building !== building) return false;
        if (roomType && room.type !== roomType) return false;
        return true;
    });

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h3 className="text-gray-900 mb-4">Room Search Filter</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Building
                            </label>
                            <select
                                value={building}
                                onChange={(e) => setBuilding(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Buildings</option>
                                {buildings.map((b) => (
                                    <option key={b} value={b}>
                                        {b}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Room Type
                            </label>
                            <select
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Types</option>
                                {roomTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Capacity
                            </label>
                            <select
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Any Capacity</option>
                                {capacities.map((cap) => (
                                    <option key={cap} value={cap}>
                                        {cap}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-gray-900 mb-4">Booking Details</h3>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-2">
                            Select Room *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {filteredRooms.map((room) => (
                                <button
                                    key={room.id}
                                    type="button"
                                    onClick={() => handleRoomChange(room.id)}
                                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                                        selectedRoom === room.id
                                            ? "border-blue-600 bg-blue-50"
                                            : "border-gray-200 hover:border-blue-300"
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-gray-900">
                                                {room.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {room.type}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Capacity: {room.capacity}
                                            </p>
                                        </div>
                                        {selectedRoom === room.id && (
                                            <CheckCircle className="w-5 h-5 text-blue-600" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Date Start *
                            </label>
                            <input
                                type="date"
                                value={dateStart}
                                onChange={(e) => setDateStart(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Date End *
                            </label>
                            <input
                                type="date"
                                value={dateEnd}
                                onChange={(e) => setDateEnd(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Start Time *
                            </label>
                            <input
                                type="time"
                                value={timeStart}
                                onChange={(e) => setTimeStart(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                End Time *
                            </label>
                            <input
                                type="time"
                                value={timeEnd}
                                onChange={(e) => setTimeEnd(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Recurrence Options */}
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <label className="flex items-center gap-2 cursor-pointer mb-3">
                            <input
                                type="checkbox"
                                checked={isRecurring}
                                onChange={(e) =>
                                    setIsRecurring(e.target.checked)
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-gray-900">
                                Recurring Class (Loop Time)
                            </span>
                        </label>

                        {isRecurring && (
                            <div>
                                <p className="text-sm text-gray-700 mb-2">
                                    Occupied Days in a Week:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {daysOfWeek.map((day) => (
                                        <button
                                            key={day.short}
                                            type="button"
                                            onClick={() => toggleDay(day.short)}
                                            className={`px-4 py-2 rounded-lg transition-colors ${
                                                selectedDays.includes(day.short)
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-white border border-gray-300 text-gray-700 hover:border-blue-400"
                                            }`}
                                        >
                                            {day.short}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-2">
                            Class Name / Booking Purpose *
                        </label>
                        <input
                            type="text"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            placeholder="e.g., Computer Networks Lab Session"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={checkAvailability}
                            disabled={
                                !selectedRoom ||
                                !dateStart ||
                                !timeStart ||
                                !timeEnd
                            }
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Search className="w-4 h-4" />
                            Check Availability
                        </button>

                        {availabilityChecked && (
                            <div
                                className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
                                    isAvailable
                                        ? "bg-green-50 text-green-800"
                                        : "bg-red-50 text-red-800"
                                }`}
                            >
                                {isAvailable ? (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        <span>
                                            Room is available for the selected
                                            time slot
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="w-5 h-5" />
                                        <span>
                                            Conflict detected! Please choose a
                                            different time or room
                                        </span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={!availabilityChecked || !isAvailable}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Confirm Booking
                    </button>
                    <button
                        type="button"
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
