interface StatisticsAdminCardProps {
  quantity: number;
  percent: number;
  title: string;
}
const StatisticsAdminCard: React.FC<StatisticsAdminCardProps> = ({
  quantity,
  percent,
  title,
}) => {
  return (
    <>
      <div className="bg-white rounded-md border border-borderColor p-6 shadow-md shadow-black/5">
        <div className="flex justify-between mb-4">
          <div>
            <div className="flex items-center mb-1">
              <div className="text-2xl font-semibold">{quantity}</div>
              <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                +{percent}%
              </div>
            </div>
            <div className="text-base font-medium text-gray-400">{title}</div>
          </div>
        </div>
        <a
          href="#"
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          Chi tiết
        </a>
      </div>
    </>
  );
};
export default StatisticsAdminCard;
