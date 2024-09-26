import Aos from "aos";
import Cards from "react-credit-cards-2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Sidebar from "../../../components/account/sidebar";
import Navbar from "../../../components/account/navbar";
import useColorScheme from "../../../hooks/useColorScheme";

import cardImg from "../../../assets/card-img.png";
import cardBackImg from "../../../assets/card-back.png";

const PaymentInfo = ({ darkTheme }: any) => {
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector(
    (state: any) => state.dashboardDarkTheme
  );
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt: any) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: any) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"payment"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${
          smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
        }`}
      >
        <Navbar
          pageName={"Payment Information"}
          darkTheme={darkTheme}
          colors={colors}
        />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          <div className="flex">
            {/* card fields */}
            <div className="flex-1">
              <form className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[3px]">
                  <label
                    className="font-[500] text-[15px]"
                    style={{ color: colors.subText }}
                  >
                    Card Number
                  </label>
                  <input
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="h-[40px] px-[10px] rounded-[5px] focus:outline-none text-[15px]"
                    style={{ color: colors.text, backgroundColor: colors.dark }}
                  />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <label
                    className="font-[500] text-[15px]"
                    style={{ color: colors.subText }}
                  >
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Card Holder Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="h-[40px] px-[10px] rounded-[5px] focus:outline-none text-[15px]"
                    style={{ color: colors.text, backgroundColor: colors.dark }}
                  />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <label
                    className="font-[500] text-[15px]"
                    style={{ color: colors.subText }}
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="Expiry Date"
                    value={state.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="h-[40px] px-[10px] rounded-[5px] focus:outline-none text-[15px]"
                    style={{ color: colors.text, backgroundColor: colors.dark }}
                  />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <label
                    className="font-[500] text-[15px]"
                    style={{ color: colors.subText }}
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="h-[40px] px-[10px] rounded-[5px] focus:outline-none text-[15px]"
                    style={{ color: colors.text, backgroundColor: colors.dark }}
                  />
                </div>
              </form>
            </div>
            {/* card image */}
            {/* <div className="card-main flex-1 flex flex-col items-center justify-center">
              <div
                className="w-[350px] relative mt-[30px] h-[206px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div
                  className={`relative w-full h-full rounded-[10px] transform transition-transform duration-500 ${
                    isHovered ? "rotate-y-180" : ""
                  }`}
                >
                  <div
                    className={`absolute inset-0 w-full h-full backface-hidden rounded-[10px] ${
                      isHovered ? "hidden" : "block"
                    }`}
                    style={{ backgroundImage: `url(${cardImg})`, backgroundSize: 'contain' }}
                  >
                    <Cards
                      number={state.number}
                      expiry={state.expiry}
                      name={state.name}
                      cvc={state.cvc}
                      //@ts-ignore
                      focused={state.focus}
                    />
                  </div>
                  <div
                    className={`absolute inset-0 w-full h-full backface-hidden rounded-[10px] ${
                      isHovered ? "block" : "hidden"
                    }`}
                    style={{ backgroundImage: `url(${cardBackImg})`, backgroundSize: 'cover' }}
                  >
                    <Cards
                      number=""
                      expiry=""
                      cvc={state.cvc}
                      name=""
                      //@ts-ignore
                      focused={state.focus}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsHovered(!isHovered)}
                className="mt-[20px] w-[120px] h-[35px] rounded-[3px] text-[15px] font-[500]"
                style={{ backgroundColor: colors.text, color: colors.light }}
              >
                Show {!isHovered ? "Back" : "Front"}
              </button>
            </div> */}
            <div className="flex-1 flex flex-col items-center mt-[30px]">
              <div className="group relative h-[200px] w-[350px] flex justify-center">
                <div className="relative w-full rounded-xl transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* front */}
                  <div
                    className="front-side-card absolute inset-0 w-full h-full px-[20px] text-white flex flex-col gap-[30px] justify-center items-center rounded-xl [backface-visibility:hidden]"
                    style={{
                      backgroundImage: `url(${cardImg})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <Cards
                      number={state.number}
                      expiry={state.expiry}
                      name={state.name}
                      cvc={state.cvc}
                      //@ts-ignore
                      focused={state.focus}
                    />
                  </div>
                  {/* back */}
                  <div
                    className="back-side-card absolute inset-0 w-full h-full text-white flex flex-col justify-between gap-[20px] py-[30px] items-center rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]"
                    style={{
                      backgroundImage: `url(${cardBackImg})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <Cards
                      number={state.number}
                      expiry={state.expiry}
                      name={state.name}
                      cvc={state.cvc}
                      //@ts-ignore
                      focused={state.focus}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
