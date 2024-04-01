interface TopCategoryCardProps {
  id: string;
  image: string;
  title: string;
  jobCount: number;
}

const TopCategoryCard: React.FC<TopCategoryCardProps> = ({
  id,
  image,
  title,
  jobCount,
}) => {
  const _onClickDetail = () => {};
  return (
    <div
      className="relative overflow-hidden group rounded-xl cursor-pointer"
      onClick={_onClickDetail}
    >
      <img
        src={image}
        className="w-full z-0 h-full object-fill transition-transform transform duration-500 group-hover:scale-110"
        alt={title}
      />
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto bg-black justify-center rounded-lg bg-opacity-35 group-hover:bg-opacity-40 backdrop-blur-md aspect-w-1 aspect-h-1">
        <div className="px-4 py-2">
          <h2 className="text-xl font-semibold text-white mb-0 pb-1">
            {title}
          </h2>
          <p className="text-lg font-normal text-gray-300">
            {jobCount} công việc
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopCategoryCard;
