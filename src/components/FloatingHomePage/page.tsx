import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";

const FloatingHomePage = () => {
  const phone = useSelector((state: any) => state.whatsappPhone);
  console.log("phone ", phone);
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      title="Go to WhatsApp"
      className="fixed z-[99999] right-[30px] cursor-pointer bottom-[30px] min-h-[60px] rounded-full min-w-[60px] justify-center items-center"
      style={{ backgroundImage: "linear-gradient(45deg, #25D366, #128C7E)", display: phone ? "flex" : "none" }}
    >
      <FaWhatsapp className="text-[33px]" style={{ color: "white" }} />
    </a>
  );
};

export default FloatingHomePage;
