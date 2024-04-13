import { useContext, useEffect, useState } from "react";
import { BaseInfo, HumanResourceList, MoreDetail } from "./components";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import ModalBase from "@/components/modal";
import { LoadingContext } from "@/App";
import employersService from "@/services/employersService";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { useDispatch, useSelector } from "react-redux";
import { ONCHANGE_CURRENT_EMPLOYER } from "@/store/reducers/employerReducer";

const sampleData = [
  { image: "", name: "Phạm Tấn Hoàng" },
  { image: "", name: "Phạm Tấn Hoàng2" },
];

const ProfileEmployerPage = () => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { currentEmployer } = useSelector(
    (state: any) => state.employerReducer
  );

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = () => {
    context.handleOpenLoading();
    employersService
      .profile()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_CURRENT_EMPLOYER(res.data.Data));
          handleClose();
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
        <HumanResourceList value={sampleData} />
      </div>
    </>
  );
};
export default ProfileEmployerPage;
