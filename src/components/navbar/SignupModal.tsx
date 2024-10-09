import { Modal } from "antd"
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { SignUpApi } from "../../api/api";
import { authenticate } from "../../features/features";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Loader from "../Loader";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

const SignupModal = ({ signupModal, setSignupModal }: any) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [loader, setLoader] = useState(false);
    const [lengthError, setLengthError] = useState(true);
    const [characterError, setCharacterError] = useState(true);

    const fn_setPassword = (value: any) => {
        setPassword(value);
        if (value.length > 6) {
            setLengthError(false);
        } else {
            setLengthError(true);
        }
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharacterRegex.test(value)) {
            setCharacterError(false);
        } else {
            setCharacterError(true);
        }
    }

    const fn_submit = async (e: any) => {
        e.preventDefault();
        if(lengthError || characterError){
            return toast.error("Write strong password");
        }
        if (password !== confirmPassword) {
            return toast.error("Password not Matched")
        }
        const data = {
            username, email, password
        }
        setLoader(true);
        const response = await SignUpApi(data);
        if (response?.status) {
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPasswordType("password");
            setConfirmPasswordType("password");
            dispatch(authenticate(true));
            setSignupModal(false);
            setLoader(false);
            return toast.success(response?.message)
        } else {
            setLoader(false);
            dispatch(authenticate(false));
            return toast.error(response?.message)
        }
    }

    return (
        <Modal
            title=""
            centered
            open={signupModal}
            onOk={() => setSignupModal(false)}
            onCancel={() => setSignupModal(false)}
            footer={null}
            style={{ fontFamily: "Roboto" }}
        >
            <div className="flex justify-center font-[800] text-[30px] sm:text-[35px] gap-[8px]">
                Shubh<span className="text-[--main-color]">Exchange</span>
            </div>
            <form onSubmit={fn_submit} className="flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[3px]">
                    <label
                        htmlFor="username"
                        className="font-[600] text-[16px] sm:text-[18px]"
                    >
                        Username
                    </label>
                    <input
                        className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px] outline-[--main-color]"
                        id="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-[3px]">
                    <label
                        htmlFor="email"
                        className="font-[600] text-[16px] sm:text-[18px]"
                    >
                        Email
                    </label>
                    <input
                        className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px] outline-[--main-color]"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="relative flex flex-col gap-[3px]">
                    <label
                        htmlFor="password"
                        className="font-[600] text-[16px] sm:text-[18px]"
                    >
                        Password
                    </label>
                    <input
                        type={passwordType}
                        className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px] outline-[--main-color]"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => fn_setPassword(e.target.value)}
                    />
                    {passwordType === "password" ? (
                        <FaRegEyeSlash
                            onClick={() => setPasswordType("text")}
                            className="cursor-pointer absolute right-[10px] bottom-[37px]"
                        />
                    ) : (
                        <FaRegEye
                            onClick={() => setPasswordType("password")}
                            className="cursor-pointer absolute right-[10px] bottom-[37px]"
                        />
                    )}
                    <div className="text-[13px] flex items-center gap-[30px]">
                        <p className={`flex items-center ${lengthError ? "text-[red]" : "text-[green]"}`}>
                            {lengthError ? <RxCross2 className={`me-[5px]`} /> : <TiTick className={`me-[5px] scale-[1.2]`} />}
                            Length greater then 6 letter
                        </p>
                        <p className={`flex items-center ${characterError ? "text-[red]" : "text-[green]"}`}>
                            {characterError ? <RxCross2 className={`me-[5px]`} /> : <TiTick className={`me-[5px] scale-[1.2]`} />}
                            <span className="mt-[1px]">Use special character</span>
                        </p>
                    </div>
                </div>
                <div className="relative flex flex-col gap-[3px]">
                    <label
                        htmlFor="confirmpassword"
                        className="font-[600] text-[16px] sm:text-[18px]"
                    >
                        Confirm Password
                    </label>
                    <input
                        type={confirmPasswordType}
                        className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px] outline-[--main-color]"
                        id="confirmpassword"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordType === "password" ? (
                        <FaRegEyeSlash
                            onClick={() => setConfirmPasswordType("text")}
                            className="cursor-pointer absolute right-[10px] bottom-[13px]"
                        />
                    ) : (
                        <FaRegEye
                            onClick={() => setConfirmPasswordType("password")}
                            className="cursor-pointer absolute right-[10px] bottom-[13px]"
                        />
                    )}
                </div>
                <button className={`relative text-[--text-color] bg-[--main-color] h-[40px] rounded-[5px] text-[16px] font-[600] mt-[5px] flex justify-center items-center ${loader ? "cursor-not-allowed" : "cursor-pointer"}`}>
                    {!loader ? "Signup" :
                        <Loader color="var(--text-color)" size={20} />
                    }
                </button>

            </form>
        </Modal>
    )
}

export default SignupModal