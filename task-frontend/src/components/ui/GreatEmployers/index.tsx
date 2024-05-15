import { EmptyData, GreatEmployerCard } from "@/components/ui";

import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/App";
import { employersService } from "@/services";
import { SwalHelper } from "@/utils/helpers";
import NON_USER from "@/assets/images/non-user.jpg";
const GreatEmployers = () => {
  const [employers, setEmployers] = useState<EmployerModel[]>([]);
  const context = useContext(LoadingContext);
  const fetchEmployers = () => {
    context.handleOpenLoading();
    employersService
      .getTop(0, 10)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setEmployers(res?.data?.Data?.content || "");
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        context.handleCloseLoading();
      });
  };
  useEffect(() => {
    fetchEmployers();
  }, []);
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
        {employers.length === 0 ? (
          <EmptyData text="Danh sách rỗng..." />
        ) : (
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
            {employers.map((item: EmployerModel, index: number) => (
              <SwiperSlide key={index}>
                <GreatEmployerCard
                  id={item.id!}
                  image={item.image ? item.image : NON_USER}
                  name={item.name!}
                  description={item.description!}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};
export default GreatEmployers;
