import { Routes, Route } from "react-router-dom";
import RoomBooking from "./features/RoomBooking/RoomBooking";
import Login from "./features/Authentication/Login";
import SignUp from "./features/Authentication/SignUp";
import ForgotPassword from "./features/Authentication/ResetPassword";
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
            <Route path="/log-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/book-room" element={<RoomBooking />} />
        </Routes>
    );
}

export default App;
