import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

interface TopEmployerCardProps {
  id: string;
  image: string;
  name: string;
}

const TopEmployerCard: React.FC<TopEmployerCardProps> = ({
  id,
  image,
  name,
}) => {
  const navigate = useNavigate();
  const _onClickDetail = () => {
    navigate(`/employers/${id}`);
  };
  return (
    <div className="flex flex-col gap-2 items-start p-10 lg:p-6 rounded-xl bg-body h-max cursor-grab">
      <div
        className="flex gap-1 hover:gap-2 text-[0.9rem] font-lato font-normal cursor-pointer hover:text-orangetext transition-all duration-300"
        onClick={_onClickDetail}
      >
        <span>Xem chi tiết</span>
        <GrFormNextLink className="text-xl" />
      </div>
      <img
        src={image}
        alt={name}
        className="w-full object-contain relative  overflow-hidden rounded bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40"
      />

      <div
        className="font-bold text-base uppercase w-full text-center line-clamp-2 cursor-default"
        data-tooltip-id="tooltip"
        data-tooltip-content={name}
      >
        {name}
      </div>
    </div>
  );
};

export default TopEmployerCard;
