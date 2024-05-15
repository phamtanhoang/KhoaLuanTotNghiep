import NONE_USER from "@/assets/images/non-user.jpg";
import { useNavigate } from "react-router-dom";
interface GreatEmployerCardProps {
  id: string;
  image: string;
  name: string;
  description: string;
}

const GreatEmployerCard: React.FC<GreatEmployerCardProps> = ({
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
    <div className="relative flex h-max flex-col rounded-xl bg-white bg-clip-border text-gray-700 cursor-grab">
      <div className="relative mx-auto my-8 w-[120px] h-[120px] overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        <img src={image ? image : NONE_USER} alt={name} />
      </div>
      <div className="px-6 py-3 pt-0 text-center">
        <h5
          className="mb-1 block font-sans uppercase font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased line-clamp-1"
          data-tooltip-id="tooltip"
          data-tooltip-content={name}
        >
          {name}
        </h5>
        <p
          className="block font-sans text-[0.9rem] font-normal leading-relaxed text-inherit antialiased line-clamp-2"
        >
          {description}
        </p>
      </div>
      <div className="p-6 pt-0 mx-auto">
        <button
          className="select-none rounded-lg bg-orangetext py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-orangetext/20 transition-all hover:shadow-lg hover:shadow-orangetext/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
          onClick={_onClickDetail}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};
export default GreatEmployerCard;
