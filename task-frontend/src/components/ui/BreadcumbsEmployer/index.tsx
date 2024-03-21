import { Link, useLocation } from "react-router-dom";

const BreadcumbsEmployer = () => {
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
          className="transition-all hover:text-orangetext font-medium text-gray-700"
        >
          {layout}
        </Link>
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <Link
          to={`/${layout}/${page}`}
          className="transition-all text-orangetext font-semibold"
        >
          {page}
        </Link>
      </div>
      {/* <h2 className="text-base">{page}</h2> */}
    </>
  );
};
export default BreadcumbsEmployer;
