import {
  ChangePassword,
  RegisterEmployer,
  ResetPassword,
  Signin,
  Signup,
  VerifyEmail,
} from "./auth";
import { FilterModal } from "./filter";
import { ChangeDealine, CreateJob, DetailsJob, DetailsJobAdmin } from "./job";
import { ChangeAvatar, ChangeBackground, ChooseImage } from "./image";

import {
  CandidateCV,
  CandidateDetail,
  CandidateUpdate,
  ChangeExpSkillInfoCandidate,
  ChangeInfoCandidate,
  MyCV,
} from "./candidate";
import {
  ApplicationDetail,
  ApplicationStep,
  ApplyJob,
  CreateSchedule,
  DetailSchedule,
  HandleApplication,
} from "./application";
import { ChangeInfoEmployer, EmployerUpdate } from "./employer";
import { CreateTag, UpdateTag } from "./tag";
import { CreateCategory, UpdateCategory } from "./category";
import {
  CreateHumanResource,
  UpdateHumanResource,
  ChangeInfoHumanResource,
} from "./humanResource";
import { CreateProcedure, UpdateProcedure } from "./procedure";
import { ModalConstants } from "@/utils/constants";
import { ChatApplication } from "./chat";
import { Checkout, CreateVip, DetailTransaction, UpdateVip } from "./vip";
import { sub } from "date-fns";

