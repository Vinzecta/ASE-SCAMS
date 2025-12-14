import { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import api from '../../services/api';

interface ScheduleTimelineProps {
  selectedRoom: string | null; //  "H6-101"
}

const dayNumberToString: Record<number, string> = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

export function ScheduleTimeline({ selectedRoom }: ScheduleTimelineProps) {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedRoom) return;

    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const res = await api.get('/schedules');

        const filtered: any[] = [];

        res.data.forEach((sched: any) => {
          sched.sessions.forEach((sess: any) => {
            if (sess.room === selectedRoom) {
              filtered.push({
                day: dayNumberToString[sess.day],
                time: `${sess.timeStart} - ${sess.timeEnd}`,
                course: sched.courseName, // DTO backend trả về courseName
                lecturer: 'Lecturer Info', // DTO backend hiện chưa trả về tên Teacher, có thể update backend sau
              });
            }
          });
        });

        setSchedules(filtered);
      } catch (error) {
        console.error('Error fetching schedules', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [selectedRoom]);

  const timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h3 className="text-gray-900">Room Schedule</h3>
      </div>

      {!selectedRoom ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Select a room to view its schedule</p>
        </div>
      ) : (
        <>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">Viewing schedule for:</p>
            <p className="text-blue-900 font-bold">{selectedRoom}</p>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            <h4 className="text-sm text-gray-700">Existing Bookings</h4>

            {loading && <p className="text-sm text-gray-500">Loading...</p>}

            {!loading && schedules.length === 0 && (
              <p className="text-sm text-gray-400 italic">No bookings found.</p>
            )}

            {schedules.map((booking, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-gray-900 font-medium">{booking.day}</p>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-3 h-3" />
                    <p className="text-sm">{booking.time}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 font-semibold">{booking.course}</p>
              </div>
            ))}
          </div>

          {/* (Giữ nguyên phần Time Grid Visualization bên dưới nếu muốn) */}
        </>
      )}
    </div>
  );
}
