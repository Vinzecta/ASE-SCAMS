import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState<string>('home');

    // Scroll to section when hash changes
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            scrollToSection(id);
        }
    }, [location]);

    // Scroll spy - detect which section is in view
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'features', 'about', 'contact'];
            
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if section is in viewport (with some offset)
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once on mount
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 100; // Height của sticky header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            setActiveSection(sectionId);
        }
    };

    const isLandingPage = location.pathname === '/';

    const getLinkClass = (section: string) => {
        return `${
            activeSection === section && isLandingPage
                ? "text-[#4474F8] font-semibold" 
                : "text-black"
        } hover:scale-110 hover:text-[#4474F8] transition-all duration-300 cursor-pointer`;
    };

    return (
        <header className="w-screen sticky top-0 bg-white shadow-sm z-50">
            <div className="w-[80%] flex justify-between mx-auto py-10">
                <button
                    onClick={() => scrollToSection('home')}
                    className="text-[30px] font-bold text-[#4474F8] hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                    SCAMS
                </button>
                
                <nav className="text-[18px] my-auto flex gap-10">
                    {isLandingPage ? (
                        // For landing page - scroll to sections
                        <>
                            <button 
                                onClick={() => scrollToSection('home')}
                                className={getLinkClass('home')}
                            >
                                Home
                            </button>
                            
                            <button 
                                onClick={() => scrollToSection('features')}
                                className={getLinkClass('features')}
                            >
                                Features
                            </button>
                            
                            <button 
                                onClick={() => scrollToSection('about')}
                                className={getLinkClass('about')}
                            >
                                About
                            </button>
                            
                            <button 
                                onClick={() => scrollToSection('contact')}
                                className={getLinkClass('contact')}
                            >
                                Contact
                            </button>
                        </>
                    ) : (
                        // For other pages - navigate with Link
                        <>
                            <Link 
                                to="/#home"
                                className="hover:scale-110 hover:text-[#4474F8] transition-all duration-300"
                            >
                                Home
                            </Link>
                            
                            <Link 
                                to="/#features"
                                className="hover:scale-110 hover:text-[#4474F8] transition-all duration-300"
                            >
                                Features
                            </Link>
                            
                            <Link 
                                to="/#about"
                                className="hover:scale-110 hover:text-[#4474F8] transition-all duration-300"
                            >
                                About
                            </Link>
                            
                            <Link 
                                to="/#contact"
                                className="hover:scale-110 hover:text-[#4474F8] transition-all duration-300"
                            >
                                Contact
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}