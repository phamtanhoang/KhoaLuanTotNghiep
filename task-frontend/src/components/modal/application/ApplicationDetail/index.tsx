import { AiFillMessage, AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";

const ApplicationDetail = (props: any) => {
  const handleClose = props.handleClose;

  return (
    <div className="lg:w-[45%] w-screen bg-white relative rounded">
      <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
        <h2 className="text-xl font-semibold line-clamp-1 my-auto">
          Chi tiết ứng tuyển
        </h2>
        <button
          className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div className="overflow-auto scrollbar-custom ">
        <div className="my-4 mx-4 text-gray-700 flex flex-col gap-4">
          <div className="content-center">
            <label
              htmlFor="isExChange"
              className="cursor-pointer text-slate-700 items-center font-semibold bg-slate-200 uppercase text-base p-2"
            >
              Ứng tuyển vị trí Front-End tai Công ty dược phẩm Phúc Long
            </label>
          </div>
          <div className="p-4 border border-orangetext border-dotted rounded-lg flex flex-col gap-2 text-sm ">
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Họ và tên
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                disabled
              />
            </div>
            <div className="lg:flex justify-between gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Email
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  disabled
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Số điện thoại
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  disabled
                />
              </div>
            </div>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                CV ứng tuyển
              </label>

              <div className="rounded-md bg-gray-100 py-2 px-4 mt-2 cursor-pointer">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base font-medium truncate">
                    {/* {cvFile.name} */}123123
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-center">
            <label className="font-medium tracking-wide text-sm text-base">
              Thư giới thiệu:&nbsp;
            </label>
            <div
              className="w-full content-center text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext min-h-24"
              dangerouslySetInnerHTML={{
                __html: "",
              }}
            />
          </div>
          <div className="content-center">
            <label className="font-medium tracking-wide text-sm text-base">
              Quá trình ứng tuyển:&nbsp;
            </label>
            <table className="border-collapse w-full mt-1">
              <thead>
                <tr>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Company name
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Country
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Status
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Company name
                    </span>
                    KnobHome
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Country
                    </span>
                    German
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Status
                    </span>
                    <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">
                      deleted
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Actions
                    </span>
                    <a
                      href="#"
                      className="text-blue-400 hover:text-blue-600 underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="text-blue-400 hover:text-blue-600 underline pl-6"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
                <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Company name
                    </span>
                    Squary
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Country
                    </span>
                    Schweden
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Status
                    </span>
                    <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">
                      active
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Actions
                    </span>
                    <a
                      href="#"
                      className="text-blue-400 hover:text-blue-600 underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="text-blue-400 hover:text-blue-600 underline pl-6"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
                <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Company name
                    </span>
                    ghome
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Country
                    </span>
                    Switzerland
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Status
                    </span>
                    <span className="rounded bg-yellow-400 py-1 px-3 text-xs font-bold">
                      inactive
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Actions
                    </span>
                    <a
                      href="#"
                      className="text-blue-400 hover:text-blue-600 underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="text-blue-400 hover:text-blue-600 underline pl-6"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
        <button className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/90 font-medium">
          <AiFillMessage className="text-lg" />
          <p>Trò chuyện</p>
        </button>
        <button className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/90 font-medium">
          <IoMdExit className="text-lg" />
          <p>Đóng</p>
        </button>
      </div>
    </div>
  );
};
export default ApplicationDetail;
