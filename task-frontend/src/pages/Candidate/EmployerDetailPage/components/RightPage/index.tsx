import { JobCard, Pagination, SearchJobs } from "@/components/ui";

interface RightPageProps {
  image?: string;
}

const RightPage: React.FC<RightPageProps> = ({ image }) => {
  return (
    <>
      {image && (
        <img
          className="w-full mx-auto rounded-lg object-fill p-3 lg:p-5 pb-0 lg:pb-0"
          src={image}
          alt="image background"
        />
      )}

      <div className="flex flex-col gap-5 p-3 lg:p-5">
        <h3 className="font-bold text-xl leading-8 bg-orangetext text-white px-5 py-3 rounded-md">
          Tuyển dụng
        </h3>
        <SearchJobs />
        <div className="w-full flex flex-col gap-3">
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[HCM] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
          />
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[HCM] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                  Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                  Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
          />
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[HCM] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
          />
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[HCM] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
          />
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[HCM] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
          />
        </div>
        <div className="w-full flex justify-center">
          <Pagination />
        </div>
      </div>
    </>
  );
};
export default RightPage;
