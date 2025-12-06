import { Routes, Route } from "react-router-dom";
import RoomBooking from "./features/RoomBooking/RoomBooking";
import Login from "./features/Authentication/Login";
import SignUp from "./features/Authentication/SignUp";
import ForgotPassword from "./features/Authentication/ResetPassword";
import CalendarCheckPage from "../src/features/CalendarCheck/CalendarCheckPage";
import Dashboard from "./features/Dashboard/Dashboard";
import "./App.css";

// const Dashboard = () => (
//     <div>
//         <h1>Home Page</h1>
//     </div>
// );

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/book-room" element={<RoomBooking />} />
            <Route path="/calendar-check" element={<CalendarCheckPage />} />
        </Routes>
        
    );
}

export default App;
