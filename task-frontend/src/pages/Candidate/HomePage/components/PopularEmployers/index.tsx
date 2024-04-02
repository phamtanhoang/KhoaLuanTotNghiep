import { TopEmployerCard } from "@/components/ui";

import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Tooltip } from "react-tooltip";

const employers = [
  {
    id: "1",
    image: "https://source.unsplash.com/random/400x400",
    name: "title1",
    jobCount: 3,
  },
  {
    id: "2",
    image: "https://source.unsplash.com/random/400x400",
    name: "title2",
    jobCount: 2,
  },
  {
    id: "3",
    image: "https://source.unsplash.com/random/400x400",
    name: "title3",
    jobCount: 0,
  },
  {
    id: "1",
    image: "https://source.unsplash.com/random/400x400",
    name: "title1",
    jobCount: 3,
  },
  {
    id: "2",
    image: "https://source.unsplash.com/random/400x400",
    name: "title2",
    jobCount: 2,
  },
  {
    id: "3",
    image: "https://source.unsplash.com/random/400x400",
    name: "title3",
    jobCount: 0,
  },
];
const PopularEmployers = () => {
  const _onClickDetail = (id: string) => {};
  return (
    <section className="py-12 lg:py-16">
      <div className="px-5 lg:px-28 flex justify-between mb-8">
        <div className="text-center lg:text-left w-full lg:w-[50%]">
          <h1 className="text-3xl lg:text-4xl  font-bold tracking-wider mb-4">
            Nhà Tuyển Dụng <span className="text-orangetext">Nổi Bật</span>
          </h1>
          <p className="text-base text-gray-600 tracking-wide">
            Dưới đây là một số nhà tuyển dụng độc đáo và có uy tín, cung cấp cơ
            hội sự nghiệp đa dạng trong nhiều lĩnh vực khác nhau. Hãy khám phá
            và ứng tuyển ngay hôm nay để bắt đầu chặng đường mới của bạn!
          </p>
        </div>
        <div className=" flex-row justify-between items-end gap-4 hidden lg:flex">
          <button className="button-prev-slide">
            <TfiArrowCircleLeft className="text-4xl hover:text-orangetext" />
          </button>
          <button className="button-next-slide">
            <TfiArrowCircleRight className="text-4xl hover:text-orangetext" />
          </button>
        </div>
      </div>

      <div className="px-5 lg:px-28">
        <Swiper
          className=""
          modules={[FreeMode, Navigation, Pagination]}
          direction="horizontal"
          freeMode={true}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          breakpoints={{
            300: { slidesPerView: 1, spaceBetween: 4 },
            400: { slidesPerView: 2, spaceBetween: 4 },
            768: { slidesPerView: 3, spaceBetween: 8 },
            1024: { slidesPerView: 4, spaceBetween: 8 },
            1280: { slidesPerView: 5, spaceBetween: 8 },
          }}
        >
          {employers.map((item, index) => (
            <SwiperSlide key={index}>
              <TopEmployerCard
                id={item.id}
                image={item.image}
                name={item.name}
                _onClickDetail={() => _onClickDetail(item.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default PopularEmployers;
