import { Hero } from "@/components/ui";
import { GreatJobs, JobCard, Pagination, SearchJobs } from "@/components/ui";
import { PathConstants } from "@/utils/constants";
import { useState } from "react";

const SavedJobsPage = () => {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  return (
    <>
      <Hero
        title="Công việc đã lưu"
        linkSearch={PathConstants.CANDIDATE_PATHS.jobs}
        titleSearch="Tuyển dụng khác"
      />
      <section className="pb-10 pt-8">
        <div className="w-full lg:w-[80%] px-5 lg:px-0 mx-auto flex flex-col lg:gap-5  rounded-md">
          <SearchJobs
            name={name}
            location={location}
            setName={setName}
            setLocation={setLocation}
          />
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
            <JobCard
              image="https://source.unsplash.com/random/400x400"
              name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
              dateline="Còn 30 ngày"
              employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
              location="Thành phố Hồ Chí Minh"
              salary="Từ 30 - 50 triệu"
            />
            <JobCard
              image="https://source.unsplash.com/random/400x400"
              name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                  Web Designer[HCM] Web Designer."
              dateline="Còn 30 ngày"
              employer="Công ty dược phẩm Phúc
                  Long Công ty dược phẩm Phúc Long"
              location="Thành phố Hồ Chí Minh"
              salary="Từ 30 - 50 triệu"
            />
            <JobCard
              image="https://source.unsplash.com/random/400x400"
              name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                Web Designer[HCM] Web Designer."
              dateline="Còn 30 ngày"
              employer="Công ty dược phẩm Phúc
                Long Công ty dược phẩm Phúc Long"
              location="Thành phố Hồ Chí Minh"
              salary="Từ 30 - 50 triệu"
            />
            <JobCard
              image="https://source.unsplash.com/random/400x400"
              name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
              Web Designer[HCM] Web Designer."
              dateline="Còn 30 ngày"
              employer="Công ty dược phẩm Phúc
              Long Công ty dược phẩm Phúc Long"
              location="Thành phố Hồ Chí Minh"
              salary="Từ 30 - 50 triệu"
            />
            <JobCard
              image="https://source.unsplash.com/random/400x400"
              name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
            Web Designer[HCM] Web Designer."
              dateline="Còn 30 ngày"
              employer="Công ty dược phẩm Phúc
            Long Công ty dược phẩm Phúc Long"
              location="Thành phố Hồ Chí Minh"
              salary="Từ 30 - 50 triệu"
            />
            <JobCard
              image="https://source.unsplash.com/random/400x400"
              name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
          Web Designer[HCM] Web Designer."
              dateline="Còn 30 ngày"
              employer="Công ty dược phẩm Phúc
          Long Công ty dược phẩm Phúc Long"
              location="Thành phố Hồ Chí Minh"
              salary="Từ 30 - 50 triệu"
            />
          </div>
          <div className="w-max mx-auto mt-5">
            <Pagination />
          </div>
        </div>
      </section>
      <GreatJobs />
    </>
  );
};
export default SavedJobsPage;
