import "../../assets/style/Fonts.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
        <section className="montserrat-custom h-full w-full flex items-center justify-center  bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
            <form className="w-[30%] flex flex-col gap-10 bg-white !p-10 rounded-2xl">
                <h1 className="text-center font-bold text-3xl text-[#2c2c2c]">Login</h1>
                <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                        <label className="font-light !my-auto">Email</label>
                        {
                            error.email ? <ErrorMessage error={error.email} /> : null
                        }
                    </div>
                    <input onChange={(e) => setInput(prev => ({...prev, email: e.target.value}))} className="w-full border-b !px-2 !py-3" placeholder="Type your email" />
                </div>

                <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                        <label className="font-light !my-auto">Password</label>
                        {
                            error.password ? <ErrorMessage error={error.password} /> : null
                        }
                    </div>
                    <input onChange={(e) => setInput(prev => ({...prev, password: e.target.value}))} type={show ? "text" : "password"} className="w-full border-b !px-2 !py-3" placeholder="Type your password" />

                    <div className="flex gap-2">
                        <input onClick={showPassword} type="checkbox" />
                        <p className="font-light text-xs">Show password</p>
                    </div>
                    <Link to={"/forgot-password"} className="font-light text-xs !ml-auto hover:underline cursor-pointer">Forgot password?</Link>
                </div>

                <button onClick={loginValidation} className="!py-3 rounded-2xl font-bold text-base text-white bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 hover:[background:linear-gradient(to_right,#76a9fa,#b28dff,#ff7ac6)]">Login</button>

                <p className="text-xs text-center">Don't have an account? Sign up <span className="text-[#ec4899] hover:underline hover:text-[#db2777] cursor-pointer"><Link to={"/sign-up"}>here</Link></span></p>
            </form>
        </section>
    );
}