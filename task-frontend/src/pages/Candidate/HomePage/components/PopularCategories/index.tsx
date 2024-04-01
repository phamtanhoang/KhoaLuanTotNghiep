import TopCategoryCard from "@/components/ui/TopCategoryCard";
import { useState } from "react";

const categories = [
  {
    id: "1",
    image: "https://source.unsplash.com/random/400x400",
    title: "title1",
    jobCount: 3,
  },
  {
    id: "2",
    image: "https://source.unsplash.com/random/400x400",
    title: "title2",
    jobCount: 2,
  },
  {
    id: "3",
    image: "https://source.unsplash.com/random/400x400",
    title: "title3",
    jobCount: 0,
  },
];

const Popularcategories = () => {
  const [type, setType] = useState<boolean>(true);
  const _onChangeType = () => {
    setType(!type);
  };
  const _onClickDetail = (id: string) => {};
  return (
    <section className="mx-auto max-w-6xl py-12 lg:py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Danh Mục <span className="text-orangetext">Phổ Biến</span>
        </h2>
        <p className="mt-6 font-normal text-neutral-500">
          Chúng tôi cung cấp một loạt các công việc đa dạng để đáp ứng nhu cầu
          sự nghiệp của bạn. Duyệt qua các danh mục để khám phá các cơ hội mới
          và bắt đầu chặng đường sự nghiệp của bạn ngay hôm nay.
        </p>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {categories.map((item, index) => (
          <TopCategoryCard
            key={index}
            id={item.id}
            image={item.image}
            title={item.title}
            jobCount={item.jobCount}
            _onClickDetail={() => _onClickDetail(item.id)}
          />
        ))}
      </div>
      <div className="w-full flex justify-center items-center mt-12">
        <button
          className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-lg outline-none relative overflow-hidden border duration-300 ease-linear after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500 mx-auto"
          onClick={() => _onChangeType()}
        >
          <span className="z-[1] font-medium">
            {type ? "Xem thêm" : "Ẩn bớt"}
          </span>
        </button>
      </div>
    </section>
  );
};
export default Popularcategories;
