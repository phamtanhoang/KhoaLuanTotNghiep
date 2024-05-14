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
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingContext } from "@/App";
import { SwalHelper } from "@/utils/helpers";
import { categoriesService } from "@/services";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { ONCHANGE_CATEGORY_LIST } from "@/store/reducers/listDataReducer";
import { EmptyData, Loading } from "@/components/ui";

const employers = [
  {
    id: "1",
    image: "https://source.unsplash.com/random/400x400",
    name: "Công ty dược phẩm Phúc Long Công ty dược phẩm Phúc Long",
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

const HomePage: React.FC = () => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const { totalPages, currentPage, isEmpty } = useSelector(
    (state: any) => state.paginationReducer
  );
  useEffect(() => {
    dispatch(CLEAR_PAGINATION_STATE());
  }, []);
  const fetchCategories = () => {
    context.handleOpenLoading();
    categoriesService
      .getTopCategories(currentPage - 1, 8)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          const cates = categories.concat(res?.data?.Data?.content || []);
          console.log("categories, ", categories);
          console.log("cates, ", cates);
          setCategories(cates);
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
  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  return (
    <>
      <Hero />
      <section className="py-12 lg:py-16">
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
                />
              </SwiperSlide>
            ))}
          </Swiper>
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
              </div>{" "}
            </>
          )}

          {totalPages > currentPage && !isEmpty && (
            <div className="w-full flex justify-center items-center mt-12">
              <button
                className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-lg outline-none relative overflow-hidden border duration-300 ease-linear after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500 mx-auto"
                onClick={() => dispatch(ONCHANGE_CURRENTPAGE(currentPage + 1))}
              >
                <span className="z-[1] font-medium">Xem thêm</span>
              </button>
            </div>
          )}
        </div>
      </section>
      <QuestionsAndAnswer />
    </>
  );
};

export default HomePage;
