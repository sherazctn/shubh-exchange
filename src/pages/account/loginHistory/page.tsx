import Aos from "aos";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getUserDetailsApi } from "../../../api/api";
import Navbar from "../../../components/account/navbar";
import Sidebar from "../../../components/account/sidebar";
import useColorScheme from "../../../hooks/useColorScheme";

import LoginHistoryTable from "../../../components/account/LoginHistory/LoginHistoryTable";
import Loader from "../../../components/Loader";

const LoginHistory = ({ darkTheme }: any) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);
  const token = useSelector((state: any) => state.token);

  useEffect(() => {
    Aos.init({ once: true });
    fn_getUserLoginDetails();
  }, []);

  const fn_getUserLoginDetails = async () => {
    const response = await getUserDetailsApi(token);
    if (response?.status) {
      setData(response?.data);
    }
    setLoader(false);
  }

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"loginHistory"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
          }`}
      >
        <Navbar pageName={"Login History"} darkTheme={darkTheme} colors={colors} />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          {!loader ? <LoginHistoryTable colors={colors} data={data} /> : (
            <p className="text-center"><Loader size={25} color="black" /></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginHistory;
