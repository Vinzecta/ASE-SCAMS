import { Zap, Calendar, Search, BarChart3, Eye, Lock, MapPin, Users, Bell, Shield } from 'lucide-react';

export default function Feature() {
    const features = [
        {
            icon: <Zap className="w-8 h-8 text-white" />,
            title: "Automated Device Control",
            description: "Doors, lights, fans, projectors, and sound systems automatically turn on 15 minutes before lectures and off when rooms are empty. Smart scheduling ensures energy efficiency."
        },
        {
            icon: <Eye className="w-8 h-8 text-white" />,
            title: "AI-Powered Detection",
            description: "Advanced AI analyzes camera footage and sensor data to detect human presence accurately. Ensures devices only operate when needed, maximizing energy savings."
        },
        {
            icon: <Calendar className="w-8 h-8 text-white" />,
            title: "Instant Room Booking",
            description: "Lecturers can book available rooms directly through web or mobile app in real-time. Seamless integration with Room Management Service for instant confirmation."
        },
        {
            icon: <Search className="w-8 h-8 text-white" />,
            title: "Smart Room Search",
            description: "Search any room's schedule instantly with detailed availability information. Get directions to your destination with integrated campus maps."
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-white" />,
            title: "Comprehensive Analytics",
            description: "Detailed reports on device usage by room, floor, building, or entire campus. View statistics by day, week, month, year, or custom date ranges."
        },
        {
            icon: <Bell className="w-8 h-8 text-white" />,
            title: "Automated Reporting",
            description: "Monthly energy reports automatically generated and sent to administrators and Board of Rectors via email. Stay informed without manual effort."
        },
        {
            icon: <Lock className="w-8 h-8 text-white" />,
            title: "Secure Access Control",
            description: "Security staff can access any room using key cards and control lights/devices through app or physical control panels. All booking data is encrypted and secure."
        },
        {
            icon: <Zap className="w-8 h-8 text-white" />,
            title: "Smart Corridor Lighting",
            description: "Corridor lights activate only when humans are detected or when nearby rooms are in use. Reduces energy waste during night hours automatically."
        },
        {
            icon: <Bell className="w-8 h-8 text-white" />,
            title: "After-Hours Alerts",
            description: "Automatic alarm system alerts security when people remain in rooms after university closing hours (around 9 PM). Ensures campus safety and security."
        },
        {
            icon: <Users className="w-8 h-8 text-white" />,
            title: "Multi-User Access",
            description: "Available for lecturers, students, staff, and guests from 5 AM to 11 PM. Role-based permissions ensure appropriate access levels for all user types."
        },
        {
            icon: <MapPin className="w-8 h-8 text-white" />,
            title: "Campus Navigation",
            description: "Integrated wayfinding system helps users locate rooms easily. Step-by-step directions from current location to any room on campus."
        },
        {
            icon: <Shield className="w-8 h-8 text-white" />,
            title: "Security & Privacy",
            description: "Multi-layered security protects all booking information and user data. Industry-standard encryption and secure authentication protocols implemented."
        }
    ];

    return (
        <section id="features" className="w-[80%] mx-auto mt-25">
            <h1 className='text-center text-[40px] font-bold mb-2 w-fit mx-auto'>SCAMS Features</h1>
            <p className='text-center text-[18px] text-[#908080] w-[50%] mx-auto leading-10'>Everything you need for intelligent campus management. From automated control to comprehensive analytics, SCAMS provides a complete solution for modern universities.</p>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl 
                                     transition-all duration-300 hover:-translate-y-2
                                     border border-gray-100 group cursor-pointer"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-[#4474F8] to-[#3461E6] 
                                          rounded-xl flex items-center justify-center mb-6
                                          group-hover:scale-110 group-hover:rotate-3
                                          transition-all duration-300 shadow-lg">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-gray-800 
                                         group-hover:text-[#4474F8] transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed text-[15px]">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
        </section>
    );
}