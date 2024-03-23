import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { ChangePassword, RegisterEmployer, Signin, Signup } from "./auth";
import { CreateJob } from "./job";
import FilterModal from "./filter";
import { ChangeAvatar, ChangeBackground } from "./image";
import ChangeInfoEmployer from "./infomation/ChangeInfoEmployer";

const ModalBase = (props: any) => {
  // take props
  const funcs = props.funcs;
  const open = props.open;
  const handleClose = props.handleClose;

  const modalComponents: { [key: string]: React.ReactNode } = {
    [MODAL_KEYS.signin]: <Signin handleClose={handleClose} />,
    [MODAL_KEYS.signup]: <Signup handleClose={handleClose} />,
    [MODAL_KEYS.changePassword]: <ChangePassword handleClose={handleClose} />,
    [MODAL_KEYS.registerEmployer]: (
      <RegisterEmployer handleClose={handleClose} />
    ),

    [MODAL_KEYS.filter]: <FilterModal handleClose={handleClose} />,
    [MODAL_KEYS.createJob]: <CreateJob handleClose={handleClose} />,
    [MODAL_KEYS.filter]: <FilterModal handleClose={handleClose} />,

    [MODAL_KEYS.changeAvatar]: <ChangeAvatar handleClose={handleClose} />,
    [MODAL_KEYS.changeBackground]: (
      <ChangeBackground handleClose={handleClose} />
    ),
    [MODAL_KEYS.changeInfoEmployer]: (
      <ChangeInfoEmployer handleClose={handleClose} />
    ),
  };

  const selectedComponent = modalComponents[funcs] || handleClose(false);

  return (
    <>
      {open && (
        <div className="fixed z-[1000] top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
          {selectedComponent}
        </div>
      )}
    </>
  );
};

export default ModalBase;

//open
// const context = useContext(ModalController);
// onClick={() => {
//   context.setFuncs(MODAL_KEYS.login);
//   context.handleOpen();
// }}