const ModalBase = (props: any) => {
  // take props
  const id = props.id;
  const stepId = props.stepId;
  const type = props.type;
  const funcs = props.funcs;
  const setFuncs = props.setFuncs;
  const open = props.open;
  const handleClose = props.handleClose;
  const image = props.image;
  const setCroppedImg = props.setCroppedImg;
  const fetchData = props.fetchData;
  const data = props.data;
  const email = props.email;
  const password = props.password;
  const subId = props.subId;

  const status = props.status;
  const _onClickUpDateStep = props._onClickUpDateStep;

  const modalComponents: { [key: string]: React.ReactNode } = {
    [ModalConstants.AUTH_KEYS.signin]: (
      <Signin handleClose={handleClose} setFuncs={setFuncs} />
    ),
    [ModalConstants.AUTH_KEYS.signup]: (
      <Signup handleClose={handleClose} setFuncs={setFuncs} />
    ),
    [ModalConstants.AUTH_KEYS.verifyEmail]: (
      <VerifyEmail id={id} handleClose={handleClose} fetchData={fetchData} />
    ),
    [ModalConstants.AUTH_KEYS.resetPassword]: (
      <ResetPassword handleClose={handleClose} />
    ),
    [ModalConstants.AUTH_KEYS.changePassword]: (
      <ChangePassword setFuncs={setFuncs} handleClose={handleClose} />
    ),

    [ModalConstants.APPLICATION_KEYS.applyJob]: (
      <ApplyJob id={id} fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.CANDIDATE_KEYS.changeInfoCandidate]: (
      <ChangeInfoCandidate fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.CANDIDATE_KEYS.changeExpSkillInfoCandidate]: (
      <ChangeExpSkillInfoCandidate
        fetchData={fetchData}
        type={type}
        handleClose={handleClose}
      />
    ),
    [ModalConstants.APPLICATION_KEYS.applycationDetail]: (
      <ApplicationDetail
        id={id}
        fetchData={fetchData}
        handleClose={handleClose}
      />
    ),

    [ModalConstants.AUTH_KEYS.registerEmployer]: (
      <RegisterEmployer
        email={email}
        password={password}
        handleClose={handleClose}
      />
    ),

    [ModalConstants.COMMON_KEYS.filter]: (
      <FilterModal handleClose={handleClose} />
    ),
    [ModalConstants.JOB_KEYS.createJob]: (
      <CreateJob fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.JOB_KEYS.detailJob]: (
      <DetailsJob id={id} fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.JOB_KEYS.detailJobAdmin]: (
      <DetailsJobAdmin
        id={id}
        fetchData={fetchData}
        handleClose={handleClose}
      />
    ),
    [ModalConstants.JOB_KEYS.changeDealine]: (
      <ChangeDealine id={id} fetchData={fetchData} handleClose={handleClose} />
    ),

    [ModalConstants.COMMON_KEYS.changeAvatar]: (
      <ChangeAvatar fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.EMPLOYER_KEYS.changeBackground]: (
      <ChangeBackground fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.EMPLOYER_KEYS.changeInfoEmployer]: (
      <ChangeInfoEmployer
        data={data}
        fetchData={fetchData}
        handleClose={handleClose}
      />
    ),

    [ModalConstants.TAG_KEYS.createTag]: (
      <CreateTag fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.TAG_KEYS.updateTag]: (
      <UpdateTag id={id} fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.CATEGORY_KEYS.createCategory]: (
      <CreateCategory fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.CATEGORY_KEYS.updateCategory]: (
      <UpdateCategory id={id} fetchData={fetchData} handleClose={handleClose} />
    ),

    [ModalConstants.COMMON_KEYS.chooseImage]: (
      <ChooseImage
        image={image}
        setCroppedImg={setCroppedImg}
        handleClose={handleClose}
      />
    ),
    [ModalConstants.EMPLOYER_KEYS.updateEmployer]: (
      <EmployerUpdate id={id} fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.CANDIDATE_KEYS.updateCandidate]: (
      <CandidateUpdate
        id={id}
        fetchData={fetchData}
        handleClose={handleClose}
      />
    ),
    [ModalConstants.CANDIDATE_KEYS.detailCandidate]: (
      <CandidateDetail
        id={id}
        fetchData={fetchData}
        handleClose={handleClose}
      />
    ),
    [ModalConstants.CANDIDATE_KEYS.candidateCV]: (
      <CandidateCV id={id} fetchData={fetchData} handleClose={handleClose} />
    ),

    [ModalConstants.CANDIDATE_KEYS.myCV]: (
      <MyCV id={id} handleClose={handleClose} />
    ),

    [ModalConstants.HUMANRESOURCE_KEYS.createHumanResource]: (
      <CreateHumanResource fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.HUMANRESOURCE_KEYS.updateHumanResource]: (
      <UpdateHumanResource
        id={id}
        fetchData={fetchData}
        handleClose={handleClose}
      />
    ),
    [ModalConstants.HUMANRESOURCE_KEYS.changeInfoHumanResource]: (
      <ChangeInfoHumanResource
        data={data}
        fetchData={fetchData}
        handleClose={handleClose}
      />
    ),

    [ModalConstants.PROCEDURE_KEYS.createProcedure]: (
      <CreateProcedure fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.PROCEDURE_KEYS.updateProcedure]: (
      <UpdateProcedure
        id={id}
        fetchData={fetchData}
        handleClose={handleClose}
      />
    ),

    [ModalConstants.CHAT_KEYS.chatApplication]: (
      <ChatApplication handleClose={handleClose} />
    ),
    [ModalConstants.APPLICATION_KEYS.applycationStep]: (
      <ApplicationStep id={id} stepId={stepId} handleClose={handleClose} />
    ),
    [ModalConstants.APPLICATION_KEYS.createSchedule]: (
      <CreateSchedule
        subId={subId}
        fetchData={fetchData}
        handleClose={handleClose}
      />
    ),
    [ModalConstants.APPLICATION_KEYS.detailSchedule]: (
      <DetailSchedule
        id={subId}
        type={type}
        fetchData={fetchData}
        handleClose={handleClose}
        setFuncs={setFuncs}
      />
    ),
    [ModalConstants.APPLICATION_KEYS.handleApplication]: (
      <HandleApplication
        status={status}
        _onClickUpDateStep={_onClickUpDateStep}
        handleClose={handleClose}
      />
    ),
    [ModalConstants.VIP_KEYS.createVip]: (
      <CreateVip fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.VIP_KEYS.updateVip]: (
      <UpdateVip id={id} fetchData={fetchData} handleClose={handleClose} />
    ),
    [ModalConstants.VIP_KEYS.checkout]: (
      <Checkout id={id} handleClose={handleClose} />
    ),
    [ModalConstants.VIP_KEYS.detailTransaction]: (
      <DetailTransaction id={id} handleClose={handleClose} />
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
