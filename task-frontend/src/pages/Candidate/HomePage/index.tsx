import {
  Hero,
  PopularJobs,
  RecentJobs,
  QuestionsAndAnswer,
  TopEmployerCard,
  TopCategoryCard,
} from "./components";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingContext } from "@/App";
import { SwalHelper } from "@/utils/helpers";
import { categoriesService, employersService } from "@/services";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import {
  ONCHANGE_CATEGORY_LIST,
  ONCHANGE_EMPLOYER_LIST,
} from "@/store/reducers/listDataReducer";
import { EmptyData } from "@/components/ui";

const HomePage: React.FC = () => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();

  const { isEmpty } = useSelector((state: any) => state.paginationReducer);
  const { categories, employers } = useSelector(
    (state: any) => state.listDataReducer
  );
  useEffect(() => {
    dispatch(ONCHANGE_CATEGORY_LIST([]));
    dispatch(CLEAR_PAGINATION_STATE());
  }, []);
  const fetchCategories = () => {
    context.handleOpenLoading();
    categoriesService
      .getTopCategories()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_CATEGORY_LIST(res?.data?.Data?.content));
          dispatch(ONCHANGE_PAGINATION(res.data.Data));
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
  const fetchEmployers = () => {
    context.handleOpenLoading();
    employersService
      .getTop(0, 10)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_EMPLOYER_LIST(res?.data?.Data?.content || ""));
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
    fetchCategories();
  }, []);

  return (
    <>
      <Hero />
      <section className="py-12 lg:py-16 bg-body">
        <div className="px-5 lg:px-28 flex justify-between mb-8">
          <div className="text-center lg:text-left w-full lg:w-[50%]">
            <h1 className="text-3xl lg:text-4xl  font-bold tracking-wider mb-4">
              Nhà Tuyển Dụng <span className="text-orangetext">Nổi Bật</span>
            </h1>
            <p className="text-sm lg:text-base text-gray-600 tracking-wide">
              Dưới đây là một số nhà tuyển dụng độc đáo và có uy tín, cung cấp
              cơ hội sự nghiệp đa dạng trong nhiều lĩnh vực khác nhau. Hãy khám
              phá và ứng tuyển ngay hôm nay để bắt đầu chặng đường mới của bạn!
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

        <div className="px-5 lg:px-28 ">
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
                400: { slidesPerView: 2, spaceBetween: 4 },
                768: { slidesPerView: 3, spaceBetween: 8 },
                1024: { slidesPerView: 4, spaceBetween: 8 },
                1280: { slidesPerView: 5, spaceBetween: 8 },
              }}
            >
              {employers.map((item: EmployerModel, index: number) => (
                <SwiperSlide key={index}>
                  <TopEmployerCard
                    id={item?.id!}
                    image={item?.image!}
                    name={item?.name!}
                    description={item?.description!}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      <RecentJobs />
      <PopularJobs />

      <section className="py-12 lg:py-16">
        <div className="px-5 lg:px-28">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Danh Mục <span className="text-orangetext">Phổ Biến</span>
            </h2>
            <p className="mt-6 font-normal text-neutral-500">
              Chúng tôi cung cấp một loạt các công việc đa dạng để đáp ứng nhu
              cầu sự nghiệp của bạn. Duyệt qua các danh mục để khám phá các cơ
              hội mới và bắt đầu chặng đường sự nghiệp của bạn ngay hôm nay.
            </p>
          </div>

          {isEmpty ? (
            <div className="px-5 lg:px-28 justify-between mx-auto">
              <EmptyData text="Danh sách rỗng..." />
            </div>
          ) : (
            <>
              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories?.map((item: CategoryModel, index: number) => (
                  <TopCategoryCard
                    key={index}
                    id={item.id!}
                    image={item.image!}
                    title={item.name!}
                    jobCount={item.count!}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <QuestionsAndAnswer />
    </>
  );
};

export default HomePage;
