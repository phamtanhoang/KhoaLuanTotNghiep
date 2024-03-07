import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

const CandidatePage = () => {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};
export default CandidatePage;
