import { ShareCard } from "@/components/ui";
import { CiLink } from "react-icons/ci";
import { FiMapPin } from "react-icons/fi";
interface RightPageProps {
  employer?: string;
  location?: string;
  description?: string;
  procedures?: any;
  tags?: any;
}

const RightPage: React.FC<RightPageProps> = ({
  employer,
  location,
  description,
  procedures,
  tags,
}) => {
  return (
    <>
      <div className="w-full bg-white rounded-sm hidden lg:block">
        <div className="w-full bg-orangetext p-5">
          <h1 className="text-lg font-semibold text-white uppercase leading-tight tracking-wide antialiased hover:underline cursor-pointer">
            {employer}
          </h1>
        </div>
        <div className="w-full p-5">
          <p className="max-w-screen-sm text-sm text-gray-600 font-semibold flex gap-2">
            <FiMapPin className="mt-0.5" />
            Địa chỉ: {location}
          </p>
          {description && (
            <p className="text-sm text-gray-500 mt-3 pt-3 border-t-2 border-gray-300 border-dotted line-clamp-4">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="w-full bg-white rounded-sm max-lg:mt-5">
        <h3 className="font-bold text-xl leading-8  bg-orangetext text-white px-5 py-3">
          Quy trình ứng tuyển
        </h3>
        <div className="p-5">
          <div className="flex flex-col gap-3 border-l-2 border-dashed ml-3">
            {procedures &&
              procedures.map((procedure: any, index: number) => (
                <div className="relative w-full" key={index}>
                  <div className="absolute top-0 -left-[0.8rem] h-6 w-6 rounded-full text-white bg-orangetext flex items-center justify-center">
                    <h1 className="text-center font-bold">
                      {procedure.stepNumber}
                    </h1>
                  </div>
                  <div className="pl-5 ">
                    <h4 className="font-bold text-orangetext">
                      {procedure.name}
                    </h4>
                    <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                      {procedure.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-sm max-lg:mt-5">
        <h3 className="font-bold text-xl leading-8 bg-orangetext text-white px-5 py-3">
          Thông tin khác
        </h3>
        <div className="flex gap-1.5 flex-wrap p-5">
          {tags &&
            tags.map((tag: any, index: number) => (
              <span
                className="bg-gray-50 text-base font-[500] px-4 py-1 rounded-full"
                style={{
                  color: tag.color,

                  borderWidth: "2px",
                  borderColor: tag.color,
                }}
                key={index}
              >
                {tag.name}
              </span>
            ))}
        </div>
      </div>
      <div className="w-full bg-white rounded-sm max-lg:mt-5 pb-0.5">
        <h3 className="font-bold text-xl leading-8 bg-orangetext text-white px-5 py-3">
          Chia sẻ nhà tuyển dụng
        </h3>

        <div className="border-2 border-orangetext flex justify-between items-center px-2 py-1.5 rounded-md m-5">
          <ShareCard />
        </div>
      </div>
    </>
  );
};
export default RightPage;
