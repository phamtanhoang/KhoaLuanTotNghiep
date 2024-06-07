import { useContext, useEffect, useState } from "react";
import {
  BaseInfo,
  FollowerList,
  HRDetail,
  HRInfo,
  MoreDetail,
} from "./components";
import ModalBase from "@/components/modal";
import { LoadingContext } from "@/App";
import { employersService } from "@/services";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  ONCHANGE_CURRENT_EMPLOYER,
  ONCHANGE_CURRENT_HUMANRESOURCE,
} from "@/store/reducers/authReducer";
import { AuthHelper } from "@/utils/helpers";
import humanResourcesService from "@/services/humanResourcesService";
import { FaEdit } from "react-icons/fa";
import { ModalConstants } from "@/utils/constants";

const ProfileEmployerPage = () => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { currentEmployer, currentHumanResource } = useSelector(
    (state: any) => state.authReducer
  );

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = () => {
    context.handleOpenLoading();
    if (AuthHelper.isEmployer()) {
      employersService
        .profile()
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            dispatch(ONCHANGE_CURRENT_EMPLOYER(res.data.Data));
          } else {
            SwalHelper.MiniAlert(res.data.Message, "error");
          }
        })
        .catch(() => {
          SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
        })
        .finally(() => {
          context.handleCloseLoading();
        });
      return;
    } else {
      humanResourcesService
        .profile()
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            dispatch(ONCHANGE_CURRENT_HUMANRESOURCE(res.data.Data));
          } else {
            SwalHelper.MiniAlert(res.data.Message, "error");
          }
        })
        .catch(() => {
          SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
        })
        .finally(() => {
          context.handleCloseLoading();
        });
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const _onClickChangeImage = () => {
    setFuncs(ModalConstants.COMMON_KEYS.changeAvatar);
    handleOpen();
  };
  const _onClickChangeBackgroundImage = () => {
    setFuncs(ModalConstants.EMPLOYER_KEYS.changeBackground);
    handleOpen();
  };
  const _onClickChangeInfo = () => {
    if (AuthHelper.isEmployer()) {
      setFuncs(ModalConstants.EMPLOYER_KEYS.changeInfoEmployer);
    } else {
      setFuncs(ModalConstants.HUMANRESOURCE_KEYS.changeInfoHumanResource);
    }

    handleOpen();
  };
  return (
    <>
      <ModalBase
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        setFuncs={setFuncs}
        fetchData={fetchData}
        data={currentEmployer || currentHumanResource}
      />

      {AuthHelper.isEmployer() ? (
        <>
          <div className="bg-white lg:rounded-xl">
            <BaseInfo
              image={currentEmployer?.image}
              backgroundImage={currentEmployer?.backgroundImage}
              name={currentEmployer?.name}
              address={currentEmployer?.location}
              description={currentEmployer?.description}
              _onClickChangeImage={_onClickChangeImage}
              _onClickChangeBackgroundImage={_onClickChangeBackgroundImage}
              isVip={currentEmployer?.isVip}
            />
          </div>

          <div className="bg-white lg:rounded-xl p-4 lg:p-8">
            <MoreDetail
              name={currentEmployer?.name}
              address={currentEmployer?.location}
              businessCode={currentEmployer?.businessCode}
              email={currentEmployer?.email}
              phoneNumber={currentEmployer?.phoneNumber}
              _onClickChangeInfo={_onClickChangeInfo}
            />
          </div>

          <div className="bg-white lg:rounded-lg p-4 lg:p-8">
            <FollowerList />
          </div>
        </>
      ) : (
        <>
          <div className="bg-white w-1/2 lg:w-full overflow-hidden lg:rounded-lg h-max">
            <HRInfo
              avatar={currentHumanResource?.avatar}
              firstName={currentHumanResource?.firstName}
              lastName={currentHumanResource?.lastName}
              _onClickChangeImage={_onClickChangeImage}
            />
            <div className="px-4 py-4 lg:px-6 flex justify-between gap-4 border-b border-gray-200">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                Thông tin tài khoản
              </h3>
              <button
                className="text-gray-800 hover:text-orangetext p-1.5"
                onClick={_onClickChangeInfo}
              >
                <FaEdit className="text-xl" />
              </button>
            </div>
            <HRDetail
              firstName={currentHumanResource?.firstName}
              lastName={currentHumanResource?.lastName}
              dateOfBirth={currentHumanResource?.dateOfBirth}
              email={currentHumanResource?.email}
              phoneNumber={currentHumanResource?.phoneNumber}
              sex={currentHumanResource?.sex}
              status={currentHumanResource?.status}
              employerName={currentHumanResource?.employerName}
            />
          </div>
        </>
      )}
    </>
  );
};
export default ProfileEmployerPage;
