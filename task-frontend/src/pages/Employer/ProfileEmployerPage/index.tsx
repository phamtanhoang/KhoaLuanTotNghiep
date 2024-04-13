import { useContext, useEffect, useState } from "react";
import { BaseInfo, HumanResourceList, MoreDetail } from "./components";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import ModalBase from "@/components/modal";
import { LoadingContext } from "@/App";
import employersService from "@/services/employersService";
import { SwalHelper } from "@/utils/helpers/swalHelper";

const sampleData = [
  { image: "", name: "Phạm Tấn Hoàng" },
  { image: "", name: "Phạm Tấn Hoàng2" },
];

const ProfileEmployerPage = () => {
  const context = useContext(LoadingContext);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [employer, setEmployer] = useState<EmployerModel>();

  const fetchData = () => {
    context.handleOpenLoading();
    employersService
      .profile()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setEmployer(res.data.Data);
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
        data={employer}
      />

      <div className="bg-white lg:rounded-xl">
        <BaseInfo
          image={employer?.image}
          backgroundImage={employer?.backgroundImage}
          name={employer?.name}
          address={employer?.location}
          description={employer?.description}
          _onClickChangeImage={_onClickChangeImage}
          _onClickChangeBackgroundImage={_onClickChangeBackgroundImage}
          isVip
        />
      </div>

      <div className="bg-white lg:rounded-xl p-4 lg:p-8">
        <MoreDetail
          name={employer?.name}
          address={employer?.location}
          businessCode={employer?.businessCode}
          email={employer?.email}
          phoneNumber={employer?.phoneNumber}
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
