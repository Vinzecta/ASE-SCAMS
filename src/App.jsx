import { Routes, Route } from "react-router-dom";
import RoomBooking from "./features/RoomBooking/RoomBooking";
import "./App.css";

const Dashboard = () => (
    <div>
        <h1>Trang chủ</h1>
    </div>
);

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/book-room" element={<RoomBooking />} />
        </Routes>
    );
}

export default App;
