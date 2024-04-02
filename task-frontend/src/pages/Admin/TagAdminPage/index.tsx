import { Pagination } from "@/components/ui";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

const TagsAdminPage = () => {
  const _onClickFilter = () => {};
  const _onClickAdd = () => {};

  const _onClickDelete = () => {};
  const _onClickDetail = () => {};
  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex justify-between gap-2 lg:gap-4">
          <h1 className="text-2xl font-semibold text-gray-700">
            Danh sách Nhãn
          </h1>
          <button
            className="lg:hidden items-center justify-center p-1.5 lg:px-5 lg:py-2 tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 hover:bg-blue-600 w-max"
            onClick={_onClickAdd}
          >
            <IoIosAddCircleOutline className="text-xl" />
          </button>
        </div>

        <div className="lg:flex lg:items-center lg:justify-between">
          {/* <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
              View all
            </button>

            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Monitored
            </button>

            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Unmonitored
            </button>
          </div> */}

          <div className="relative flex items-center ">
            <span className="absolute">
              <CiSearch className="mx-3 text-gray-400 text-lg" />
            </span>

            <input
              type="text"
              placeholder="Nhập từ khóa..."
              className="block w-full py-2 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg lg:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <button
            className="flex items-center justify-center p-1.5 lg:px-5 lg:py-2 tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 hover:bg-blue-600 gap-2 w-max max-lg:hidden"
            onClick={_onClickAdd}
          >
            <IoIosAddCircleOutline className="text-xl" />
            <span className="">Thêm</span>
          </button>
        </div>
      </section>

      <div className="overflow-hidden border border-borderColor lg:rounded-lg  mt-5">
        {/* <CategoryTableAdmin
          value={exampleData}
          _onClickDelete={_onClickDelete}
          _onClickDetail={_onClickDetail}
        /> */}
      </div>
      <div className="w-max mx-auto mt-5">
        <Pagination type={true} />
      </div>
    </>
  );
};
export default TagsAdminPage;
