import NON_USER from "@/assets/images/non-user.jpg";

interface HumanResourceProps {
  image?: string;
  name?: string;
}

interface HumanResourceListProps {
  value: HumanResourceProps[];
}

const HumanResourceList: React.FC<HumanResourceListProps> = ({ value }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="text-xl text-gray-900 font-bold">
          Bộ phận nhân sự ({value.length})
        </h4>
        {/* <a href="#" title="View All">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </a> */}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg: gap-4 lg:gap-8 mt-4 lg:mt-8">
        {value.map((item, index) => (
          <a
            key={index}
            href="#"
            className=" text-gray-800 hover:text-orangetext"
          >
            <img
              src={item.image ? item.image : NON_USER}
              className="w-16 rounded-full mx-auto"
            />
            <p className="text-center font-bold text-sm mt-1 line-clamp-2">
              {item.name}
            </p>
          </a>
        ))}
      </div>
    </>
  );
};
export default HumanResourceList;
