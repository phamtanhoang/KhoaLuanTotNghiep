import { ReactNode } from "react";

interface StatisticsCardProps {
  icon?: ReactNode;
  title?: string;
  value?: string;
  description?: ReactNode;
}
const StatisticsCard: React.FC<StatisticsCardProps> = ({
  icon,
  title,
  value,
  description,
}) => {
  return (
    <div className="border border-borderColor shadow-sm bg-white rounded-xl ">
      <div className="flex justify-between p-4 gap-3">
        <div className="h-16 w-16 place-items-center bg-orangetext rounded-xl text-white">
          {icon}
        </div>
        <div className=" text-right">
          <h2 className=" text-gray-800 font-bold">{title}</h2>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
      </div>

      {description && (
        <p className="border-t border-borderColor p-4">{description}</p>
      )}
    </div>
  );
};

export default StatisticsCard;
