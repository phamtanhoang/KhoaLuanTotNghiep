import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import BANNER_SEARCH from "@/assets/images/banner-search.png";
import { CiStar } from "react-icons/ci";
interface HeroProps {
  title: string;
  titleSearch: string;
  linkSearch: string;
}

const Hero: React.FC<HeroProps> = ({ title, titleSearch, linkSearch }) => {
  const sectionStyle = {
    backgroundImage: `url(${BANNER_SEARCH})`,
  };
  return (
    <section
      style={sectionStyle}
      className="w-full bg-cover bg-center bg-no-repeat"
    >
      <div className="text-center lg:ml-8 py-10 lg:py-16">
        <div className="max-w-xl mx-auto">
          <h1 className="block font-bold text-gray-700 text-3xl lg:text-4xl uppercase">
            {title}
          </h1>
        </div>

        <div className="mt-4 pt-2 max-w-72 mx-auto flex justify-center text-gray-600 text-base gap-3 border-t-2 border-gray-400 border-dashed">
          <Link to={CANDIDATE_PATHS.home} className="hover:text-orangetext">
            Trang chủ
          </Link>
          <CiStar className="text-xl mt-0.5 text-orangetext" />
          <Link to={linkSearch} className="text-orangetext">
            {titleSearch}
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;
