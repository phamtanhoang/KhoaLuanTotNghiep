import { Home, Schedule } from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
