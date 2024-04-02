import { useNavigate } from "react-router-dom";

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
      <div>
        <img className="w-16 h-16 bg-white mr-3" src={image} alt={name} />
      </div>
      <div>
        <h1
          className="text-lg group-hover:text-orangetext font-semibold"
          data-tooltip-id="home-tooltip"
          data-tooltip-content={name}
        >
          {name}
        </h1>
        <p className="text-sm text-gray-600">{employer}</p>
      </div>
    </div>
  );
};

export default TopJobCard;
