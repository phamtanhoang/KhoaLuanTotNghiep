import { IoCameraSharp } from "react-icons/io5";

interface HRInfoProps {
  avatar?: string;
  firstName?: string;
  lastName?: string;
  _onClickChangeImage?: () => void;
}

const HRInfo: React.FC<HRInfoProps> = ({
  avatar,
  firstName,
  lastName,
  _onClickChangeImage,
}) => {
  return (
    <div className="bg-white lg:rounded-xl p-4 lg:p-8">
      <div className="flex flex-col items-center  relative bg-white rounded-lg pt-10 py-5">
        <div className="relative">
          <img
            src={avatar}
            className="w-48 h-48 border-4 border-orangetext rounded-full"
          />
          <button
            className="absolute bottom-2 right-2 text-2xl p-2 rounded-full bg-orangetext hover:bg-orangetext/90 text-white/90 hover:text-white ring-2 ring-white"
            onClick={_onClickChangeImage}
          >
            <IoCameraSharp />
          </button>
        </div>
      </div>
      <div className="flex items-center   font-medium justify-center">
        <p className="text-2xl">{`${firstName} ${lastName}`}</p>
      </div>
    </div>
  );
};
export default HRInfo;
