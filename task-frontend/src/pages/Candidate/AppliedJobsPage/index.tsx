import Hero from "@/components/ui/Hero";
import { GreatEmployers } from "../EmployersPage/components";
import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import {
  JobAppliedCard,
  JobCard,
  Pagination,
  SearchJobs,
} from "@/components/ui";
import { APPLY_STATE_DATA } from "@/utils/constants/dataConstants";

const AppliedJobsPage = () => {
  return (
    <>
      <Hero
        title="Công việc đã ứng tuyển"
        linkSearch={CANDIDATE_PATHS.jobs}
        titleSearch="Tuyển dụng khác"
      />
      <section className="pb-10 pt-8 bg-gray-100">
        <div className="w-full lg:w-[80%] px-5 lg:px-0 mx-auto flex flex-col lg:gap-5  rounded-md">
          <SearchJobs />
          <div className="bg-white p-5 rounded-md">
            <div className="border-b border-b-gray-300 mb-3">
              <ul className="flex items-center font-medium">
                {APPLY_STATE_DATA.map((item) => (
                  <li className="flex-1">
                    <a
                      href="#"
                      className={`text-sm md:text-base flex items-center justify-center gap-2 px-1 py-3 pt-0 text-gray-700 hover:text-orangetext text-orangetext  relative  after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-orangetext "
                  `}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
              <JobAppliedCard
                image="https://source.unsplash.com/random/400x400"
                name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
                appliedDate="03/02/2002"
                employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
                location="Thành phố Hồ Chí Minh"
                salary="Từ 30 - 50 triệu"
                category="Công nghệ thông tin"
                isVip
              />
              <JobAppliedCard
                image="https://source.unsplash.com/random/400x400"
                name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
                appliedDate="03/02/2002"
                employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
                location="Thành phố Hồ Chí Minh"
                salary="Từ 30 - 50 triệu"
                category="Công nghệ thông tin"
              />
              <JobAppliedCard
                image="https://source.unsplash.com/random/400x400"
                name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
                appliedDate="03/02/2002"
                employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
                location="Thành phố Hồ Chí Minh"
                salary="Từ 30 - 50 triệu"
                category="Công nghệ thông tin"
              />
            </div>
          </div>

          <div className="w-max mx-auto mt-5">
            <Pagination />
          </div>
        </div>
      </section>
      <GreatEmployers />
    </>
  );
};
export default AppliedJobsPage;
