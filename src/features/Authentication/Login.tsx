import "../../assets/style/Fonts.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import { ErrorMessage } from "../../components/message/ErrorMessage";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState({email: "", password: ""});
    const [error, setError] = useState({email: "", password: ""});
    const navigate = useNavigate();
    
    function loginValidation(e: React.FormEvent) {
        e.preventDefault();
        const newError = {email: "", password: ""};
        
        if(input.email.length === 0) {
            newError.email = "This field is required!"
        } else {
            newError.email = ""
        } 
        
        if(input.password.length === 0) {
            newError.password = "This field is required!"
        } else {
            newError.password = ""
        } 

        setError(newError);

        if (Object.values(newError).every(value => value == "")) {
            navigate("/");
        }
    }

    function showPassword() {
        setShow(!show);
    }

    return (
        <section className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#4474F8] via-[#5984F9] to-[#6B94FA]">
            <form className="w-[90%] md:w-[500px] flex flex-col gap-8 bg-white p-10 rounded-2xl shadow-2xl">
                <div className="text-center">
                    <h1 className="font-bold text-4xl text-[#2c2c2c] mb-2">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Login to your SCAMS account</p>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                        <label className="font-semibold text-gray-700">Email</label>
                        {error.email && <ErrorMessage error={error.email} />}
                    </div>
                    <input 
                        onChange={(e) => setInput(prev => ({...prev, email: e.target.value}))} 
                        type="email"
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-[#4474F8] focus:outline-none transition-colors" 
                        placeholder="your.email@example.com" 
                    />
                </div>

                <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                        <label className="font-semibold text-gray-700">Password</label>
                        {error.password && <ErrorMessage error={error.password} />}
                    </div>
                    <input 
                        onChange={(e) => setInput(prev => ({...prev, password: e.target.value}))} 
                        type={show ? "text" : "password"} 
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-[#4474F8] focus:outline-none transition-colors" 
                        placeholder="Enter your password" 
                    />

                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <input 
                                onChange={showPassword} 
                                type="checkbox" 
                                id="showPassword"
                                className="w-4 h-4 accent-[#4474F8] cursor-pointer"
                            />
                            <label htmlFor="showPassword" className="text-sm text-gray-600 cursor-pointer">
                                Show password
                            </label>
                        </div>
                        <Link 
                            to="/forgot-password" 
                            className="text-sm text-[#4474F8] hover:text-[#3461E6] hover:underline transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <button 
                    onClick={loginValidation} 
                    className="py-4 rounded-lg font-bold text-base text-white bg-[#4474F8] hover:bg-[#3461E6] hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                >
                    Login
                </button>

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link 
                        to="/sign-up" 
                        className="text-[#4474F8] font-semibold hover:text-[#3461E6] hover:underline transition-colors"
                    >
                        Sign up here
                    </Link>
                </p>
            </form>
        </section>
    );
}