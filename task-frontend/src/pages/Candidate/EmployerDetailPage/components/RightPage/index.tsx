import { JobCard, Pagination } from "@/components/ui";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdWork } from "react-icons/md";

interface RightPageProps {
  image?: string;
}

const RightPage: React.FC<RightPageProps> = ({ image }) => {
  return (
    <>
      {image && (
        <img
          className="md:w-[700px] md:h-[350px] mx-auto rounded-lg object-fill p-3 lg:p-5 pb-0 lg:pb-0"
          src={image}
          alt="image background"
        />
      )}

      <div className="flex flex-col gap-5 p-3 lg:p-5">
        <h3 className="font-bold text-xl leading-8 bg-orangetext text-white px-5 py-3 rounded-md">
          Tuyển dụng
        </h3>
        <div className="bg-white rounded lg:rounded-lg lg:flex w-full gap-3 border-2 border-orangetext p-2">
          <div></div>
          <div className="flex gap-1 w-full lg:w-[60%] bg-white text-left mb-3 lg:mb-0 py-2 lg:py-0 lg:border-r-2 border-orange-orangetext">
            <MdWork className="text-orangetext h-full text-2xl" />
            <input
              className="w-full bg-transparent ml-2 text-gray-800 focus:outline-none"
              type="text"
              placeholder="Nhập tên công việc..."
            />
          </div>
          <div className="flex gap-1 w-full lg:w-[40%] bg-white text-left mb-3 lg:mb-0 py-2 lg:py-0">
            <FaLocationCrosshairs className="text-orangetext h-full text-2xl" />
            <select className="bg-transparent ml-2 text-gray-800 focus:outline-none w-full">
              <option className="w-full" value="">
                Afganistan
              </option>
            </select>
          </div>

          <button
            className="w-full lg:w-max py-3 px-4 lg:px-10 text-white rounded lg:rounded-full flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
          >
            <span className="flex relative z-[1] font-medium">Tìm kiếm</span>
          </button>
        </div>
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
