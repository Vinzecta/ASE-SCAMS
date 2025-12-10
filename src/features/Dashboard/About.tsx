import { Check, Target, Users, Lightbulb, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    const missions = [
        "Transform traditional campuses into intelligent, energy-efficient environments",
        "Reduce energy consumption by up to 35% through automated device control",
        "Simplify room management and booking for the entire university community",
        "Provide real-time insights and comprehensive analytics for better decision-making",
        "Ensure security and accessibility for all users, from students to staff"
    ];

    const values = [
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: "Innovation",
            description: "Leveraging cutting-edge AI and IoT to solve real campus challenges"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Sustainability",
            description: "Reducing energy waste and environmental impact through smart automation"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Accessibility",
            description: "Making campus resources available to everyone, 24/7, from any device"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Security",
            description: "Protecting user data and ensuring safe campus operations"
        }
    ];

    const stats = [
        { value: "35%", label: "Energy Reduction" },
        { value: "100+", label: "Lecture Halls" },
        { value: "10,000+", label: "Daily Users" },
        { value: "50,000", label: "kWh Saved/Month" }
    ];

    return (
        <div id="about" className="w-screen mt-25 bg-[#f6f6f6]">
            <section className="w-full py-10">
                <div className="w-[80%] mx-auto text-center">
                    <h1 className="text-[40px] font-bold mb-6">About Us</h1>
                    <p className="text-[20px] max-w-3xl mx-auto">
                        Building the future of smart campuses, one automated system at a time
                    </p>
                </div>
            </section>

            <section className="w-full py-20">
                <div className="w-[80%] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                                    alt="Smart Campus Technology"
                                    className="w-full h-full object-cover"
                                />
                            </div>
        
                            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-[#4474F8]">2025</p>
                                    <p className="text-gray-600">Established</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
                                <Target className="w-5 h-5 text-[#4474F8]" />
                                <span className="text-[#4474F8] font-semibold">Our Mission</span>
                            </div>
                            
                            <h2 className="text-4xl font-bold mb-6 leading-tight">
                                Revolutionizing Campus Infrastructure
                            </h2>
                            
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                SCAMS (Smart Campus Automation & Management System) is transforming 
                                university infrastructure through intelligent automation and sustainable 
                                energy management. We combine cutting-edge IoT technology, AI-powered 
                                detection, and intuitive user interfaces to create truly smart campuses 
                                that benefit students, faculty, and administrators alike.
                            </p>

                            <div className="space-y-4">
                                {missions.map((mission, index) => (
                                    <div key={index} className="flex items-start gap-3 group">
                                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                                            <Check className="w-4 h-4 text-green-600" />
                                        </div>
                                        <p className="text-gray-700 leading-relaxed group-hover:text-[#4474F8] transition-colors">
                                            {mission}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Link to={"/log-in"} className="mt-8 bg-[#4474F8] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#3461E6] hover:scale-105 hover:shadow-lg transition-all duration-300">
                                Learn More About Our Technology
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}