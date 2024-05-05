import { ShareCard } from "@/components/ui";
import { PathConstants } from "@/utils/constants";

import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { Link } from "react-router-dom";
interface RightPageProps {
  id?: string;
  employer?: string;
  phoneNumber?: string;
  email?: string;
  steps?: StepModel[];
  tags?: TagModel[];
}

const RightPage: React.FC<RightPageProps> = ({
  id,
  employer,
  phoneNumber,
  email,
  steps,
  tags,
}) => {
  return (
    <>
      <div className="w-full bg-white rounded-sm hidden lg:block">
        <div className="w-full bg-orangetext p-5">
          <Link
            to={`${PathConstants.CANDIDATE_PATHS.employers}/${id}`}
            className="text-lg font-semibold text-white uppercase leading-tight tracking-wide antialiased hover:underline cursor-pointer"
          >
            {employer}
          </Link>
        </div>
        <div className="w-full p-5 flex flex-col gap-3">
          <p className="max-w-screen-sm text-sm text-gray-600 font-semibold flex gap-2">
            <MdOutlineEmail className="text-lg my-auto" />
            Email: {email}
          </p>
          <p className="max-w-screen-sm text-sm text-gray-600 font-semibold flex gap-2">
            <MdOutlinePhone className="text-lg my-auto" />
            Số điện thoại: {phoneNumber}
          </p>
        </div>
      </div>
      <div className="w-full bg-white rounded-sm max-lg:mt-3">
        <h3 className="font-semibold text-base uppercase leading-8 border-b-2 border-body  text-gray-600 px-5 py-1.5">
          Quy trình ứng tuyển
        </h3>
        <div className="p-5">
          <div className="flex flex-col gap-3 border-l-2 border-dashed ml-3">
            {steps &&
              steps.map((item: any, index: number) => (
                <div className="relative w-full" key={index}>
                  <div className="absolute top-0 -left-[0.8rem] h-6 w-6 rounded-full text-white bg-orangetext flex items-center justify-center">
                    <h1 className="text-center font-semibold my-auto">
                      {item.number + 1}
                    </h1>
                  </div>
                  <div className="pl-5 ">
                    <h4 className="font-bold text-orangetext">{item.name}</h4>
                    <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-sm max-lg:mt-3">
        <h3 className="font-semibold text-base uppercase leading-8 border-b-2 border-body  text-gray-600 px-5 py-1.5">
          Thông tin khác
        </h3>
        <div className="flex gap-1.5 flex-wrap p-5">
          {tags &&
            tags.map((item: TagModel, index: number) => (
              <span
                className="text-base font-medium px-4 py-1 rounded text-white"
                style={{
                  backgroundColor: item.color,
                  borderWidth: "2px",
                  borderColor: item.color,
                }}
                key={index}
              >
                {item.name}
              </span>
            ))}
        </div>
      </div>
      <div className="w-full bg-white rounded-sm max-lg:mt-3 pb-0.5">
        <h3 className="font-semibold text-base uppercase leading-8 border-b-2 border-body  text-gray-600 px-5 py-1.5">
          Chia sẻ tin tuyển dụng
        </h3>

        <div className="border-2 border-orangetext flex justify-between items-center px-2 py-1.5 rounded-md m-5">
          <ShareCard />
        </div>
      </div>
    </>
  );
};
export default RightPage;
