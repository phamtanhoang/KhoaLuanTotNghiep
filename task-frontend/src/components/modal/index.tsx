import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { ChangePassword, RegisterEmployer, Signin, Signup } from "./auth";
import FilterModal from "./filter";
import { CreateJob } from "./job";
import { ChangeAvatar, ChangeBackground, ChooseImage } from "./image";

import { ChangeExpSkillInfoCandidate, ChangeInfoCandidate } from "./candidate";
import { ApplicationDetail, ApplyJob } from "./application";
import { ChangeInfoEmployer, EmployerUpdate } from "./employer";
import { CreateTag, UpdateTag } from "./tag";
import { CreateCategory, UpdateCategory } from "./category";

const ModalBase = (props: any) => {
  // take props
  const id = props.id;
  const type = props.type;
  const funcs = props.funcs;
  const setFuncs = props.setFuncs;
  const open = props.open;
  const handleClose = props.handleClose;
  const image = props.image;
  const setCroppedImg = props.setCroppedImg;
  const fetchData = props.fetchData;
  const data = props.data;
  const setData = props.setData;

  const email = props.email;
  const password = props.password;

  const modalComponents: { [key: string]: React.ReactNode } = {
    [MODAL_KEYS.signin]: (
      <Signin handleClose={handleClose} setFuncs={setFuncs} />
    ),
    [MODAL_KEYS.signup]: (
      <Signup handleClose={handleClose} setFuncs={setFuncs} />
    ),
    [MODAL_KEYS.changePassword]: (
      <ChangePassword setFuncs={setFuncs} handleClose={handleClose} />
    ),
    [MODAL_KEYS.applyJob]: <ApplyJob handleClose={handleClose} />,
    [MODAL_KEYS.changeInfoCandidate]: (
      <ChangeInfoCandidate fetchData={fetchData} handleClose={handleClose} />
    ),
    [MODAL_KEYS.changeExpSkillInfoCandidate]: (
      <ChangeExpSkillInfoCandidate type={type} handleClose={handleClose} />
    ),
    [MODAL_KEYS.applycationDetail]: (
      <ApplicationDetail handleClose={handleClose} />
    ),

    [MODAL_KEYS.registerEmployer]: (
      <RegisterEmployer
        email={email}
        password={password}
        handleClose={handleClose}
      />
    ),

    [MODAL_KEYS.filter]: <FilterModal handleClose={handleClose} />,
    [MODAL_KEYS.createJob]: <CreateJob handleClose={handleClose} />,
    [MODAL_KEYS.filter]: <FilterModal handleClose={handleClose} />,

    [MODAL_KEYS.changeAvatar]: (
      <ChangeAvatar fetchData={fetchData} handleClose={handleClose} />
    ),
    [MODAL_KEYS.changeBackground]: (
      <ChangeBackground fetchData={fetchData} handleClose={handleClose} />
    ),
    [MODAL_KEYS.changeInfoEmployer]: (
      <ChangeInfoEmployer
        data={data}
        fetchData={fetchData}
        handleClose={handleClose}
      />
    ),

    [MODAL_KEYS.createTag]: (
      <CreateTag fetchData={fetchData} handleClose={handleClose} />
    ),
    [MODAL_KEYS.updateTag]: (
      <UpdateTag id={id} fetchData={fetchData} handleClose={handleClose} />
    ),
    [MODAL_KEYS.createCategory]: (
      <CreateCategory fetchData={fetchData} handleClose={handleClose} />
    ),
    [MODAL_KEYS.updateCategory]: (
      <UpdateCategory id={id} fetchData={fetchData} handleClose={handleClose} />
    ),

    [MODAL_KEYS.chooseImage]: (
      <ChooseImage
        image={image}
        setCroppedImg={setCroppedImg}
        handleClose={handleClose}
      />
    ),
    [MODAL_KEYS.updateEmployer]: (
      <EmployerUpdate id={id} fetchData={fetchData} handleClose={handleClose} />
    ),
  };

  const selectedComponent = modalComponents[funcs];

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

// const [open, setOpen] = useState(false);
//   const [funcs, setFuncs] = useState<string>("");
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
