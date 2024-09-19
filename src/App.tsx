import "./App.css";
import "aos/dist/aos.css";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/page";
import Sidebar from "./components/sidebar/page";
import Home from "./pages/home/page";
import Sports from "./pages/sports/page";
import Inplay from "./pages/inplay/page";
import LiveCricket from "./pages/cricket/LiveCricket";

function App() {
  return (
    <>
      <Navbar />
      <div className="main-section">
        <Sidebar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-sports" element={<Sports />} />
            <Route path="/in-play" element={<Inplay />} />
            <Route path="/cricket/live" element={<LiveCricket />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
