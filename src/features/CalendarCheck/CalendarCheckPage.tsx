import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  List,
  Grid,
  Search as SearchIcon,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { isTokenExpired } from "../../services/checkToken";
import { useNavigate } from "react-router-dom";

/**
 * CalendarCheckPage.tsx
 *
 * Student-facing "Thời khóa biểu" page.
 * - Table view (paginated/searchable)
 * - Weekly grid view (Mon-Sun, 05:00 - 23:00)
 *
 * Data format (Option 2 - Detailed Sessions):
 * [
 *   {
 *     courseCode: "CO3049",
 *     courseName: "Web Programming",
 *     group: "CC01",
 *     sessions: [
 *       { week: 35, day: 2, timeStart: "12:00", timeEnd: "13:50", room: "C6-401" },
 *       { week: 36, day: 2, timeStart: "12:00", timeEnd: "13:50", room: "C6-401" }
 *     ]
 *   }
 * ]
 */

type Session = {
  weeks: number[];
  day: number;
  timeStart: string;
  timeEnd: string;
  room?: string;
  note?: string;
};

type Course = {
  courseCode: string;
  courseName: string;
  group?: string;
  credit?: number;
  sessions: Session[];
};

const START_HOUR = 5;
const END_HOUR = 23;
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);
function getAcademicWeekNumber(date: Date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return Math.floor(days / 7) + 1; 
}

function minutesFromHHMM(t: string) {
  const [hh, mm] = t.split(":").map(Number);
  return hh * 60 + mm;
}

// async function mockFetchStudentSchedule(): Promise<Course[]> {
//   await new Promise((r) => setTimeout(r, 300));

//   return [
//     {
//       courseCode: "SA0002",
//       courseName: "Student Activities",
//       group: "CC02",
//       credit: 0,
//       sessions: [
//         {
//           weeks: [35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50],
//           day: 7,
//           timeStart: "--:--",
//           timeEnd: "--:--",
//           room: "CS-LTK",
//         },
//       ],
//     },

//     {
//       courseCode: "CO3049",
//       courseName: "Web Programming",
//       group: "CC01",
//       credit: 3,
//       sessions: [
//         {
//           weeks: [ 38, 41, 44, 47],
//           day: 2,
//           timeStart: "12:00",
//           timeEnd: "13:50",
//           room: "C6-401",
//         },
//       ],
//     },

//     {
//       courseCode: "IM1023",
//       courseName: "Production Management for Engineers",
//       group: "CC01",
//       credit: 3,
//       sessions: [
//         {
//           weeks: [35, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50],
//           day: 3,
//           timeStart: "07:00",
//           timeEnd: "08:50",
//           room: "B6-306",
//         },
//       ],
//     },

//     {
//       courseCode: "CO3027",
//       courseName: "E-Commerce",
//       group: "CC01",
//       credit: 3,
//       sessions: [
//         {
//           weeks: [35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50],
//           day: 4,
//           timeStart: "12:00",
//           timeEnd: "13:50",
//           room: "B1-203",
//         },
//       ],
//     },

//     {
//       courseCode: "CO3050",
//       courseName: "Web Programming Lab",
//       group: "CC01",
//       credit: 0,
//       sessions: [
//         {
//           weeks: [38, 41, 44, 47],
//           day: 5,
//           timeStart: "07:00",
//           timeEnd: "11:50",
//           room: "A4-511",
//         },
//       ],
//     },

//     {
//       courseCode: "CO3015",
//       courseName: "Software Testing",
//       group: "CC01",
//       credit: 3,
//       sessions: [
//         {
//           weeks: [35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50],
//           day: 5,
//           timeStart: "13:00",
//           timeEnd: "14:50",
//           room: "B4-504",
//         },
//       ],
//     },

//     {
//       courseCode: "CO3011",
//       courseName: "Software Project Management",
//       group: "CC01",
//       credit: 3,
//       sessions: [
//         {
//           weeks: [35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50],
//           day: 6,
//           timeStart: "09:00",
//           timeEnd: "10:50",
//           room: "C6-402",
//         },
//       ],
//     },

//     {
//       courseCode: "CO3065",
//       courseName: "Advanced Software Engineering",
//       group: "CC01",
//       credit: 3,
//       sessions: [
//         {
//           weeks: [35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50],
//           day: 6,
//           timeStart: "14:00",
//           timeEnd: "15:50",
//           room: "B4-403",
//         },
//       ],
//     },
//   ];
// }

async function fetchStudentSchedule(): Promise<Course[]> {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  const res = await fetch("http://localhost:3000/api/schedules", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to load schedule");
  }

  return await res.json();
}


