import React from "react";
import NONE_RESULT from "@/assets/images/none-result.png";
interface EptyDataProps {
  text: string;
}
const EmptyData: React.FC<EptyDataProps> = ({ text }) => {
  return (
    <>
      <div className="">
        <img src={NONE_RESULT} className="mx-auto w-[200px] lg: lg:w-[250px]" />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 tracking-wider font-lato">{text}</p>
      </div>
    </>
  );
};
export default EmptyData;
