import { LoadingContext } from "@/App";

import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { SelectCustom, TextEditor } from "@/components/form";
import { ConfigSelect } from "@/configs/selectConfig";
import {
  SelectHelper,
  SwalHelper,
  AuthHelper,
  TextHelper,
} from "@/utils/helpers";
import {
  categoriesService,
  proceduresService,
  tagsService,
  humanResourcesService,
  jobsService,
} from "@/services";
import { DataConstants } from "@/utils/constants";

const CreateJob = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;
  const fetchData = props.fetchData;

  // const [openSub, setOpenSub] = useState(false);
  // const [funcsSub, setFuncsSub] = useState<string>("");
  // const handleOpenSub = () => setOpenSub(true);
  // const handleCloseSub = () => setOpenSub(false);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>(
    TextHelper.DescriptionJob
  );
  const [toDate, setToDate] = useState<string>(">");
  const [location, setLocation] = useState<string>("");
  const [checkSalary, setCheckSalary] = useState<boolean>(false);
  const [fromSalary, setFromSalary] = useState<string | null>("");
  const [toSalary, setToSalary] = useState<string | null>("");
  const [experience, setExperience] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [humanResourceId, setHumanResourceId] = useState<string>("");
  const [procedureId, setProcedureId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [hrs, setHrs] = useState<HumanResourceModel[]>([]);
  const [tags, setTags] = useState<TagModel[]>([]);
  const [procedures, setProcedures] = useState<ProcedureModel[]>([]);

  const _onClickSave = () => {
    if (
      !name ||
      !description ||
      !location ||
      !experience ||
      (AuthHelper.isEmployer() && !humanResourceId) ||
      (checkSalary && !fromSalary && !toSalary)
    ) {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }

    context.handleOpenLoading();
    jobsService
      .create(
        name,
        description,
        toDate,
        location,
        checkSalary ? fromSalary || "" : "",
        checkSalary ? toSalary || "" : "",
        experience,
        categoryId,
        AuthHelper.isEmployer() ? humanResourceId : "",
        procedureId,
        selectedTags.map((item: any) => ({
          id: item.value,
        }))
      )
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          SwalHelper.MiniAlert(res.data.Message, "success");
          fetchData();
          handleClose();
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        context.handleCloseLoading();
      });
  };

  const _onChangeCategoryId = (value: string) => {
    setCategoryId(value);
  };
  const _onChangeProcedureId = (value: string) => {
    setProcedureId(value);
  };
  const _onChangeHrId = (value: string) => {
    setHumanResourceId(value);
  };

  const _onChangeTags = (selected: any) => {
    setSelectedTags(selected);
  };
  const _onChangeDescription = (event: any, editor: any) => {
    const data = editor.getData();
    setDescription(data);
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
    fetchTasks.push(fetchDropdownData(categoriesService, setCategories));
    fetchTasks.push(fetchDropdownData(tagsService, setTags));
    fetchTasks.push(fetchDropdownData(proceduresService, setProcedures));
    if (AuthHelper.isEmployer()) {
      fetchTasks.push(fetchDropdownData(humanResourcesService, setHrs));
    }

    Promise.all(fetchTasks).finally(() => {
      context.handleCloseLoading();
    });
  }, []);

  return (
    <>
      {/* <ModalBase open={openSub} handleClose={handleCloseSub} funcs={funcsSub} /> */}
      <div className="lg:w-[45%] w-screen bg-white relative rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
          <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
            Thêm tin tuyển dụng
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-2 mr-1">
          <div className="mx-4 my-2 text-gray-700 flex flex-col gap-3 text-sm">
            <p className="font-semibold text-red-500">
              Lưu ý: Tin tuyển dụng đã được đăng thì không được phép chỉnh sửa
              thông tin
            </p>
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Tên công việc&nbsp;<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext focus:ring-orangetext focus:ring-1 transition-colors duration-300"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Địa điểm&nbsp;<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext focus:ring-orangetext focus:ring-1 transition-colors duration-300"
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Thời hạn&nbsp;<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext focus:ring-orangetext focus:ring-1 transition-colors duration-300"
                  type="date"
                  value={toDate}
                  onChange={(e) => {
                    setToDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex max-lg:flex-col justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Kinh nghiệm&nbsp;<span className="text-red-500">*</span>
                </label>
                {/* <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext focus:ring-orangetext focus:ring-1 transition-colors duration-300"
                  type="text"
                  value={experience}
                  onChange={(e) => {
                    setExperience(e.target.value);
                  }}
                /> */}
                <SelectCustom
                  className={"mt-1"}
                  value={DataConstants.EXPERIENCE_DROPDOWN.find(
                    (item) => item.value == experience
                  )}
                  options={DataConstants.EXPERIENCE_DROPDOWN}
                  onChange={(e: any) => setExperience(e ? e.value : "")}
                  isMulti={false}
                  placeholder="--- Chọn kinh nghiệm ---"
                  theme={ConfigSelect.customTheme}
                />
              </div>
              {AuthHelper.isEmployer() && (
                <div className="content-center w-full">
                  <label className="font-medium tracking-wide text-sm">
                    Cán bộ&nbsp;<span className="text-red-500">*</span>
                  </label>
                  <SelectCustom
                    className={"mt-1"}
                    value={SelectHelper.findOptionByHrId(humanResourceId, hrs)}
                    options={SelectHelper.convertHrsToOptions(hrs)}
                    onChange={(e: any) => _onChangeHrId(e ? e.value : "")}
                    isMulti={false}
                    placeholder="--- Chọn loại cán bộ ---"
                    theme={ConfigSelect.customTheme}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full flex gap-2">
                <input
                  type="checkbox"
                  className="cursor-pointer relative h-5 w-5 rounded-md border my-auto accent-bgBlue"
                  checked={!checkSalary}
                  onClick={() => {
                    setCheckSalary(!checkSalary);
                  }}
                />
                <label className="text-slate-500 flex justify-center items-center font-bold pl-2 pr-2 bg-slate-200 text-sm py-0.5 uppercase">
                  Mức lương thỏa thuận
                </label>
              </div>
            </div>
            {checkSalary && (
              <div className="flex max-lg:flex-col justify-between gap-3 lg:gap-4 content-center">
                <div className="content-center w-full flex gap-4">
                  <div className="content-center w-full">
                    <label className="font-medium tracking-wide text-sm ">
                      Mức lương từ&nbsp;
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext focus:ring-orangetext focus:ring-1 transition-colors duration-300"
                      type="text"
                      value={fromSalary || ""}
                      onChange={(e) => {
                        setFromSalary(e.target.value);
                      }}
                    />
                  </div>
                  <div className="content-center w-full">
                    <label className="font-medium tracking-wide text-sm">
                      Mức lương đến&nbsp;
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext focus:ring-orangetext focus:ring-1 transition-colors duration-300"
                      type="text"
                      value={toSalary || ""}
                      onChange={(e) => {
                        setToSalary(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex max-lg:flex-col justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Ngành nghề
                </label>
                <SelectCustom
                  className={"mt-1 "}
                  value={SelectHelper.findOptionByCategoryId(
                    categoryId,
                    categories
                  )}
                  options={SelectHelper.convertCategoriesToOptions(categories)}
                  onChange={(e: any) => _onChangeCategoryId(e ? e.value : "")}
                  isMulti={false}
                  placeholder="--- Chọn ngành nghề ---"
                  theme={ConfigSelect.customTheme}
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Quy trình tuyển dụng&nbsp;
                  <span className="text-red-500">*</span>
                </label>
                <SelectCustom
                  className={"mt-1"}
                  value={
                    SelectHelper.findOptionByProcedureId(
                      procedureId,
                      procedures
                    ) || ""
                  }
                  options={SelectHelper.convertProceduresToOptions(procedures)}
                  onChange={(e: any) => _onChangeProcedureId(e ? e.value : "")}
                  isMulti={false}
                  placeholder="--- Chọn quy trình ứng tuyển ---"
                  theme={ConfigSelect.customTheme}
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 g lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Nhãn
                </label>
                <SelectCustom
                  className={"mt-1"}
                  value={selectedTags}
                  options={SelectHelper.convertTagsToOptions(tags)}
                  onChange={_onChangeTags}
                  isMulti={true}
                  placeholder="--- Chọn nhãn ---"
                  theme={ConfigSelect.customTheme}
                  styles={ConfigSelect.tagStyles}
                />
              </div>
            </div>

            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Thông tin chi tiết&nbsp;
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <TextEditor
                    value={description}
                    onChange={_onChangeDescription}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 border-t">
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-medium"
            onClick={_onClickSave}
          >
            <FaRegSave className="text-lg" />
            <p>Tạo</p>
          </button>
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/90 font-medium"
            onClick={handleClose}
          >
            <IoMdExit className="text-lg" />
            <p>Đóng</p>
          </button>
        </div>
      </div>
    </>
  );
};
export default CreateJob;
