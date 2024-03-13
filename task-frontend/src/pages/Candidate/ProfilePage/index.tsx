import Hero from "@/components/ui/Hero";
import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import { FaPencilAlt } from "react-icons/fa";
import { GiGraduateCap, GiSkills } from "react-icons/gi";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { GreatJobs } from "../JobsPage/components";
import { SkillExpEduProps, Information, UserCard } from "./components";

const ProfilePage = () => {
  return (
    <>
      <Hero
        title="Thông tin tài khoản"
        titleSearch="Tìm việc ngay"
        linkSearch={CANDIDATE_PATHS.jobs}
      />
      <section className="pb-10 pt-8 bg-gray-100">
        <div className="w-full lg:w-[80%] px-5 lg:px-0 mx-auto flex flex-col lg:flex-row gap-5  rounded-md">
          <div className="w-full md:w-3/12 flex flex-col gap-5 ">
            <UserCard
              image=""
              name="Phạm Tấn Hoàng"
              job="Front-end Developer"
              description="My name is Hoang, and I am currently a fourth-year student at Open University. I am an enthusiastic
              learner, always striving to improve my skills and knowledge. I am very determined and I never give up
              when I face challenges."
            />
          </div>
          <div className="w-full md:w-9/12 flex flex-col gap-5">
            <div className="bg-white p-5 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span className="text-orangetext text-2xl my-auto">
                  <MdInfoOutline />
                </span>
                <span className="tracking-wide text-lg">Thông tin cá nhân</span>
              </div>

              <Information
                firstName="Phạm Tấn"
                lastName="Hoàng"
                address="354/32 Âu Cơ, Tân Bình, Hồ Chí Minh"
                dateOfBirth="03/02/2002"
                email="phamtanhoang3202@gmail.com"
                gender="Nam"
                link="https://github.com/phamtanhoang"
              />
              <button className="block w-full text-orangetext hover:text-orange-500 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 mt-4">
                Sửa thông tin
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white p-5 shadow-sm rounded-sm">
                <div className="flex items-center font-semibold text-gray-900 leading-8 mb-3 justify-between gap-3">
                  <h2 className="tracking-wide text-lg flex">
                    <span className="text-orangetext text-xl my-auto">
                      <GiSkills />
                    </span>
                    &nbsp;&nbsp;Kĩ năng
                  </h2>
                  <button className="text-gray-800 hover:text-orangetext p-1.5">
                    <FaPencilAlt />
                  </button>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <SkillExpEduProps
                      name="ReactJs"
                      description="Hiểu về cơ chế component, biết sử dụng các hook, fetch, axios, redux..."
                    />
                  </li>
                </ul>
              </div>
              <div className="bg-white p-5 shadow-sm rounded-sm">
                <div className="flex items-center font-semibold text-gray-900 leading-8 mb-3 justify-between gap-3">
                  <h2 className="tracking-wide text-lg flex">
                    <span className="text-orangetext text-xl my-auto">
                      <IoNewspaperOutline />
                    </span>
                    &nbsp;&nbsp;Kinh nghiệm làm việc
                  </h2>
                  <button className="text-gray-800 hover:text-orangetext p-1.5">
                    <FaPencilAlt />
                  </button>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <SkillExpEduProps
                      name="Công ty dược phẩm Phúc Long"
                      fromDate="06/2020"
                      toDate="02/2024"
                      description="Làm giao hàng và quản lý kho"
                    />
                  </li>
                </ul>
              </div>
              <div className="bg-white p-5 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3 justify-between gap-3">
                  <h2 className="tracking-wide text-lg flex">
                    <span className="text-orangetext text-2xl my-auto">
                      <GiGraduateCap />
                    </span>
                    &nbsp;&nbsp;Trình độ học vấn
                  </h2>
                  <button className="text-gray-800 hover:text-orangetext p-1.5">
                    <FaPencilAlt />
                  </button>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <SkillExpEduProps
                      name="Đại học Mở thành phố Hồ Chí Minh"
                      fromDate="09/2020"
                      toDate="Hiện tại"
                      description="Sinh viên ngành CNTT"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GreatJobs />
    </>
  );
};
export default ProfilePage;
