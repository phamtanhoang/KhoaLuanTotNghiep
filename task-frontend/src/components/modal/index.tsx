import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { ChangePassword, Signin, Signup } from "./auth";

const ModalBase = (props: any) => {
  // take props
  const funcs = props.funcs;
  const open = props.open;
  const handleClose = props.handleClose;

  const modalComponents: { [key: string]: React.ReactNode } = {
    [MODAL_KEYS.signin]: <Signin handleClose={handleClose} />,
    [MODAL_KEYS.signup]: <Signup handleClose={handleClose} />,
    [MODAL_KEYS.changePassword]: <ChangePassword handleClose={handleClose} />,
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
// onClick={() => {
//   context.setFuncs(MODAL_KEYS.login);
//   context.handleOpen();
// }}
