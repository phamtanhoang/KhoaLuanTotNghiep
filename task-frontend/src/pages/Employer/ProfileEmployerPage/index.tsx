import { useContext, useEffect, useState } from "react";
import { BaseInfo, HRDetail, HRInfo, MoreDetail } from "./components";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import ModalBase from "@/components/modal";
import { LoadingContext } from "@/App";
import employersService from "@/services/employersService";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  ONCHANGE_CURRENT_EMPLOYER,
  ONCHANGE_CURRENT_HR,
} from "@/store/reducers/employerReducer";
import { AuthHelper } from "@/utils/helpers/authHelper";
import humanResourcesService from "@/services/humanResourcesService";
import { FaEdit } from "react-icons/fa";

const ProfileEmployerPage = () => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { currentEmployer, currentHR } = useSelector(
    (state: any) => state.employerReducer
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
          SwalHelper.MiniAlert("Có lỗi xảy ra", "error");
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
            dispatch(ONCHANGE_CURRENT_HR(res.data.Data));
          } else {
            SwalHelper.MiniAlert(res.data.Message, "error");
          }
        })
        .catch(() => {
          SwalHelper.MiniAlert("Có lỗi xảy ra", "error");
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
    setFuncs(MODAL_KEYS.changeAvatar);
    handleOpen();
  };
  const _onClickChangeBackgroundImage = () => {
    setFuncs(MODAL_KEYS.changeBackground);
    handleOpen();
  };
  const _onClickChangeInfo = () => {
    setFuncs(MODAL_KEYS.changeInfoEmployer);
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
        data={currentEmployer}
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
            {/* <HumanResourceList value={sampleData} /> */}
          </div>
        </>
      ) : (
        <>
          <div className="bg-white w-1/2 lg:w-full overflow-hidden lg:rounded-lg h-max">
            <HRInfo
              avatar={currentHR?.avatar}
              firstName={currentHR?.firstName}
              lastName={currentHR?.lastName}
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
              firstName={currentHR?.firstName}
              lastName={currentHR?.lastName}
              dateOfBirth={currentHR?.dateOfBirth}
              email={currentHR?.email}
              phoneNumber={currentHR?.phoneNumber}
              sex={currentHR?.sex}
              status={currentHR?.status}
              employerName={currentHR?.employerName}
            />
          </div>
        </>
      )}
    </>
  );
};
export default ProfileEmployerPage;
