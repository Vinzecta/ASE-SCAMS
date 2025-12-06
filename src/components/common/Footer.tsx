import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { useState, ChangeEvent, FormEvent } from 'react';

export default function Footer() {
    const [email, setEmail] = useState<string>('');

    const handleSubscribe = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!email) {
            alert('Please enter your email');
            return;
        }
        alert(`Subscribed with: ${email}`);
        setEmail('');
    };

    const footerLinks = {
        product: [
            { name: 'Features', href: '/features' },
            { name: 'Room Search', href: '/room-search' },
            { name: 'Room Booking', href: '/room-booking' },
            { name: 'Energy Reports', href: '/reports' },
            { name: 'Control Panel', href: '/control' },
        ],
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Contact', href: '/contact' },
            { name: 'Careers', href: '/careers' },
            { name: 'Blog', href: '/blog' },
            { name: 'Press Kit', href: '/press' },
        ],
        support: [
            { name: 'Help Center', href: '/help' },
            { name: 'Documentation', href: '/docs' },
            { name: 'API Reference', href: '/api' },
            { name: 'System Status', href: '/status' },
            { name: 'FAQs', href: '/faq' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
            { name: 'Security', href: '/security' },
            { name: 'Compliance', href: '/compliance' },
        ]
    };

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com', label: 'Facebook' },
        { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
        { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com', label: 'Instagram' },
        { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com', label: 'YouTube' },
    ];

    return (
        <footer className="w-full bg-gray-900 text-gray-300">
            <div className="w-[85%] mx-auto py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-white mb-4">SCAMS</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Smart Campus Automation & Management System. 
                            Transforming universities through intelligent automation 
                            and sustainable energy management.
                        </p>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#4474F8] flex-shrink-0 mt-1" />
                                <p className="text-sm">
                                    Smart Campus Office, Building A<br />
                                    University District, Ho Chi Minh City
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#4474F8] flex-shrink-0" />
                                <p className="text-sm">+84 (28) 3822 4567</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#4474F8] flex-shrink-0" />
                                <p className="text-sm">support@scams.edu.vn</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#4474F8] hover:scale-110 transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#4474F8] hover:translate-x-1 transition-all duration-200 inline-block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#4474F8] hover:translate-x-1 transition-all duration-200 inline-block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#4474F8] hover:translate-x-1 transition-all duration-200 inline-block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#4474F8] hover:translate-x-1 transition-all duration-200 inline-block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-800">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-white font-bold text-2xl mb-3">
                            Stay Updated
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Subscribe to our newsletter for the latest updates, features, and smart campus insights.
                        </p>
                        
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input 
                                type="email"
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#4474F8] focus:outline-none text-white placeholder:text-gray-500"
                                required
                            />
                            <button 
                                type="submit"
                                className="px-6 py-3 bg-[#4474F8] text-white rounded-lg font-semibold hover:bg-[#3461E6] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                Subscribe
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800">
                <div className="w-[85%] mx-auto py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} SCAMS - Smart Campus Automation & Management System. All rights reserved.
                        </p>
                        
                        <div className="flex gap-6 text-sm">
                            <a href="/sitemap" className="text-gray-500 hover:text-[#4474F8] transition-colors">
                                Sitemap
                            </a>
                            <a href="/accessibility" className="text-gray-500 hover:text-[#4474F8] transition-colors">
                                Accessibility
                            </a>
                            <a href="/privacy" className="text-gray-500 hover:text-[#4474F8] transition-colors">
                                Privacy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}