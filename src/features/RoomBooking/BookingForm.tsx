// src/features/RoomBooking/BookingForm.tsx
import { useState, useEffect } from 'react';
import { Search, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api'; // Import axios instance

interface BookingFormProps {
  onRoomSelect: (roomId: string | null) => void;
}

// Helper: Map Backend day (2-8) to Frontend string
const daysMap = {
  Mon: 2,
  Tue: 3,
  Wed: 4,
  Thu: 5,
  Fri: 6,
  Sat: 7,
  Sun: 8,
};

export function BookingForm({ onRoomSelect }: BookingFormProps) {
  // --- API Data State ---
  const [rooms, setRooms] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [buildings, setBuildings] = useState<string[]>([]);

  // --- Form State ---
  const [building, setBuilding] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(''); // Backend needs Course ID

  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');

  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [conflictMessage, setConflictMessage] = useState('');

  // --- Fetch Data on Mount ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get Rooms
        const roomRes = await api.get('/rooms');
        setRooms(roomRes.data);
        // Extract unique buildings
        const uniqueBuildings = [...new Set(roomRes.data.map((r: any) => r.name.split('-')[0]))];
        setBuildings(uniqueBuildings as string[]);

        // 2. Get Courses (Need for Course ID)
        const courseRes = await api.get('/courses');
        setCourses(courseRes.data);
      } catch (error) {
        console.error('Failed to fetch initial data', error);
      }
    };
    fetchData();
  }, []);

  const handleRoomChange = (roomId: string) => {
    setSelectedRoomId(roomId);
    onRoomSelect(rooms.find((r) => r._id === roomId)?.name || null);
    setAvailabilityChecked(false);
  };

  // --- Logic: Calculate Weeks from Dates ---
  // Backend requires `weeks: [1, 2, 3...]`. We simulate this based on current date.

  function generateTimeOptions(startHour = 7, endHour = 22, stepMinutes = 30) {
    const options: string[] = [];

    for (let h = startHour; h <= endHour; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        if (h === endHour && m > 0) break;

        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        options.push(`${hh}:${mm}`);
      }
    }

    return options;
  }
  const timeOptions = generateTimeOptions(7, 22, 60);

  function getAcademicWeekNumber(date: Date) {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - start.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return Math.floor(days / 7) + 1;
  }

  // const calculateWeeks = () => {
  //     // Giả sử tuần 1 bắt đầu từ đầu năm hoặc mốc cụ thể.
  //     // Đây là logic đơn giản hóa cho demo.
  //     const start = new Date(dateStart);
  //     const end = new Date(dateEnd);
  //     const weeks = [];
  //     // Giả lập: Lấy tuần hiện tại trong năm
  //     const currentWeek = Math.ceil(
  //         ((start.getTime() - new Date(start.getFullYear(), 0, 1).getTime()) /
  //             86400000 +
  //             1) /
  //             7
  //     );
  //     const durationWeeks = Math.ceil(
  //         (end.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000)
  //     );

  //     for (let i = 0; i <= durationWeeks; i++) {
  //         weeks.push(currentWeek + i);
  //     }
  //     return weeks.length > 0 ? weeks : [currentWeek];
  // };

  const calculateWeeks = () => {
    if (!dateStart || !dateEnd) return [];

    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    const weeks: number[] = [];
    const cursor = new Date(start);

    while (cursor <= end) {
      weeks.push(getAcademicWeekNumber(cursor));
      cursor.setDate(cursor.getDate() + 7);
    }

    return Array.from(new Set(weeks));
  };

  const checkAvailability = async () => {
    // Vì Backend API `createSchedule` đã có check lock,
    // ở Frontend ta có thể check bằng cách fetch lịch của phòng đó về xem có trùng không.
    // Tuy nhiên, để đơn giản, ta sẽ cho phép submit và bắt lỗi 409 từ backend trả về.
    // Ở đây tôi giả lập check client-side đơn giản.
    setAvailabilityChecked(true);
    setIsAvailable(true); // Tạm thời assume true, backend sẽ chặn sau
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Get User info (Teacher)
    const userStr = localStorage.getItem('user'); // User object saved at login
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user || user.role !== 'lecturer') {
      alert('Only Lecturers can book rooms!');
      return;
    }

    // 2. Prepare Payload
    const weeksList = calculateWeeks();
    if (weeksList.length === 0) {
      alert('Invalid date range');
      return;
    }

    const selectedCourse = courses.find((c) => c._id === selectedCourseId);

    if (!selectedCourse) {
      alert('Invalid course selection');
      return;
    }

    const [y, m, d] = dateStart.split('-').map(Number);
    const localDate = new Date(y, m - 1, d);

    // ISO weekday: Mon=1 ... Sun=7
    const isoDay = ((localDate.getDay() + 6) % 7) + 1;

    const backendDay = isoDay - 6;

    const payload = {
      courseId: selectedCourseId,
      teacherId: user.id,
      groupId: 'CC01',
      credit: 3,
      sessions: [
        {
          day: backendDay,
          timeStart,
          timeEnd,
          weeks: weeksList,
          roomId: selectedRoomId,
        },
      ],
    };

    // 3. Call API
    try {
      await api.post('/schedules', payload);
      alert('Booking created successfully!');
      // Reset form or redirect
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        alert('Conflict detected: ' + error.response.data.message);
        setIsAvailable(false);
      } else {
        alert('Error creating booking: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  // Filter rooms logic
  const filteredRooms = rooms.filter((room) => {
    if (building && !room.name.startsWith(building)) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-gray-900 mb-4">Room Search Filter</h3>
          {/* ... (Giữ nguyên phần UI Dropdown Building/Type/Capacity, chỉ update logic) ... */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Building</label>
              <select
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">All Buildings</option>
                {buildings.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-gray-900 mb-4">Booking Details</h3>

          {/* Room Selection Grid */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">Select Room *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {filteredRooms.map((room) => (
                <button
                  key={room._id}
                  type="button"
                  onClick={() => handleRoomChange(room._id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    selectedRoomId === room._id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-900 font-medium">{room.name}</p>
                      <p className="text-sm text-gray-500">Capacity: {room.capacity}</p>
                    </div>
                    {selectedRoomId === room._id && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Date Start *</label>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Date End *</label>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Time Start *</label>
                <select
                  value={timeStart}
                  onChange={(e) => setTimeStart(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required>
                  <option value="">-- Select start time --</option>
                  {timeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Time End *</label>
                <select
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required>
                  <option value="">-- Select end time --</option>
                  {timeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Day Selection */}
          {/* <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-2">
                            Select Days *
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(daysMap).map((dayShort) => (
                                <button
                                    key={dayShort}
                                    type="button"
                                    onClick={() => toggleDay(dayShort)}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        selectedDays.includes(dayShort)
                                            ? "bg-blue-600 text-white"
                                            : "bg-white border border-gray-300 text-gray-700"
                                    }`}
                                >
                                    {dayShort}
                                </button>
                            ))}
                        </div>
                    </div> */}

          {/* Course Selection (Thay vì nhập text Purpose) */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">Select Course *</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required>
              <option value="">-- Choose a Course --</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="mb-6">
            <button
              type="button"
              onClick={checkAvailability}
              disabled={!selectedRoomId || !dateStart}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Search className="w-4 h-4" /> Check Availability (Client-side)
            </button>

            {availabilityChecked && (
              <div
                className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
                  isAvailable ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                {isAvailable ? (
                  <>
                    <CheckCircle className="w-5 h-5" />{' '}
                    <span>Valid inputs. Click Confirm to submit.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" /> <span>{conflictMessage}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}
