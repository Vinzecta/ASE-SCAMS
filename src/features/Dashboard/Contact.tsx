import { useState, ChangeEvent, FormEvent } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all fields');
            return;
        }
        
        console.log('Form submitted:', formData);
        alert('Thank you for contacting us! We will get back to you within 24 hours.');
        
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <section id="contact" className="w-full py-20 bg-gray-50">
            <div className="w-[80%] mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600">
                        Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-[#4474F8] rounded-lg flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold">Contact Form</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#4474F8]" />
                                    First Name *
                                </label>
                                <input 
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="John"
                                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4474F8] focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#4474F8]" />
                                    Last Name *
                                </label>
                                <input 
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4474F8] focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 font-semibold flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#4474F8]" />
                                Email Address *
                            </label>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john.doe@example.com"
                                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4474F8] focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 font-semibold flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-[#4474F8]" />
                                Subject *
                            </label>
                            <input 
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can we help you?"
                                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4474F8] focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 font-semibold">
                                Message *
                            </label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us more about your inquiry..."
                                rows={6}
                                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4474F8] focus:outline-none transition-colors resize-none text-gray-700 placeholder:text-gray-400"
                                required
                            />
                            <p className="text-sm text-gray-500">
                                {formData.message.length} / 500 characters
                            </p>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-[#4474F8] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#3461E6] hover:scale-[1.02] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Send className="w-5 h-5" />
                            Send Message
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            We typically respond within 24 hours during business days
                        </p>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-7 h-7 text-[#4474F8]" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Email Us</h3>
                        <p className="text-gray-600">support@scams.edu.vn</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-7 h-7 text-[#4474F8]" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Live Chat</h3>
                        <p className="text-gray-600">Available 9 AM - 6 PM</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-7 h-7 text-[#4474F8]" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Support Team</h3>
                        <p className="text-gray-600">Dedicated to help you</p>
                    </div>
                </div>
            </div>
        </section>
    );
}