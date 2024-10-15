import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaHome } from "react-icons/fa";

const FloatingHomePage = ({ colors }: any) => {
  const webColor = useSelector((state: any) => state.websiteColor);
  return (
    <Link
      to={"/"}
      title="Go to Home"
      className="fixed z-[99999] right-[30px] cursor-pointer bottom-[30px] min-h-[60px] rounded-full min-w-[60px] flex justify-center items-center"
      style={{ backgroundColor: webColor }}
    >
      <FaHome className="text-[35px]" style={{ color: colors.bg }} />
    </Link>
  );
};

export default FloatingHomePage;
