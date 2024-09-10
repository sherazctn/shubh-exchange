import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/page";

import Home from "./pages/home/page";
import Sports from "./pages/sports/page";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sports" element={<Sports />} />
      </Routes>
    </>
  );
}

export default App;
