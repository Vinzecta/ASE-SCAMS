import { Routes, Route } from "react-router-dom";
import RoomBooking from "./features/RoomBooking/RoomBooking";
import CalendarCheckPage from "../src/features/CalendarCheck/CalendarCheckPage";
import "./App.css";

const Dashboard = () => (
    <div>
        <h1>Home Page</h1>
    </div>
);

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/book-room" element={<RoomBooking />} />
            <Route path="/calendar-check" element={<CalendarCheckPage />} />

        </Routes>
        
    );
}

export default App;
