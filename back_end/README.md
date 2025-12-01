📅 Backend API Documentation

Base URL

Local: http://localhost:5000/api


1. Schedules API

🟢 Get All Schedules

Returns the simplified, frontend-ready list of schedules.

Endpoint: GET /schedules

Response Example:

[
{
"courseCode": "CO3049",
"courseName": "Web Programming",
"group": "CC01",
"credit": 3,
"sessions": [
{
"weeks": [38, 41, 44, 47],
"day": 2,
"timeStart": "12:00",
"timeEnd": "13:50",
"room": "C6-401"
}
]
}
]

🟠 Create New Schedule

Creates a new class schedule.
Note: This endpoint uses a Semaphore/Lock. If multiple users try to book the same room simultaneously, requests are processed one by one to prevent double-booking.

Endpoint: POST /schedules

⚠️ Important: You must send the database IDs (\_id) for Course, Teacher, and Room, NOT their names.

Request Body:

{
"courseId": "651a2b3c...", // (Required) MongoDB \_id of the Course
"teacherId": "651a2b3c...", // (Required) MongoDB \_id of the Teacher
"groupId": "CC02", // String, e.g., Class Group
"credit": 3, // Number
"sessions": [
{
"day": 2, // Number (2 = Monday, 8 = Sunday)
"timeStart": "07:00", // String (Format HH:MM)
"timeEnd": "09:00", // String (Format HH:MM)
"weeks": [1, 2, 3, 4], // Array of Numbers
"roomId": "6745d2..." // (Required) MongoDB \_id of the Room
}
]
}

Response (201 Created):
Returns the raw created MongoDB document.

Error Responses:

409 Conflict:

Reason: The room is already booked for that time/day/week.

JSON: { "message": "Conflict detected in Room C6-401 on Day 2 (07:00-09:00)." }

Action: Show this message to the user and ask them to choose a different time or room.

500 Server Error:

Reason: Invalid ID format or Database connection issue.

JSON: { "message": "Cast to ObjectId failed..." } (Usually means you sent a fake or malformed ID).

2. Helper Endpoints (for Dropdowns)

Use these endpoints to get the IDs needed for the Create Schedule form.

🏫 Get Rooms

Endpoint: GET /rooms

Use this to populate the "Select Room" dropdown.

Value to send: \_id

Label to show: name (e.g., "A4-501")

📘 Get Courses

Endpoint: GET /courses

Use this to populate the "Select Course" dropdown.

Value to send: \_id

Label to show: name (e.g., "Software Engineering")

👨‍🏫 Get Teachers

Endpoint: GET /teachers

Use this to populate the "Select Teacher" dropdown.

Value to send: \_id

Label to show: name
