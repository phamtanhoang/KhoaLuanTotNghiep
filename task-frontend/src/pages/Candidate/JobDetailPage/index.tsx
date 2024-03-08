import Hero from "@/components/ui/Hero";
import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import { LeftPage, RightPage } from "./components";
import { GreatJobs } from "../JobsPage/components";

const JobDetailPage = () => {
  return (
    <>
      <Hero
        title="Chi tiết tuyển dụng"
        linkSearch={CANDIDATE_PATHS.jobsPage}
        titleSearch="Tuyển dụng khác"
      />
      <section className="pb-10 pt-8 bg-gray-100">
        <div className="w-full lg:w-[80%] px-5 lg:px-0 mx-auto flex lg:flex-row flex-col lg:gap-5">
          <div className="w-full lg:w-8/12 flex flex-col mx-auto">
            <LeftPage
              image=""
              name="[HN] Lập trình viên frontend"
              employer="Công ty dược phẩm Phúc Long"
              category="Công nghệ thông tin"
              description="Công ty dược phẩm Phúc Long Công ty dược phẩm Phúc Long Công ty dược phẩm Phúc Long"
              experience="Từ 3-5 năm kinh nghiệm"
              fromDate="03/02/2002"
              toDate="03/02/2002"
              location="Thành phố Hồ Chí Minh"
              salary="Từ 30-50 triệu"
            />
          </div>
          <div className="w-full lg:w-4/12 lg:flex flex-col gap-5">
            <RightPage
              employer="Công ty dược phẩm phúc long"
              location="Thành phố Hồ Chí Minh"
              description="Công ty dược phẩm Phúc Long Công ty dược phẩm Phúc Long Công ty dược phẩm Phúc LongCông ty dược phẩm Phúc Long Công ty dược phẩm Phúc Long Công ty dược phẩm Phúc LongCông ty dược phẩm Phúc Long Công ty dược phẩm Phúc Long Công ty dược phẩm Phúc Long"
              procedures={[
                {
                  stepNumber: 1,
                  name: "Bước 1",
                  description: "Mô tả cho bước 1",
                },
                {
                  stepNumber: 2,
                  name: "Bước 2",
                  description: "Mô tả cho bước 2",
                },
              ]}
              tags={[
                {
                  name: "Tag 1",
                  color: "blue",
                },
                {
                  name: "Tag 2",
                  color: "green",
                },
              ]}
            />
          </div>
        </div>
      </section>
      <GreatJobs />
    </>
  );
};
export default JobDetailPage;
