import Routers from "./routers";
import { Tooltip } from "react-tooltip";

const App = () => {
  return (
    <>
      <Tooltip id="tooltip" className="z-[999]" />
      <Routers />
    </>
  );
};

export default App;
