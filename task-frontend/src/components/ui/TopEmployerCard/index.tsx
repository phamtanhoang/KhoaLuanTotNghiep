import { GrFormNextLink } from "react-icons/gr";
import { Tooltip } from "react-tooltip";

interface TopEmployerCardProps {
  id: string;
  image: string;
  name: string;
  _onClickDetail: () => void;
}

const TopEmployerCard: React.FC<TopEmployerCardProps> = ({
  id,
  image,
  name,
  _onClickDetail,
}) => {
  return (
    <div className="flex flex-col gap-4 items-start p-4 rounded-md bg-body h-max cursor-grab">
      <div
        className="flex gap-1 text-[0.9rem] font-lato font-normal cursor-pointer hover:text-orangetext"
        onClick={_onClickDetail}
      >
        Xem chi tiết <GrFormNextLink className="text-xl " />
      </div>

      <img
        src={image}
        alt={name}
        className="w-full object-contain relative  overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40"
      />

      <div
        className="font-semibold text-lg uppercase w-full text-center truncate cursor-default"
        data-tooltip-id="popular-employer-tooltip"
        data-tooltip-content={name}
      >
        {name}
      </div>
      <Tooltip id="popular-employer-tooltip" />
    </div>
  );
};

export default TopEmployerCard;
