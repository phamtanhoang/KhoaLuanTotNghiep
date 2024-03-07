interface TopJobCardProps {
  image: string;
  name: string;
  employer: string;
}

const TopJobCard: React.FC<TopJobCardProps> = ({ image, name, employer }) => {
  return (
    <div className="flex items-center w-full bg-white rounded-md p-4 cursor-pointer group opacity-90 hover:shadow-md">
      <div>
        <img className="w-16 h-16 bg-white mr-3" src={image} alt={name} />
      </div>
      <div>
        <h1 className="text-lg group-hover:text-orangetext font-semibold">
          {name}
        </h1>
        <p className="text-sm text-gray-600">{employer}</p>
      </div>
    </div>
  );
};

export default TopJobCard;
