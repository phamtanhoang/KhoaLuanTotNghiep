import { useNavigate } from "react-router-dom";
import NON_USER from "@/assets/images/non-user.jpg";
interface TopEmployerCardProps {
  id: string;
  image: string;
  name: string;
  description: string;
}

const TopEmployerCard: React.FC<TopEmployerCardProps> = ({
  id,
  image,
  name,
  description,
}) => {
  const navigate = useNavigate();
  const _onClickDetail = () => {
    navigate(`/employers/${id}`);
  };
  return (
    <div
      className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-4 cursor-pointer"
      onClick={_onClickDetail}
    >
      <img
        className="w-28 h-28 rounded-full mx-auto"
        src={image ? image : NON_USER}
        alt={name}
      />
      <h2
        className="text-center text-sm font-base font-medium mt-3 uppercase line-clamp-1"
        data-tooltip-id="tooltip"
        data-tooltip-content={name}
      >
        {name}
      </h2>

      <p className="text-gray-600 mt-2 line-clamp-3 italic text-justify text-sm">
        {description}
      </p>
    </div>
  );
};

export default TopEmployerCard;
