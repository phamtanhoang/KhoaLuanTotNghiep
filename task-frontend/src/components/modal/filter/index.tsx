import { LoadingContext } from "@/App";
import { SelectCustom } from "@/components/form";
import { ConfigSelect } from "@/configs/selectConfig";
import { categoriesService } from "@/services";
import {
  ONCHANGE_CATEGORY,
  ONCHANGE_KEYWORD,
  ONCHANGE_STATUS,
} from "@/store/reducers/searchReducer";
import { PathConstants, DataConstants } from "@/utils/constants";
import { SelectHelper, SwalHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Title = (props: any) => {
  return (
    <>
      {props.urlLink == PathConstants.EMPLOYER_PATHS.jobs
        ? "Lọc tin tuyển dụng"
        : props.urlLink == PathConstants.EMPLOYER_PATHS.applys
        ? "Lọc đơn ứng tuyển"
        : props.urlLink == PathConstants.EMPLOYER_PATHS.procedure
        ? "Lọc quy trình"
        : props.urlLink == PathConstants.EMPLOYER_PATHS.findCandidate
        ? "Lọc ứng viên"
        : props.urlLink == PathConstants.EMPLOYER_PATHS.hr
        ? "Lọc nhân sự"
        : ""}
    </>
  );
};

const FilterModal = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;

  const dispatch = useDispatch();
  const searchReducer = useSelector((state: any) => state.searchReducer);
  const location = useLocation();
  const isAdminPath = location.pathname.includes("/admin/");
  const [keyword, setKeyword] = useState<string>(searchReducer.keyword);

  const [status, setStatus] = useState<string>(searchReducer.status);
  const [category, setCategory] = useState<string>(searchReducer.category);

  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const _onSearch = () => {
    handleClose();
    if (location.pathname === PathConstants.EMPLOYER_PATHS.hr) {
      dispatch(ONCHANGE_STATUS(status));
      dispatch(ONCHANGE_KEYWORD(keyword));
      return;
    }
    if (location.pathname === PathConstants.EMPLOYER_PATHS.procedure) {
      dispatch(ONCHANGE_KEYWORD(keyword));
      return;
    }
    if (location.pathname === PathConstants.EMPLOYER_PATHS.jobs) {
      dispatch(ONCHANGE_STATUS(status));
      dispatch(ONCHANGE_KEYWORD(keyword));
      dispatch(ONCHANGE_CATEGORY(category));
      return;
    }
    if (location.pathname === PathConstants.EMPLOYER_PATHS.applys) {
      dispatch(ONCHANGE_STATUS(status));
      dispatch(ONCHANGE_KEYWORD(keyword));
      return;
    }
  };
  const _onClear = () => {
    setKeyword("");
    setStatus("");
    setCategory("");
  };
  const fetchDropdownData = (service: any, setState: any) => {
    return service
      .getList_Dropdown()
      .then((res: any) => {
        if (res.status === 200 && res.data.Status === 200) {
          setState(res.data.Data);
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      });
  };
  useEffect(() => {
    context.handleOpenLoading();
    const fetchTasks = [];
    if (location.pathname === PathConstants.EMPLOYER_PATHS.jobs)
      fetchTasks.push(fetchDropdownData(categoriesService, setCategories));
    Promise.all(fetchTasks).finally(() => {
      context.handleCloseLoading();
    });
  }, []);

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
              className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors duration-300 ${
                isAdminPath
                  ? "border-borderColor focus:border-bgBlue focus:ring-bgblue"
                  : "border-borderColor focus:border-orangetext focus:ring-orangetext"
              }`}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          {location.pathname === PathConstants.EMPLOYER_PATHS.jobs && (
            <div className="w-full">
              <label className="block mb-1.5 text-base font-medium text-gray-600">
                Ngành nghề:
              </label>
              <SelectCustom
                className={"mt-1"}
                value={SelectHelper.findOptionByCategoryId(
                  category,
                  categories
                )}
                options={SelectHelper.convertCategoriesToOptions(categories)}
                onChange={(e: any) => setCategory(e ? e.value : "")}
                isMulti={false}
                placeholder="--- Chọn Ngành nghề ---"
                theme={ConfigSelect.customTheme}
              />
            </div>
          )}
          {(location.pathname === PathConstants.EMPLOYER_PATHS.hr ||
            location.pathname === PathConstants.EMPLOYER_PATHS.jobs ||
            location.pathname === PathConstants.EMPLOYER_PATHS.applys) && (
            <div className="w-full">
              <label className="block mb-1.5 text-base font-medium text-gray-600">
                Tình trạng:
              </label>
              <select
                className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors duration-300 ${
                  isAdminPath
                    ? "border-borderColor focus:border-bgBlue focus:ring-bgblue"
                    : "border-borderColor focus:border-orangetext focus:ring-orangetext"
                }`}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                {location.pathname === PathConstants.EMPLOYER_PATHS.hr &&
                  DataConstants.HR_STATE_DROPDOWN.map((item, index) => (
                    <option key={index} value={item.id} className="py-2">
                      {item.name}
                    </option>
                  ))}
                {location.pathname === PathConstants.EMPLOYER_PATHS.jobs &&
                  DataConstants.JOB_STATE_DROPDOWN.map((item, index) => (
                    <option key={index} value={item.id} className="py-2">
                      {item.name}
                    </option>
                  ))}
                {location.pathname === PathConstants.EMPLOYER_PATHS.applys &&
                  DataConstants.APPLY_STATE_DROPDOWN.map((item, index) => (
                    <option key={index} value={item.id} className="py-2">
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
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
export { FilterModal };
