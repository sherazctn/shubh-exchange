import { Modal } from "antd"
import { useState } from "react";
import toast from "react-hot-toast";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { SignUpApi } from "../../api/api";

const SignupModal = ({ signupModal, setSignupModal }: any) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");

    const fn_submit = async(e:any) => {
        e.preventDefault();
        if(password !== confirmPassword){
            return toast.error("Password not Matched")
        }
        const data = {
            username, email, password
        }
        const response = await SignUpApi(data);
        console.log(response);
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordType === "password" ? (
                        <FaRegEyeSlash
                            onClick={() => setPasswordType("text")}
                            className="cursor-pointer absolute right-[10px] bottom-[13px]"
                        />
                    ) : (
                        <FaRegEye
                            onClick={() => setPasswordType("password")}
                            className="cursor-pointer absolute right-[10px] bottom-[13px]"
                        />
                    )}
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
                <button className="bg-[--main-color] h-[40px] rounded-[5px] text-[16px] font-[600] mt-[5px]">
                    Signup
                </button>
            </form>
        </Modal>
    )
}

export default SignupModal