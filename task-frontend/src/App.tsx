import { createContext, useState } from "react";
import ModalBase from "./components/modal";
import Routers from "./routers";

export const ModalController = createContext<any>(null);

const App = () => {
  // modal context
  const [funcs, setFuncs] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [callBack, setCallBack] = useState<any>(null);

  const [dataModal, setDataModal] = useState<any>();

  return (
    <ModalController.Provider
      value={{
        funcs,
        setFuncs,
        open,
        setOpen,

        handleOpen,
        handleClose,

        dataModal,
        setDataModal,

        callBack,
        setCallBack,
      }}
    >
      <ModalBase
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        dataModal={dataModal}
      />
      <Routers />
    </ModalController.Provider>
  );
};

export default App;
