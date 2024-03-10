import Hero from "@/components/ui/Hero";
import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import { GreatEmployers } from "../EmployersPage/components";
import { LeftPage, RightPage } from "./components";

const EmployerDetailPage = () => {
  return (
    <>
      <Hero
        title="Chi tiết nhà tuyển dụng"
        linkSearch={CANDIDATE_PATHS.employers}
        titleSearch="Nhà tuyển dụng khác"
      />
      <section className="pb-10 pt-8 bg-gray-100 ">
        <div className="w-full lg:w-[80%] px-5 lg:px-0 mx-auto flex lg:flex-row flex-col gap-5">
          <div className="w-full lg:w-4/12 flex flex-col gap-5">
            <LeftPage
              name="Công ty dược phẩm Phúc Long"
              description="Công ty dược phẩm Phúc LongCông ty dược phẩm Phúc LongCông ty dược phẩm Phúc LongCông ty dược phẩm Phúc LongCông ty dược phẩm Phúc Long"
              image=""
              location="Thành phố Hồ Chí Minh"
              email="phamtanhoang3202@gmail.com"
              phone="0362400302"
              isVip
            />
          </div>
          <div className="w-full lg:w-8/12 flex flex-col mx-auto bg-white rounded-sm ">
            <RightPage image="https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030120/DoAnNganh/Project_Manager_l%C3%A0_g%C3%AC__cxkwho.jpg" />
          </div>
        </div>
      </section>
      <GreatEmployers />
    </>
  );
};
export default EmployerDetailPage;
