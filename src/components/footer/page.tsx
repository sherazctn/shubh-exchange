import { GoShieldCheck } from "react-icons/go";
import { IoWarningOutline } from "react-icons/io5";
import { PiNotepadLight } from "react-icons/pi";
import { RiErrorWarningLine } from "react-icons/ri";
import { LuFileEdit } from "react-icons/lu";
import { IoLogoAndroid } from "react-icons/io";

const Footer = () => {
  return (
    <div className="flex flex-col flex-wrap md:flex-row md:justify-between gap-[40px] w-full pb-[60px]">
      {/* info */}
      <div className="flex-1">
        <p className="font-[500]">Info</p>
        <div className="mt-[20px] flex flex-col gap-[15px]">
          <p className="text-[14px] cursor-pointer flex items-center gap-[7px] w-[max-content]">
            <GoShieldCheck className="text-[16px]" />
            <span className="block mt-[1px]">Privacy Policy</span>
          </p>
          <p className="text-[14px] cursor-pointer flex items-center gap-[7px] w-[max-content]">
            <PiNotepadLight className="text-[16px]" />
            <span className="block mt-[1px]">Terms & Condition</span>
          </p>
          <p className="text-[14px] cursor-pointer flex items-center gap-[7px] w-[max-content]">
            <IoWarningOutline className="text-[16px]" />
            <span className="block mt-[1px]">Gambling can be addictive</span>
          </p>
        </div>
      </div>
      {/* Get Started */}
      <div className="flex-1">
        <p className="font-[500]">Get Started</p>
        <div className="mt-[20px] flex flex-col gap-[15px]">
          <p className="text-[14px] cursor-pointer flex items-center gap-[7px] w-[max-content]">
            <RiErrorWarningLine className="text-[16px]" />
            <span className="block mt-[1px]">About Us</span>
          </p>
          <p className="text-[14px] cursor-pointer flex items-center gap-[7px] w-[max-content]">
            <LuFileEdit className="text-[16px]" />
            <span className="block mt-[1px]">KYC & Privacy Policy</span>
          </p>
        </div>
      </div>
      {/* Company Name */}
      <div className="flex-1">
        <p className="font-[500]">Company Name</p>
        <div className="mt-[20px] flex flex-col gap-[15px]">
          <p className="text-[14px] cursor-pointer flex items-center gap-[7px] w-[max-content]">
            <IoLogoAndroid className="text-[17px]" />
            <span className="block mt-[2px]">Download Our App</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
