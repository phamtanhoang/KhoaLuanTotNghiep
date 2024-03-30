import { Link, useLocation } from "react-router-dom";

interface BreadcumbsProps {
  color?: string;
}

const Breadcumbs: React.FC<BreadcumbsProps> = ({ color }) => {
  const { pathname } = useLocation();
  const [layout, page] = pathname
    .split("/")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return (
    <>
      <div className="bg-transparent transition-all flex text-base ">
        <Link
          to={`/${layout}`}
          className="transition-allfont-medium text-gray-700"
        >
          {layout}
        </Link>
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <Link
          to={`/${layout}/${page}`}
          className="transition-all font-semibold"
          style={{ color: color }}
        >
          {page}
        </Link>
      </div>
      {/* <h2 className="text-base">{page}</h2> */}
    </>
  );
};
export default Breadcumbs;
