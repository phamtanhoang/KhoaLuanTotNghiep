import { BiSolidUserDetail } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import NON_USER from "@/assets/images/non-user.jpg";

interface CandidateCardProps {
  value: {
    image?: string;
    name?: string;
    jobRole?: string;
    expYear?: string;
    skills?: string[];
    isVip?: boolean;
  };
}

const CandidateCard: React.FC<CandidateCardProps> = ({ value }) => {
  const { image, name, jobRole, expYear, skills, isVip } = value;

  return (
    <div className="divide-y divide-borderColor rounded-lg bg-white shadow-sm">
      <div className="p-4 flex flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-4 ">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">{name}</h3>
              {isVip && (
                <span className="inline-flex flex-shrink-0 items-center rounded-lg bg-orangetext/10 px-1.5 py-0.5 text-xs font-medium text-orangetext ring-1 ring-inset ring-orangetext">
                  VIP
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 italic">{jobRole}</p>
          </div>
          <img
            className="h-12 w-12 flex-shrink-0 rounded-full"
            src={image || NON_USER}
            alt=""
          />
        </div>

        <div className="flex flex-col flex-wrap w-full gap-2 text-sm">
          <p className="flex  font-medium ">
            <span className="text-gray-600 mr-1.5 font-normal">
              Số năm kinh nghiệm:{" "}
            </span>
            {expYear}
          </p>
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap line-clamp-2 font-medium">
              <span className="text-gray-600 font-normal">Kĩ năng:</span>
              {skills.map((item, index) => (
                <span
                  key={index}
                  className=" ml-1.5 inline-flex flex-shrink-0 items-center rounded-lg bg-borderColor/10 px-2 py-0.5 text-xs font-medium ring-1 ring-inset ring-borderColor"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex divide-x divide-borderColor text-sm">
        <div className="flex w-0 flex-1">
          <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-2 rounded-bl-lg border border-transparent py-3 font-semibold text-gray-800 hover:text-gray-800/85">
            <BiSolidUserDetail className="text-xl" />
            Chi tiết
          </button>
        </div>
        <div className="flex w-0 flex-1">
          <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-2 rounded-bl-lg border border-transparent py-3 font-semibold text-gray-800 hover:text-gray-800/85">
            <IoSend className="text-base" />
            Liên hệ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
