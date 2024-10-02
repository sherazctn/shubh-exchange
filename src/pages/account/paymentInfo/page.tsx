import Aos from "aos";
import Cards from "react-credit-cards-2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Navbar from "../../../components/account/navbar";
import Sidebar from "../../../components/account/sidebar";
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
  const [isFlipped, setIsFlipped] = useState(false);

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

  const handleInputChangeCvc = (evt: any) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
    setIsFlipped(true);
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
        <div className="mt-[15px] px-[10px] pb-[30px] sm:px-[20px]">
          <div className="flex flex-col lg:flex-row">
            {/* card fields */}
            <div className="flex-1">
              <form className="flex flex-col gap-[20px]" autoComplete="new-password">
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
                    autoComplete="false"
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
                    onChange={handleInputChangeCvc}
                    onFocus={handleInputFocus}
                    className="h-[40px] px-[10px] rounded-[5px] focus:outline-none text-[15px]"
                    style={{ color: colors.text, backgroundColor: colors.dark }}
                  />
                </div>
              </form>
            </div>
            {/* card image */}
            <div className="flex-1 flex flex-col items-center sm:mt-[30px]">
              <div className="group relative h-[200px] w-[350px] flex justify-center scale-[0.65] sm:scale-[1]">
                <div
                  className={`relative w-full rounded-xl transition-transform duration-1000 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                  onMouseEnter={() => setIsFlipped(true)}
                  onMouseLeave={() => setIsFlipped(false)}
                >
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
              <button
                className="w-[max-content] px-[15px] sm:w-[350px] sm:mt-[40px] rounded-[7px] h-[43px] text-[15px] font-[500]"
                style={{ backgroundColor: colors.text, color: colors.light }}
              >
                Save Account Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
