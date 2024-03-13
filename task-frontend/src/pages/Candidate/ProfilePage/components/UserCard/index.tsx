import NON_USER from "@/assets/images/non-user.jpg";
interface UserCardCardProps {
  image?: string;
  name?: string;
  job?: string;
  description?: string;
}

const UserCard: React.FC<UserCardCardProps> = ({
  image,
  name,
  job,
  description,
}) => {
  return (
    <div className="bg-white p-5 border-t-4 border-orangetext shadow-sm rounded-sm">
      <div className="image overflow-hidden">
        <img
          className="h-[200px] w-[200px] mx-auto rounded-full"
          src={image ? image : NON_USER}
          alt={name}
        />
      </div>
      <h1 className="text-gray-900 font-bold text-2xl leading-8 mt-3 text-center">
        {name}
      </h1>
      <h3 className="text-gray-600 font-xl text-semibold leading-6 text-center mt-2">
        {job}
      </h3>
      <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 mt-3">
        &nbsp;&nbsp;&nbsp;&nbsp;{description}
      </p>
    </div>
  );
};
export default UserCard;
