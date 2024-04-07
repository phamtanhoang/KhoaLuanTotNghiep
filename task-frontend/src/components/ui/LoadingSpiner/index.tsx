interface LoadingSpinerProps {
  type?: boolean;
}
const LoadingSpiner: React.FC<LoadingSpinerProps> = ({ type }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/50 z-[9999] h-full w-full flex items-center justify-center">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-white"></div>
        <div
          className={`absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 animate-spin ${
            !type ? "border-orangetext" : "border-bgBlue"
          }`}
        ></div>
      </div>
    </div>
  );
};
export default LoadingSpiner;
