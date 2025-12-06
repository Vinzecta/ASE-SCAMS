import { Link } from "react-router-dom";
import Booking from "../../assets/image/booking.png";

export function Hero() {
    return (
        <section id="home" className="w-[80%] mx-auto flex justify-between">
            <div className="flex flex-col gap-2 w-[50%] my-auto">
                <h1 className="text-[40px] font-bold">Smart Campus Management</h1>
                <h1 className="text-[40px] font-bold">Make Simple</h1>
                <p>The intelligent system that automatically controls lecture halls, optimizes energy usage, and makes room booking effortless for everyone on campus. From automated door access and smart lighting to AI-powered occupancy detection and comprehensive energy reports, SCAMS transforms your university into a truly smart campus where technology works invisibly to create a better learning environment.</p>
                <div className="flex gap-5 mt-5">
                    <Link to="/room-search" className="py-3 px-3 bg-[#4474F8] text-[white] rounded-2xl font-semibold hover:bg-[#5984F8] hover:scale-110 transition-transform duration-300">Search Rooms</Link>
                    <Link to="/room-booking" className="py-3 px-5 bg-[#4474F8] text-[white] rounded-2xl font-semibold hover:bg-[#5984F8] hover:scale-110 transition-transform duration-300">Book Now</Link>
                </div>
            </div>

            <div>
                <img src={Booking} alt="Booking Illustration" />
            </div>
        </section>
    );
}