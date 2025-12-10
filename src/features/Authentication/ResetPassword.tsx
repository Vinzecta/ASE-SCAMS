import "../../assets/style/Fonts.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ErrorMessage, ErrorMessage2 } from "../../components/message/ErrorMessage";
import { SuccessMessage } from "../../components/message/SuccessMessage"

export default function ForgotPassword() {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState({email: "", password: "", confirmPass: ""});
    const [passwordValid, setPasswordValid] = useState({checkLength: false, checkSpecial: false});
    const [errors, setErrors] = useState({email: "", password: "", confirmPass: ""});
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

        const tempError = {email: "", password: "", confirmPass: ""}

        if (input.email.trim().length === 0) {
            tempError.email = "This field is required!"
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
            navigate("/log-in");
        }
    }

    function showPassword() {
        setShow(!show);
    }

    return ( 
        <section className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#4474F8] via-[#5984F9] to-[#6B94FA]">
            <form className="w-[30%] flex flex-col gap-5 bg-white !p-10 rounded-2xl">
                <h1 className="text-center font-bold text-3xl text-[#2c2c2c]">Forgot Password?</h1>

                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                        <label className="font-light !my-auto">Email</label>
                        {errors.email ? <ErrorMessage error={errors.email} /> : null}
                    </div>
                    <input
                        onChange={(e) => setInput(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border-b !px-2 !py-3 focus:border-[#4474F8]"
                        placeholder="Type your email"
                    />
                </div>

                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                        <label className="font-light !my-auto">Password</label>
                        {errors.password ? <ErrorMessage error={errors.password} /> : null}
                    </div>
                    <input
                        onChange={(e) => setInput(prev => ({ ...prev, password: e.target.value }))}
                        type={show ? "text" : "password"}
                        className="w-full border-b !px-2 !py-3 focus:border-[#4474F8]"
                        placeholder="Type your password"
                    />

                    <div className="flex flex-col gap-1">
                        {passwordValid.checkLength ?
                            <SuccessMessage success={"8-12 characters"} /> :
                            <ErrorMessage2 error={"8-12 characters"} />
                        }

                        {passwordValid.checkSpecial ?
                            <SuccessMessage success={"At least 1 special character (!@#$)"} /> :
                            <ErrorMessage2 error={"At least 1 special character (!@#$)"} />
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                        <label className="font-light !my-auto">Confirm password</label>
                        {errors.confirmPass ? <ErrorMessage error={errors.confirmPass} /> : null}
                    </div>

                    <input
                        onChange={(e) => setInput(prev => ({ ...prev, confirmPass: e.target.value }))}
                        type={show ? "text" : "password"}
                        className="w-full border-b !px-2 !py-3 focus:border-[#4474F8]"
                        placeholder="Type your password"
                    />

                    <div className="flex gap-2">
                        <input onClick={showPassword} type="checkbox" />
                        <p className="font-light text-xs">Show password</p>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="!py-3 rounded-2xl font-bold text-base text-white bg-[#4474F8] hover:bg-[#375FCC]"
                >
                    Get new password
                </button>

                <p className="text-sm text-center">
                    Remember your password? Go back to
                    <span className="text-[#4474F8] font-bold hover:underline hover:text-[#375FCC] cursor-pointer">
                        <Link to="/log-in"> login</Link>
                    </span>
                </p>
            </form>
        </section>
    );
}