export default function CalendarCheckPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [view, setView] = useState<"table" | "weekly">("table");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();
  

  const [weekStartIso, setWeekStartIso] = useState(() => {
    const d = new Date();
    const day = d.getDay() || 7;
    const diff = d.getDate() - (day - 1);
    const mon = new Date(d.setDate(diff));
    mon.setHours(0, 0, 0, 0);
    return mon.toISOString().slice(0, 10);
  });

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
      }
    }

    checkAuthorization();
  }, [navigate]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const json = await fetchStudentSchedule();
      setCourses(json);
    } catch (err) {
      console.error(err);
      setError("Unable to load schedule. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

      const filtered = useMemo(() => {
      const q = search.trim().toLowerCase();

      let result = courses;

      if (savedUser.role === "lecturer") {
        result = result.filter(
          (c: any) => c.teacherId === savedUser.id 
        );
      }

      if (savedUser.role === "student") {
        result = result.filter(
          (c: any) => c.studentIds?.includes?.(savedUser.id) 
        );
      }

      if (q) {
        result = result.filter(
          (c) =>
            c.courseCode.toLowerCase().includes(q) ||
            c.courseName.toLowerCase().includes(q) ||
            (c.group ?? "").toLowerCase().includes(q) ||
            c.sessions.some(
              (s) =>
                (s.room ?? "").toLowerCase().includes(q) ||
                String(s.weeks).includes(q)
            )
        );
      }

      return result;
    }, [courses, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  function isoToDate(iso: string) {
    const d = new Date(iso + "T00:00:00");
    return d;
  }
  const weekStartDate = isoToDate(weekStartIso);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStartDate);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStartIso]);

  const sessionsThisWeek = useMemo(() => {
    const out: (Session & { courseCode: string; courseName: string; group?: string })[] = [];
    for (const c of courses) {
      for (const s of c.sessions) {
        out.push({
          ...s,
          courseCode: c.courseCode,
          courseName: c.courseName,
          group: c.group,
        });
      }
    }
    return out;
  }, [courses]);

  function sessionGridStyle(s: Session) {
    const startM = minutesFromHHMM(s.timeStart);
    const endM = minutesFromHHMM(s.timeEnd);
    const dayIndex = (s.day ?? 1) - 1;
    const topMin = Math.max(0, startM - START_HOUR * 60);
    const heightMin = Math.max(30, endM - startM);
    return {
      dayIndex,
      topMin,
      heightMin,
      startM,
      endM,
    };
  }

  function goPrevWeek() {
    const d = new Date(weekStartDate);
    d.setDate(d.getDate() - 7);
    setWeekStartIso(d.toISOString().slice(0, 10));
  }
  function goNextWeek() {
    const d = new Date(weekStartDate);
    d.setDate(d.getDate() + 7);
    setWeekStartIso(d.toISOString().slice(0, 10));
  }

      function handleLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/log-in";
      }

  return (
    <>
    <div className="w-full bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold">Student Dashboard</h1>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{savedUser?.name || "Unknown User"}</p>
            <p className="text-sm opacity-80 capitalize">{savedUser?.role || ""}</p>

          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div>
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-sm text-gray-500">Semester Schedule</div>
              <div className="text-lg font-semibold text-gray-900">
                View Personal Schedule — Week {getAcademicWeekNumber(new Date())}
               </div>

            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("table")}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded ${
                view === "table" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              title="Table view"
            >
              <List className="w-4 h-4" />
              Table
            </button>

            <button
              onClick={() => setView("weekly")}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded ${
                view === "weekly" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              title="Weekly grid"
            >
              <Grid className="w-4 h-4" />
              Week
            </button>

            <button
              onClick={() => load()}
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
              Reload
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <div className="flex items-center gap-2">
            <button onClick={goPrevWeek} className="p-2 rounded hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4" />
            </button>

            <input
              type="date"
              value={weekStartIso}
              onChange={(e) => setWeekStartIso(e.target.value)}
              className="border px-2 py-1 rounded"
              aria-label="Select week start (Monday)"
            />

            <button onClick={goNextWeek} className="p-2 rounded hover:bg-gray-100">
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="text-xs text-gray-500 ml-3">
                Week of: <strong>{new Date(weekStartIso).toLocaleDateString()}</strong>
                <span className="ml-2 text-gray-700">
                    (Week {getAcademicWeekNumber(weekStartDate)})
                </span>
                </div>

          </div>

          <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-3">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search course code, course name, room, week..."
                className="pl-9 pr-3 py-2 border rounded w-80"
              />
              <SearchIcon className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="p-6 bg-white rounded shadow-sm border border-gray-200 text-center text-gray-700 mb-4">
          Loading data...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded mb-4">{error}</div>
      )}

      {view === "table" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-3 py-2 text-left">Course Code</th>
                  <th className="px-3 py-2 text-left">Course Name</th>
                  <th className="px-3 py-2 text-left">Group</th>
                  <th className="px-3 py-2 text-left">Day</th>
                  <th className="px-3 py-2 text-left">Time</th>
                  <th className="px-3 py-2 text-left">Room</th>
                  <th className="px-3 py-2 text-left">Week</th>
                </tr>
              </thead>

              <tbody>
                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500">
                      No courses found.
                    </td>
                  </tr>
                )}

                {pageItems.map((c) => (
                  <React.Fragment key={c.courseCode + (c.group ?? "")}>
                    {c.sessions.map((s, i) => (
                      <tr key={c.courseCode + "-" + i} className="border-b">
                        <td className="px-3 py-3 align-top">{c.courseCode}</td>
                        <td className="px-3 py-3 align-top">{c.courseName}</td>
                        <td className="px-3 py-3 align-top">{c.group ?? "--"}</td>
                        <td className="px-3 py-3 align-top">
                          {["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][s.day] ?? s.day}
                        </td>
                        <td className="px-3 py-3 align-top">
                          {s.timeStart} - {s.timeEnd}
                        </td>
                        <td className="px-3 py-3 align-top">{s.room ?? "--"}</td>
                        <td className="px-3 py-3 align-top">
                            {s.weeks?.join(" | ")}
                            </td>

                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <strong>{(page - 1) * perPage + 1}</strong> to{" "}
              <strong>{Math.min(page * perPage, filtered.length)}</strong> of{" "}
              <strong>{filtered.length}</strong> rows
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <div className="px-3 py-1 border rounded">
                {page} / {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {view === "weekly" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex gap-4 items-start">
            <div className="w-16 flex-shrink-0">
              <div className="h-10"></div>
              <div className="flex flex-col gap-3">
                {HOURS.map((h) => (
                  <div key={h} className="text-xs text-gray-500 h-10 flex items-start">
                    {String(h).padStart(2, "0")}:00
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-7 border-l border-t" style={{ minWidth: 800 }}>
                {weekDates.map((d, idx) => (
                  <div
                    key={idx}
                    className="border-r border-b px-3 py-2 text-xs font-medium bg-gray-50 text-gray-700"
                    style={{ minHeight: 40 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">
                          {d.toLocaleDateString(undefined, { weekday: "short" })}
                        </div>
                        <div className="text-xs text-gray-500">{d.toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {weekDates.map((_, dayIdx) => (
                  <div key={dayIdx} className="border-r relative" style={{ minHeight: HOURS.length * 40 }}>
                    <div className="absolute inset-0">
                      <div className="flex flex-col h-full">
                        {HOURS.map((h) => (
                          <div key={h} className="h-10 border-b border-dashed border-gray-100" />
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10 p-1">
                      {sessionsThisWeek
                        .filter(
                            (s) =>
                            s.weeks.includes(getAcademicWeekNumber(weekStartDate)) && 
                            (s.day ?? 1) - 1 === dayIdx
                        )
                        .map((s, idx) => {
                          const { topMin, heightMin } = sessionGridStyle(s);
                          const minuteToPx = 40 / 60;
                          const topPx = topMin * minuteToPx;
                          const heightPx = heightMin * minuteToPx;

                          return (
                            <div
                              key={idx + "-" + s.timeStart}
                              className="absolute left-2 right-2 rounded-lg shadow-sm overflow-hidden"
                              style={{
                                top: topPx + "px",
                                height: Math.max(26, heightPx) + "px",
                                background: "linear-gradient(90deg, #DBEAFE, #BFDBFE)",
                                borderLeft: "4px solid #3B82F6",
                              }}
                              title={`${(s as any).courseCode ?? ""} ${(s as any).courseName ?? ""}\n${s.timeStart}-${s.timeEnd}\nRoom: ${s.room ?? "-"}`}
                            >
                              <div className="px-2 py-1 text-xs font-semibold truncate">
                                {(s as any).courseCode ? `${(s as any).courseCode} — ` : ""}
                                {(s as any).courseName ?? ""}
                              </div>
                              <div className="px-2 py-0.5 text-[11px] text-gray-700 truncate">
                                {s.room ?? "--"} • Week {s.weeks}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            * Click Refresh if the data is not updated yet.
          </div>
        </div>
      )}
    </div>
    </>
  );
}