import "react-tooltip/dist/react-tooltip.css";
import { EmployerCard, SearchEmployer } from "./components";
import { GreatEmployers, Pagination } from "@/components/ui";

const EmployersPage: React.FC = () => {
  return (
    <>
      <SearchEmployer />
      <section className="py-12 lg:pt-12 lg:pb-16 ">
        <div className="px-5 lg:px-28 justify-between mb-8 mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3">
          <EmployerCard
            image=""
            banner=""
            name="Công ty dược phẩm Phúc long"
            address="Thành phố Hồ Chí Minh"
            description="Triết lý kinh doanh: Chăm sóc sức khỏe và sắc đẹp của người phụ nữ với các mỹ phẩm thiên nhiên hướng tới hữu cơ - an toàn cho người sử dụng. "
            isVip
          />
          <EmployerCard
            image=""
            banner=""
            name="Công ty dược phẩm Phúc long"
            address="Thành phố Hồ Chí Minh"
            description="Triết lý kinh doanh: Chăm sóc sức khỏe và sắc đẹp của người phụ nữ với các mỹ phẩm thiên nhiên hướng tới hữu cơ - an toàn cho người sử dụng. "
          />
          <EmployerCard
            image=""
            banner=""
            name="Công ty dược phẩm Phúc long"
            address="Thành phố Hồ Chí Minh"
            description="Triết lý kinh doanh: Chăm sóc sức khỏe và sắc đẹp của người phụ nữ với các mỹ phẩm thiên nhiên hướng tới hữu cơ - an toàn cho người sử dụng. "
          />
          <EmployerCard
            image=""
            banner=""
            name="Công ty dược phẩm Phúc long"
            address="Thành phố Hồ Chí Minh"
            description="Triết lý kinh doanh: Chăm sóc sức khỏe và sắc đẹp của người phụ nữ với các mỹ phẩm thiên nhiên hướng tới hữu cơ - an toàn cho người sử dụng. "
          />
          <EmployerCard
            image=""
            banner=""
            name="Công ty dược phẩm Phúc long"
            address="Thành phố Hồ Chí Minh"
            description="Triết lý kinh doanh: Chăm sóc sức khỏe và sắc đẹp của người phụ nữ với các mỹ phẩm thiên nhiên hướng tới hữu cơ - an toàn cho người sử dụng. "
          />
          <EmployerCard
            image=""
            banner=""
            name="Công ty dược phẩm Phúc long"
            address="Thành phố Hồ Chí Minh"
            description="Triết lý kinh doanh: Chăm sóc sức khỏe và sắc đẹp của người phụ nữ với các mỹ phẩm thiên nhiên hướng tới hữu cơ - an toàn cho người sử dụng. "
          />
        </div>
        <div className="px-5 lg:px-28 justify-between mx-auto w-max">
          <Pagination />
        </div>
      </section>
      <GreatEmployers />
    </>
  );
};

export default EmployersPage;
