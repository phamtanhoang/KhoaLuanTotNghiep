import { useEffect, useRef } from "react";
import { ServiceItem } from "./components";
const sampleData = [
  {
    name: "Dịch vụ 1",
    description: "Mô tả dịch vụ 1",
    include: [
      { value: "Bao gồm tính năng 1" },
      { value: "Bao gồm tính năng 2" },
      { value: "Bao gồm tính năng 3" },
    ],
    price: 1000000,
  },
  {
    name: "Dịch vụ 2",
    description: "Mô tả dịch vụ 2",
    include: [
      { value: "Bao gồm tính năng 4" },
      { value: "Bao gồm tính năng 5" },
      { value: "Bao gồm tính năng 6" },
    ],
    price: 1500000,
  },
];

const UpgradeAccountEmployer = () => {
  const chatContainerRef = useRef<any>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <>
      <div className="mx-auto text-center w-full mt-4 lg:mt-8 px-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800 lg:text-4xl">
          Nâng cấp tài khoản!
        </h2>
        <p className="mt-4 lg:text-lg leading-8 text-gray-600">
          Bảng giá dịch vụ dành cho nhà tuyển dụng của Joobs
        </p>
      </div>
      <div className="w-full flex flex-col gap-6 lg:mt-8">
        {sampleData.map((item, index) => (
          <ServiceItem
            key={index}
            name={item.name}
            description={item.description}
            include={item.include}
            price={item.price}
          />
        ))}
      </div>
    </>
  );
};
export default UpgradeAccountEmployer;
