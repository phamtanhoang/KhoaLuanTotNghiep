import {
  ONCHANGE_KEYWORD,
  ONCHANGE_STATUS,
  ONCLEAR_FILTER,
} from "@/store/reducers/searchReducer";
import { DataConstants } from "@/utils/constants/dataConstants";
import { EMPLOYER_PATHS } from "@/utils/constants/pathConstants";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Title = (props: any) => {
  return (
    <>
      {props.urlLink == EMPLOYER_PATHS.jobs
        ? "Lọc công việc"
        : props.urlLink == EMPLOYER_PATHS.applys
        ? "Lọc đơn ứng tuyển"
        : props.urlLink == EMPLOYER_PATHS.procedure
        ? "Lọc quy trình"
        : props.urlLink == EMPLOYER_PATHS.findCandidate
        ? "Lọc ứng viên"
        : props.urlLink == EMPLOYER_PATHS.hr
        ? "Lọc nhân sự"
        : ""}
    </>
  );
};

const FilterModal = (props: any) => {
  const handleClose = props.handleClose;
  const dispatch = useDispatch();
  const searchReducer = useSelector((state: any) => state.searchReducer);
  const location = useLocation();
  const isAdminPath = location.pathname.includes("/admin/");
  const [keyword, setKeyword] = useState<string>(searchReducer.keyword);

  const [status, setStatus] = useState<string>(searchReducer.status);

  const _onSearch = () => {
    if (location.pathname === EMPLOYER_PATHS.hr) {
      dispatch(ONCHANGE_STATUS(status));
      dispatch(ONCHANGE_KEYWORD(keyword));
    }
    if (location.pathname === EMPLOYER_PATHS.procedure) {
      dispatch(ONCHANGE_KEYWORD(keyword));
    }
    handleClose();
  };
  const _onClear = () => {
    setKeyword("");
    setStatus("");
  };
  return (
    <div className="absolute inset-y-0 right-0 w-[85%] lg:w-[30%] overflow-y-auto">
      <div className="h-full flex flex-col px-4 py-8 lg:p-8 bg-white">
        <div className="flex items-center justify-between ">
          <h2 className="uppercase items-center text-center text-xl flex font-semibold w-full">
            <Title urlLink={location.pathname} />
          </h2>
          <button
            className="p-1.5 rounded text-lg font-bold text-gray-800 hover:bg-red-500 hover:text-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <div className="w-full">
            <label className="block mb-1.5 text-base font-medium text-gray-600">
              Từ khóa:
            </label>
            <input
              type="text"
              placeholder="Nhập từ khóa..."
              className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-offset-2  transition-colors duration-300 ${
                isAdminPath
                  ? "border-borderColor focus:border-bgBlue focus:ring-bgblue"
                  : "border-borderColor focus:border-orangetext focus:ring-orangetext"
              }`}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          {location.pathname === EMPLOYER_PATHS.hr && (
            <div className="w-full">
              <label className="block mb-1.5 text-base font-medium text-gray-600">
                Tình trạng:
              </label>
              <select
                className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-offset-2  transition-colors duration-300 ${
                  isAdminPath
                    ? "border-borderColor focus:border-bgBlue focus:ring-bgblue"
                    : "border-borderColor focus:border-orangetext focus:ring-orangetext"
                }`}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="">Tất cả</option>
                {DataConstants.HR_STATE_DATA.map((item, index) => (
                  <option key={index} value={item.id} className="py-2">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* <div>
            <label className="block mb-1.5 text-base font-medium text-gray-600">
              Email:
            </label>
            <input
              type="text"
              placeholder="Nhập email..."
              className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-offset-2  transition-colors duration-300 ${
                isAdminPath
                  ? "border-borderColor focus:border-bgBlue focus:ring-bgblue"
                  : "border-borderColor focus:border-orangetext focus:ring-orangetext"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1.5 text-base font-medium text-gray-600">
              Số điện thoại:
            </label>
            <input
              type="text"
              placeholder="Nhập số điên thoại..."
              className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-offset-2  transition-colors duration-300 ${
                isAdminPath
                  ? "border-borderColor focus:border-bgBlue focus:ring-bgblue"
                  : "border-borderColor focus:border-orangetext focus:ring-orangetext"
              }`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block mb-1.5 text-base font-medium text-gray-600">
                Giới tính:
              </label>

              <select
                className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-offset-2  transition-colors duration-300 ${
                  isAdminPath
                    ? "border-borderColor focus:border-bgBlue focus:ring-bgblue"
                    : "border-borderColor focus:border-orangetext focus:ring-orangetext"
                }`}
                onChange={(e) => setSex(e.target.value)}
                value={sex}
              >
                <option value="">Tất cả</option>
                {DataConstants.SEX_DATA.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block mb-1.5 text-base font-medium text-gray-600">
                Tình trạng:
              </label>
              <select
                className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-offset-2  transition-colors duration-300 ${
                  isAdminPath
                    ? "border-borderColor focus:border-bgBlue focus:ring-bgblue"
                    : "border-borderColor focus:border-orangetext focus:ring-orangetext"
                }`}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="">Tất cả</option>
                {DataConstants.HR_STATE_DATA.map((item, index) => (
                  <option key={index} value={item.id} className="py-2">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div> */}
        </div>

        <div className="flex justify-between items-center border-borderColor mt-10">
          <button
            className="flex items-center gap-2 w-max h-max px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-semibold"
            onClick={_onSearch}
          >
            <MdFilterAlt className="text-lg" />
            <p>Lọc</p>
          </button>
          <button
            className="flex items-center gap-2 w-max h-max px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-500/85 font-semibold"
            onClick={_onClear}
          >
            <MdFilterAltOff className="text-lg" />
            <p>Xóa</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default FilterModal;
