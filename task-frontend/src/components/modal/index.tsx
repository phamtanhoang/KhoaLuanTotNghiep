import { Login } from "./auth";
import { CreateJob, DeleteJob } from "./job";

const ModalBase = (props: any) => {
  // take props
  const funcs = props.funcs;
  const open = props.open;
  const handleClose = props.handleClose;

  const modalComponents: { [key: string]: React.ReactNode } = {
    login: <Login handleClose={handleClose} />,
    createJob: <CreateJob handleClose={handleClose} />,
    deleteJob: <DeleteJob handleClose={handleClose} />,
  };

  const selectedComponent = modalComponents[funcs] || handleClose(false);

  return (
    <>
      {open && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
          {selectedComponent}
        </div>
      )}
    </>
  );
};

export default ModalBase;
