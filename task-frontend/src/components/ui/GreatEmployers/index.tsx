import {
  GreatEmployerCard,
} from "@/components/ui";

import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Navigation, Pagination } from "swiper/modules";

const GreatEmployers = () => {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="px-5 lg:px-28 flex justify-between mb-8 text-gray-700">
        <div className="text-center lg:text-left w-full lg:w-[50%]">
          <h1 className="text-3xl  font-bold tracking-wider font-lato ">
            Nhà tuyển dụng <span className="text-orangetext">Nổi Bật</span>
          </h1>
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
            600: { slidesPerView: 1, spaceBetween: 4 },
            768: { slidesPerView: 2, spaceBetween: 8 },
            1024: { slidesPerView: 3, spaceBetween: 8 },
            1280: { slidesPerView: 4, spaceBetween: 8 },
          }}
        >
          <SwiperSlide>
            <GreatEmployerCard
              id="1"
              image="https://source.unsplash.com/random/400x400"
              name="Công ty dược phẩm Phúc Long"
              description="Đam mê kinh doanh, năng động, sáng tạo, độc lập, chủ động trong công việc, hoàn thành tốt nhiệm vụ được giao. Ưu tiên ứng viên có kinh nghiệm bán hàng các SP Sơn hoặc các SP liên quan đến vật liệu xây dựng, thầu công trình, thợ sơn, gia dụng."
            />
          </SwiperSlide>
          <SwiperSlide>
            <GreatEmployerCard
              id="1"
              image="https://source.unsplash.com/random/400x400"
              name="Công ty dược phẩm Phúc Long"
              description="Đam mê kinh doanh, năng động, sáng tạo, độc lập, chủ động trong công việc, hoàn thành tốt nhiệm vụ được giao. Ưu tiên ứng viên có kinh nghiệm bán hàng các SP Sơn hoặc các SP liên quan đến vật liệu xây dựng, thầu công trình, thợ sơn, gia dụng."
            />
          </SwiperSlide>
          <SwiperSlide>
            <GreatEmployerCard
              id="1"
              image="https://source.unsplash.com/random/400x400"
              name="Công ty dược phẩm Phúc Long"
              description="Đam mê kinh doanh, năng động, sáng tạo, độc lập, chủ động trong công việc, hoàn thành tốt nhiệm vụ được giao. Ưu tiên ứng viên có kinh nghiệm bán hàng các SP Sơn hoặc các SP liên quan đến vật liệu xây dựng, thầu công trình, thợ sơn, gia dụng."
            />
          </SwiperSlide>
          <SwiperSlide>
            <GreatEmployerCard
              id="1"
              image="https://source.unsplash.com/random/400x400"
              name="Công ty dược phẩm Phúc Long"
              description="Đam mê kinh doanh, năng động, sáng tạo, độc lập, chủ động trong công việc, hoàn thành tốt nhiệm vụ được giao. Ưu tiên ứng viên có kinh nghiệm bán hàng các SP Sơn hoặc các SP liên quan đến vật liệu xây dựng, thầu công trình, thợ sơn, gia dụng."
            />
          </SwiperSlide>
          <SwiperSlide>
            <GreatEmployerCard
              id="1"
              image="https://source.unsplash.com/random/400x400"
              name="Công ty dược phẩm Phúc Long"
              description="Đam mê kinh doanh, năng động, sáng tạo, độc lập, chủ động trong công việc, hoàn thành tốt nhiệm vụ được giao. Ưu tiên ứng viên có kinh nghiệm bán hàng các SP Sơn hoặc các SP liên quan đến vật liệu xây dựng, thầu công trình, thợ sơn, gia dụng."
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
export default GreatEmployers;
