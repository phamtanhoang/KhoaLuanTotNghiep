import { GrFormNextLink } from "react-icons/gr";

interface TopEmployerCardProps {
  image: string;
  name: string;
}

const TopEmployerCard: React.FC<TopEmployerCardProps> = ({ image, name }) => {
  return (
    <div className="flex flex-col items-start p-8 rounded-md bg-[#eff3f3] h-max cursor-grab">
      <div className="flex gap-1 text-[0.9rem] font-lato font-normal cursor-pointer hover:text-orangetext">
        Xem chi tiết <GrFormNextLink className="text-xl " />
      </div>

      <img
        src={image}
        alt={name}
        className="h-[250px] w-[250px] lg:h-[200px] lg:w-[200px] object-contain mt-[23px] mx-auto relative o my-8  overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40"
      />

      <div className="font-semibold text-lg uppercase w-full text-center">
        {name}
      </div>
    </div>
  );
};

export default TopEmployerCard;
