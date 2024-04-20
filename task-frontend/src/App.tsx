import { createContext, useState } from "react";
import { LoadingSpiner } from "./components/ui";
import Routers from "./routers";
import { Tooltip } from "react-tooltip";

export const LoadingContext = createContext<any>(null);

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOpenLoading = () => setIsLoading(true);
  const handleCloseLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ handleOpenLoading, handleCloseLoading }}>
      {isLoading && <LoadingSpiner />}
      <Tooltip id="tooltip" className="z-[999]" />
      <Routers />
    </LoadingContext.Provider>
  );
};

export default App;
