import { createContext } from "react";
import Routers from "./routers";

export const ModalController = createContext<any>(null);

const App = () => {
  return <Routers />;
};

export default App;
