import { GrFormNextLink } from "react-icons/gr";
import NONE_USER from "@/assets/images/non-user.jpg";
interface JobDetailCardProps {
  image?: string;
  name?: string;
  employer?: string;
  category?: string;
  experience?: string;
  salary?: string;
  fromDate?: string;
  toDate?: string;
  location?: string;
  tags?: any;
  description?: string;
}

const JobDetailCard: React.FC<JobDetailCardProps> = ({
  image,
  name,
  employer,
  salary,
  experience,
  category,
  fromDate,
  toDate,
  location,
  tags,
  description,
}) => {
  return (
    <>
      <div className="bg-orangetext h-[1vh]"></div>
      <div className="bg-white border-2 border-t-0 border-[#D9D9D9] rounded-md rounded-t-none h-[89vh]">
        <div className="w-full h-[31%] border-b-2 border-[#D9D9D9] p-5">
          <div className=" flex w-full gap-3 justify-between">
            <div className="">
              <h1 className="text-[1.15rem] uppercase font-bold text-gray-700 ">
                {name}
              </h1>
              <div className="mt-1 relative">
                <a className="text-gray-600 text-[1.1rem] font-medium hover:text-gray-800 decoration-clone underline mb-1">
                  {employer}
                </a>
              </div>
            </div>
            <img
              className="w-[6.5rem] h-[6.5rem] border-2  border-gray-200 shadow-sm rounded"
              src={image ? image : NONE_USER}
              alt={name}
            />
          </div>
          <div className="flex justify-between gap-5 mt-2">
            <div className="flex gap-3">
              <button
                className="w-full lg:w-max py-3 px-4 lg:px-12 text-white rounded flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
              >
                <span className="flex relative z-[1] font-medium gap-2 ">
                  Ứng tuyển ngay
                </span>
              </button>
              <button className="font-medium bg-transparent text-orangetext hover:text-orange-500 border-2 border-orangetext hover:border-orange-500 w-full lg:w-max py-3 px-4 lg:px-8 rounded flex  justify-center items-center min-w-max h-10">
                Lưu tin
              </button>
            </div>
            <div className="relative w-max text-center overflow-hidden flex items-center">
              <p className=" font-lato font-normal flex gap-2 text-gray-700 hover:text-orangetext transition-all duration-300 cursor-pointer relative before:absolute before:w-full before:h-0.5 before:bg-orangetext before:-left-36 before:bottom-0 before:opacity-0 hover:before:left-0 hover:before:opacity-100 hover:before:transition-all hover:before:duration-500">
                <span className="">Xem chi tiết</span>{" "}
                <GrFormNextLink className="text-2xl" />
              </p>
            </div>
          </div>
        </div>
        <div className="scrollbar-custom w-full overflow-y-scroll h-[69%]">
          <div className="h-30% mx-5 py-3 border-b-2  border-[#D9D9D9] border-dashed flex flex-col gap-2">
            <div className="flex w-full font-lato  gap-5 text-gray-800 font-bold">
              <p className="w-1/2">
                <span className="font-medium text-gray-600">
                  Ngày đăng tuyển:
                </span>{" "}
                {fromDate}
              </p>
              <p className="w-1/2">
                <span className="font-medium text-gray-600">
                  Ngày kết thúc:
                </span>{" "}
                {toDate}
              </p>
            </div>
            <div className="flex w-full font-lato  gap-5 text-gray-800 font-bold">
              <p className="w-1/2">
                <span className="font-medium text-gray-600">
                  Loại công việc:
                </span>{" "}
                {category}
              </p>
              <p className="w-1/2">
                <span className="font-medium text-gray-600">Kinh nghiệm:</span>{" "}
                {experience}
              </p>
            </div>
            <div className="flex w-full font-lato  gap-5 text-gray-800 font-bold">
              <p className="w-1/2">
                <span className="font-medium text-gray-600">Mức lương:</span>{" "}
                {salary}
              </p>
              <p className="w-1/2">
                <span className="font-medium text-gray-600">Địa điểm:</span>{" "}
                {location}
              </p>
            </div>

            <div className="flex w-full font-lato  text-gray-800 font-bold gap-1.5 py-2">
              {tags &&
                tags.map((tag: any) => (
                  <div
                    className="inline-block relative py-1 text-xs"
                    key={tag.id}
                  >
                    <div
                      className="absolute inset-0 flex"
                      style={{ color: tag.color }}
                    >
                      <svg height="100%" viewBox="0 0 50 100">
                        <path
                          d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div
                        className="flex-grow h-full -ml-px  rounded-md rounded-l-none"
                        style={{ backgroundColor: tag.color }}
                      ></div>
                    </div>
                    <span className="relative text-white uppercase font-semibold">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      {tag.name}
                      <span>&nbsp;&nbsp;&nbsp;</span>
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div
            className="h-70% mx-5 my-3"
            dangerouslySetInnerHTML={{
              __html: description || "",
            }}
          />
        </div>
      </div>
    </>
  );
};
export default JobDetailCard;
