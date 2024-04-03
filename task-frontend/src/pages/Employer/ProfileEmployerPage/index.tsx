import { useContext } from "react";
import { BaseInfo, HumanResourceList, MoreDetail } from "./components";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";

const sampleData = [
  { image: "", name: "Phạm Tấn Hoàng" },
  { image: "", name: "Phạm Tấn Hoàng2" },
];

const ProfileEmployerPage = () => {

  const _onClickChangeImage = () => {
    // context.setFuncs(MODAL_KEYS.changeAvatar);
    // context.handleOpen();
  };
  const _onClickChangeBackgroundImage = () => {
    // context.setFuncs(MODAL_KEYS.changeBackground);
    // context.handleOpen();
  };
  const _onClickChangeInfo = () => {
    // context.setFuncs(MODAL_KEYS.changeInfoEmployer);
    // context.handleOpen();
  };
  return (
    <>
      <div className="bg-white lg:rounded-xl">
        <BaseInfo
          image=""
          backgroundImage=""
          name="Công ty công nghệ meta"
          address="Tân Bình, thành phố Hồ Chí Minh"
          description="Tân Bình, thành phố Hồ Chí MinhTân Bình, thành phố Hồ Chí MinhTân Bình, thành phố Hồ Chí MinhTân Bình, thành phố Hồ Chí MinhTân Bình, thành phố Hồ Chí MinhTân Bình, thành phố Hồ Chí MinhTân Bình, thành phố Hồ Chí MinhTân Bình, thành phố Hồ Chí MinhTân Bình, thành phố Hồ Chí Minh"
          _onClickChangeImage={_onClickChangeImage}
          _onClickChangeBackgroundImage={_onClickChangeBackgroundImage}
          isVip
        />
      </div>

      <div className="bg-white lg:rounded-xl p-4 lg:p-8">
        <MoreDetail
          name="Công ty Công nghệ Meta"
          address="Tân Bình, thành phố Hồ Chí Minh"
          businessCode="0123456789"
          email="google@example.com"
          phoneNumber="0123456789"
          scale="300 người"
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
