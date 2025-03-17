import { Modal } from "antd"
import { useState } from "react";
import toast from "react-hot-toast";
import OtpInput from 'react-otp-input';
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
// import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

import { SignUpApi } from "../../api/api";
// import { auth } from "../../firebase.config";
import { authenticate, updateSportPermission, updateUsername } from "../../features/features";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Loader from "../Loader";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

const SignupModal = ({ signupModal, setSignupModal, webName, webColor }: any) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [loader, setLoader] = useState(false);
    const [lengthError, setLengthError] = useState(true);
    const [characterError, setCharacterError] = useState(true);

    const [otp, setOtp] = useState("");
    const [otpForm, setOtpForm] = useState(false);
    // const [otpSession, setOtpSession] = useState("");
    const [otpLoader, setOtpLoader] = useState(false);

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
        if (phone.length < 5) {
            return toast.error("Write Correct Phone Number")
        }
        if (lengthError || characterError) {
            return toast.error("Write strong password");
        }
        setLoader(true);
        const phoneNumber = "+" + phone;
        const response = await SignUpApi({
            username, phone: phoneNumber, password
        });
        if (response?.status) {
            setSignupModal(false);
            setUsername("");
            setPhone("");
            setPassword("");
            setPasswordType("password");
            setLoader(false);
            setLengthError(true);
            setCharacterError(true);
            dispatch(authenticate(true));
            dispatch(updateUsername(response?.data?.username));
            dispatch(updateSportPermission(response?.data?.sportPermission || {}));
            return toast.success(response?.message)
        } else {
            setLoader(false);
            return toast.error(response?.message)
        }
        // try {
        //     const response = await axios.post(`https://2factor.in/API/V1/b8909c0f-8bec-11ef-8b17-0200cd936042/SMS/${phoneNumber}/AUTOGEN/:otp_template_name`);
        //     console.log("response for sending OTP ==> ", response);
        //     if (response?.status === 200) {
        //         if (response?.data?.Status === "Success") {
        //             setLoader(false);
        //             setOtpForm(true);
        //             setOtpSession(response?.data?.Details);
        //             return toast.success("OTP sent to your Phone Number");
        //         }
        //     } else {
        //         return toast.error("Error sending OTP, Try Again!");
        //     }
        // } catch (error: any) {
        //     setLoader(false);
        //     console.log("error is sending OTP ==> ", error);
        //     toast.error(error?.response?.data?.Details || "Try again Later")
        // }
    }

    const fn_backtoSignUp = () => {
        setOtpForm(false);
        setOtp("");
        setOtpLoader(false);
    }

    // const fn_otpSubmit = async () => {
    //     if (otp === "") {
    //         setLoader(true);
    //         return toast.error("Enter OTP");
    //     }
    //     if (otp.length !== 6) {
    //         return toast.error("Enter Correct OTP");
    //     }
    //     setOtpLoader(true);
    //     const response = await axios.post(`https://2factor.in/API/V1/b8909c0f-8bec-11ef-8b17-0200cd936042/SMS/VERIFY/${otpSession}/${otp}`);
    //     console.log("Verify OTP ===> ", response);
    // }

    return (
        <Modal
            title=""
            centered
            open={signupModal}
            onOk={() => {
                setSignupModal(false);
                setOtpForm(false);
            }}
            onCancel={() => {
                setSignupModal(false);
                setOtpForm(false);
            }}
            footer={null}
            style={{ fontFamily: "Roboto" }}
        >
            <div className="flex justify-center font-[700] text-[30px] sm:text-[35px] gap-[8px]">
                {/* {webName} */}
                Signup
            </div>
            {!otpForm ? (
                <form onSubmit={fn_submit} className="flex flex-col gap-[14px]">
                    <div className="flex flex-col gap-[3px]">
                        <label
                            htmlFor="username"
                            className="font-[600] text-[16px] sm:text-[18px]"
                        >
                            Username
                        </label>
                        <input
                            className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px]"
                            style={{ outlineColor: webColor }}
                            id="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        <label className="font-[600] text-[16px] sm:text-[18px]">
                            Phone Number
                        </label>
                        <PhoneInput
                            country={'in'}
                            value={phone}
                            onChange={(e) => setPhone(e)}
                            inputStyle={{
                                width: "100%",
                                borderColor: "#e5e7eb"
                            }}
                            inputProps={{
                                required: true,

                            }}
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
                            className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px]"
                            style={{ outlineColor: webColor }}
                            id="password"
                            required
                            value={password}
                            onChange={(e) => fn_setPassword(e.target.value)}
                        />
                        {passwordType === "password" ? (
                            <FaRegEyeSlash
                                onClick={() => setPasswordType("text")}
                                className="cursor-pointer absolute right-[10px] bottom-[55px] sm:bottom-[37px]"
                            />
                        ) : (
                            <FaRegEye
                                onClick={() => setPasswordType("password")}
                                className="cursor-pointer absolute right-[10px] bottom-[55px] sm:bottom-[37px]"
                            />
                        )}
                        <div className="text-[13px] flex flex-col sm:flex-row sm:items-center sm:gap-[30px]">
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
                    <button className={`relative text-[--text-color] h-[40px] rounded-[5px] text-[16px] font-[600] mt-[5px] flex justify-center items-center ${loader ? "cursor-not-allowed" : "cursor-pointer"}`} style={{ backgroundColor: webColor }}>
                        {!loader ? "Signup" : <Loader color="var(--text-color)" size={20} />}
                    </button>
                </form>
            ) : (
                <>
                    <p className="mt-[20px] font-[600]">Enter OTP!</p>
                    <div className="flex justify-center mt-[20px] mb-[30px]">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className='mx-[5px]'></span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{ width: "50px", height: "50px", border: "1px solid gray", fontSize: "16px", fontWeight: "600", borderRadius: "8px" }}
                        />
                    </div>
                    <button className={`relative w-full text-[--text-color] h-[40px] rounded-[5px] text-[16px] font-[600] mt-[5px] flex justify-center items-center ${otpLoader ? "cursor-not-allowed" : "cursor-pointer"}`} style={{ backgroundColor: webColor }}>
                        {!otpLoader ? "Verify OTP" :
                            <Loader color="var(--text-color)" size={20} />
                        }
                    </button>
                    <p className="mt-[10px] font-[500] hover:underline cursor-pointer" onClick={fn_backtoSignUp}>Back to the Signup ?</p>
                </>
            )}
        </Modal>
    )
}

export default SignupModal
