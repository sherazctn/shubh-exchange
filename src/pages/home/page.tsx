import { useSelector } from "react-redux"

import Sidebar from "../../components/sidebar/page"
import HeroSection from "../../components/home/HeroSection";
import CardsSection from "../../components/home/cardsSection";
import DropdownsSection from "../../components/home/DropdownsSection";

const Home = () => {
  const showSidebar = useSelector((state: any) => state.showSidebar);
  return (
    <div className="main-section">
        <Sidebar />
        <div className={`content ${showSidebar ? "ps-[285px]" : "ps-[85px]"} pe-[20px] pb-[20px]`}>
          <HeroSection />
          <CardsSection />
          <DropdownsSection text={"Live Cricket"} />
        </div>
    </div>
  )
}

export default Home