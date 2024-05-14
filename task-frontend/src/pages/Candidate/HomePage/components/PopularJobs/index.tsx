import BANNER1 from "@/assets/images/banner1.png";
import { TopJobCard } from "..";
import { GrFormNextLink } from "react-icons/gr";
import { PathConstants } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const PopularJobs = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-orangebackground pb-10">
      <div className="lg:w-[90%] mx-auto flex items-center lg:flex-row lg:mt-0 mb- flex-col-reverse">
        <div className="w-[90%] lg:w-[55%]">
          <div className="md:order-1 basis-1/2">
            <h1 className="text-3xl font-bold tracking-wide">
              Việc Làm <span className="text-orangetext">Phổ Biến</span>
            </h1>
            <p className="mt-4 tracking-wide text-gray-500">
              Khám phá những vị trí công việc hot nhất trên web. Đánh giá mức
              lương cá nhân của bạn và tìm kiếm cơ hội nghề nghiệp hấp dẫn.
            </p>

            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-2">
              <TopJobCard
                id="1"
                image="https://source.unsplash.com/random/400x400"
                name="Lập trình viên Front-end"
                employer="Google"
              />
              <TopJobCard
                id="1"
                image="https://source.unsplash.com/random/400x400"
                name="Lập trình viên Front-end"
                employer="Google"
              />
              <TopJobCard
                id="1"
                image="https://source.unsplash.com/random/400x400"
                name="Lập trình viên Front-end"
                employer="Google"
              />
              <TopJobCard
                id="1"
                image="https://source.unsplash.com/random/400x400"
                name="Lập trình viên Front-end"
                employer="Google"
              />
              <TopJobCard
                id="1"
                image="https://source.unsplash.com/random/400x400"
                name="Lập trình viên Front-end"
                employer="Google"
              />
              <TopJobCard
                id="1"
                image="https://source.unsplash.com/random/400x400"
                name="Lập trình viên Front-end"
                employer="Google"
              />
            </div>
            <div className="relative w-max text-center overflow-hidden">
              <p
                className="text-[0.9rem] font-lato font-normal pb-2 flex items-center gap-1 hover:gap-2 mt-4 text-gray-700 hover:text-orangetext transition-all duration-300 cursor-pointer relative before:absolute before:w-full before:h-0.5 before:bg-orangetext before:-left-36 before:bottom-0 before:opacity-0 hover:before:left-0 hover:before:opacity-100 hover:before:transition-all hover:before:duration-500"
                onClick={() => {
                  navigate(PathConstants.CANDIDATE_PATHS.jobs);
                }}
              >
                <span className="">Xem thêm</span>{" "}
                <GrFormNextLink className="text-xl" />
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-[45%] w-full lg:mt-10">
          <img src={BANNER1} alt="logo" className="lg:ml-10" />
        </div>
      </div>
    </section>
  );
};
export default PopularJobs;
