import { ReactNode } from "react";

interface StatisticsAdminCardProps {
  quantity: number;
  icon?: ReactNode;
  title: string;
}
const StatisticsAdminCard: React.FC<StatisticsAdminCardProps> = ({
  quantity,
  icon,
  title,
}) => {
  return (
    <>
      <div className="bg-white rounded-md border border-borderColor shadow-md shadow-black/5">
        <div className="flex justify-between p-4 gap-3">
          <div className="h-16 w-16 place-items-center bg-bgBlue rounded-xl text-white">
            {icon}
          </div>
          <div className=" text-right">
            <h2 className=" text-gray-800 font-bold">{title}</h2>
            <p className="text-2xl font-semibold mt-1">{quantity}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default StatisticsAdminCard;
