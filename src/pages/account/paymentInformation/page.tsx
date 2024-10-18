import Aos from "aos";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../../../components/account/sidebar";
import Navbar from "../../../components/account/navbar";
import useColorScheme from "../../../hooks/useColorScheme";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";
import PaymentInformationTable from "../../../components/account/PaymentInformation/PaymentInformationTable";

const PaymentInformation = ({ darkTheme }: any) => {
    const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);
    const smallSidebar = useSelector((state: any) => state.smallSidebar);
    const colorScheme = useSelector((state: any) => state.colorScheme);
    const colors = useColorScheme(dashboardDarkTheme, colorScheme);

    const panelSecColor = useSelector((state: any) => state.panelSecColor);
    const panelMainColor = useSelector((state: any) => state.panelMainColor);

    const [selectedTab, setSelectedTab] = useState("deposit");

    useEffect(() => {
        Aos.init({ once: true });
    }, []);

    return (
        <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
            <Sidebar colors={colors} path={"paymentInformation"} />
            <div
                className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
                    }`}
            >
                <Navbar pageName={"Payment Information"} darkTheme={darkTheme} colors={colors} />
                <div className="mt-[15px] px-[10px] sm:px-[20px]">
                    <div className="flex gap-[15px]">
                        <Button
                            colors={colors}
                            title={"Deposit"}
                            selectedTab={selectedTab}
                            setSelectedTab={() => setSelectedTab("deposit")}
                            value={"deposit"}
                            icon={<PiHandDeposit className="text-[22px]" />}
                            panelMainColor={panelMainColor}
                            panelSecColor={panelSecColor}
                        />
                        <Button
                            colors={colors}
                            title={"Withdraw"}
                            selectedTab={selectedTab}
                            setSelectedTab={() => setSelectedTab("withdraw")}
                            value={"withdraw"}
                            icon={<PiHandWithdraw className="text-[22px]" />}
                            panelMainColor={panelMainColor}
                            panelSecColor={panelSecColor}
                        />
                    </div>
                </div>
                <div className="mt-[30px] px-[10px] sm:px-[20px]">
                    <PaymentInformationTable colors={colors} />
                </div>
            </div>
        </div>
    );
};

export default PaymentInformation;

const Button = ({ colors, title, selectedTab, value, setSelectedTab, icon, panelMainColor, panelSecColor }: any) => {
    return (
        <button
            className="h-[40px] px-[17px] min-w-[140px] rounded-[7px] shadow-sm font-[500] pt-[1px] text-[15px] flex items-center justify-center gap-[10px]"
            style={{
                backgroundColor: selectedTab === value ? panelSecColor : panelMainColor,
                color: selectedTab === value ? colors.light : panelSecColor,
            }}
            onClick={setSelectedTab}
        >
            {icon}
            {title}
        </button>
    );
};