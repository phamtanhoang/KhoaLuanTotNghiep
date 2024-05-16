import { useNavigate } from "react-router-dom";
import NON_USER from "@/assets/images/non-user.jpg";
interface TopJobCardProps {
  id: string;
  image: string;
  name: string;
  employer: string;
}

const TopJobCard: React.FC<TopJobCardProps> = ({
  id,
  image,
  name,
  employer,
}) => {
  const navigate = useNavigate();
  const _onClickDetail = () => {
    navigate(`/jobs/${id}`);
  };
  return (
    <div
      className="flex items-center w-full bg-white rounded-md p-4 cursor-pointer group opacity-90 hover:shadow-md"
      onClick={_onClickDetail}
    >
      <img
        className="w-16 h-16 bg-white mr-3"
        src={image ? image : NON_USER}
        alt={name}
      />

      <div>
        <h1
          className="text-lg group-hover:text-orangetext font-semibold line-clamp-2"
          data-tooltip-id="tooltip"
          data-tooltip-content={name}
        >
          {name}
        </h1>
        <p
          className="text-sm text-gray-600 line-clamp-1"
          data-tooltip-id="tooltip"
          data-tooltip-content={employer}
        >
          {employer}
        </p>
      </div>
    </div>
  );
};

export default TopJobCard;
