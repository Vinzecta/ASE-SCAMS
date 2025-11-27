import "../../assets/style/Fonts.css"
import teacher from "../../assets/image/teacher.svg"
import studentRole from "../../assets/image/student.svg"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ErrorMessage, ErrorMessage2 } from "../../components/message/ErrorMessage"
import { SuccessMessage } from "../../components/message/SuccessMessage"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const [tutor, setTutor] = useState(true);
    const [student, setStudent] = useState(false);
    const [show, setShow] = useState(false);
    const [input, setInput] = useState({username: "", email: "", password: "", confirmPass: ""});
    const [errors, setErrors] = useState({username: "", email: "", password: "", confirmPass: ""});
    const [passwordValid, setPasswordValid] = useState({checkLength: false, checkSpecial: false});
    const specialRegex = /^(?=.*[^A-Za-z0-9]).+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();

    useEffect(() => {
        const passwordValid = {checkLength: true, checkSpecial: true};

        if (input.password.length >= 8) {
            passwordValid.checkLength = true;
        } else {
            passwordValid.checkLength = false;
        }

        if (specialRegex.test(input.password)) {
            passwordValid.checkSpecial = true
        } else {
            passwordValid.checkSpecial = false
        }

        setPasswordValid(passwordValid);
    }, [input.password]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const tempError = {username: "", email: "", password: "", confirmPass: ""}

        if (input.username.trim().length === 0) {
            tempError.username = "This field is required!";
        } else {
            tempError.username = ""
        }

        if (input.email.trim().length === 0) {
            tempError.email = "This field is required!"
        } else if (!emailRegex.test(input.email)) {
            tempError.email = "Invalid email address!"
        } else {
            tempError.email = ""
        }

        if (Object.values(passwordValid).every(value => value !== true)) {
            tempError.password = "Password does not meet requirements!"
        } else {
            tempError.password = ""
        }

        if (input.confirmPass !== input.password) {
            tempError.confirmPass = "Password does not match!"
        } else {
            tempError.confirmPass = ""
        }

        setErrors(tempError)

        if (Object.values(tempError).every(value => value == "")) {
            navigate("/");
        }
    }

    function showPassword() {
        setShow(!show);
    }

    function clickTutor() {
        setStudent(false);
        setTutor(true);
    }

    function clickStudent() {
        setStudent(true);
        setTutor(false)
    }

    return (
        <section className="montserrat-custom h-fit w-full flex flex-col !py-10 items-center justify-center  bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
            <h1 className="text-[40px] font-bold text-white">Choose a role!</h1>
            <div className={`flex gap-10 items-center justify-center !mb-10`}>
                <div onClick={clickTutor} className={`flex flex-col w-[30%] !p-6 rounded-3xl ${tutor ? "bg-gradient-to-br from-blue-500 via-cyan-400 to-orange-400" : "bg-white"} transition-transform duration-300 ease-in-out hover:scale-110`}>
                    <img className={`w-[150px]`} src={teacher} alt="Teacher Logo" />
                    <p className="text-center">Teacher</p>
                </div>
        
                <div onClick={clickStudent} className={`flex flex-col w-[30%] !p-6 rounded-3xl ${student ? "bg-gradient-to-br from-blue-500 via-cyan-400 to-orange-400" : "bg-white"} transition-transform duration-300 ease-in-out hover:scale-110`}>
                    <img className="w-[150px]" src={studentRole} alt="Student Logo" />
                    <p className="text-center">Student</p>
                </div>
            </div>

            <form className="w-[30%] flex flex-col gap-5 bg-white !px-10 !py-5 rounded-2xl">
                <h1 className="text-center font-bold text-3xl text-[#2c2c2c]">Sign Up</h1>
                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                        <label className="font-light !my-auto">Username</label>
                        {
                            errors.username ? 
                            <ErrorMessage error={errors.username} /> : null
                        }
                    </div>

                    <input onChange={(e) => setInput(prev => ({...prev, username: e.target.value}))} className="w-full border-b !px-2 !py-3" placeholder="Type your username" />
                </div>

                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                        <label className="font-light !my-auto">Email</label>
                        {
                            errors.email ? 
                            <ErrorMessage error={errors.email} /> : null
                        }
                    </div>
                    <input onChange={(e) => setInput(prev => ({...prev, email: e.target.value}))} className="w-full border-b !px-2 !py-3" placeholder="Type your email" />
                </div>

                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                        <label className="font-light !my-auto">Password</label>
                        {
                            errors.password ? 
                            <ErrorMessage error={errors.password} /> : null
                        }
                    </div>
                    <input onChange={(e) => setInput(prev => ({...prev, password: e.target.value}))} type={show ? "text" : "password"} className="w-full border-b !px-2 !py-3" placeholder="Type your password" />

                    <div className="flex flex-col gap-1">
                        {
                            passwordValid.checkLength ?
                            <SuccessMessage success={"8-12 characters"} /> :
                            <ErrorMessage2 error={"8-12 characters"} />
                        }
                        {
                            passwordValid.checkSpecial ?
                            <SuccessMessage success={"At least 1 special character (!@#$)"} /> :
                            <ErrorMessage2 error={"At least 1 special character (!@#$)"} />
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                        <label className="font-light !my-auto">Confirm password</label>
                        {
                            errors.confirmPass ? 
                            <ErrorMessage error={errors.confirmPass} /> : null
                        }
                    </div>
                    <input onChange={(e) => setInput(prev => ({...prev, confirmPass: e.target.value}))} type={show ? "text" : "password"} className="w-full border-b !px-2 !py-3" placeholder="Type your password" />

                    <div className="flex gap-2">
                        <input onClick={showPassword} type="checkbox" />
                        <p className="font-light text-xs">Show password</p>
                    </div>
                </div>

                <button onClick={handleSubmit} className="!py-3 rounded-2xl font-bold text-base text-white bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 hover:[background:linear-gradient(to_right,#76a9fa,#b28dff,#ff7ac6)]">Sign up</button>

                <p className="text-xs text-center">Have an account? Log in <span className="text-[#ec4899] hover:underline hover:text-[#db2777] cursor-pointer"><Link to={"/log-in"}>here</Link></span></p>
            </form>
        </section>
    );
}