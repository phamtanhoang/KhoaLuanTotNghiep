import { LoadingContext } from "@/App";
import BANNER_SEARCH from "@/assets/images/banner-search.png";
import { SelectCustom } from "@/components/form";
import { ConfigSelect } from "@/configs/selectConfig";
import { categoriesService, tagsService } from "@/services";
import { DataConstants } from "@/utils/constants/dataConstants";
import { SelectHelper } from "@/utils/helpers/selectHelper";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { useContext, useEffect, useState } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { MdWork } from "react-icons/md";

const sectionStyle = {
  backgroundImage: `url(${BANNER_SEARCH})`,
};
interface SearchJobProps {
  name?: string;
  setName?: any;
  location?: string;
  setLocation?: any;
  setCategory?: any;
  setTag?: any;
  setExperience?: any;
  setDateSubmit?: any;
  setType?: any;
}
const SearchJob: React.FC<SearchJobProps> = ({
  name,
  setName,
  location,
  setLocation,
  setCategory,
  setTag,
  setDateSubmit,
  setExperience,
  setType,
}) => {
  const context = useContext(LoadingContext);
  const [hideFilter, setHideFilter] = useState<boolean>(false);

  const [tempName, setTempName] = useState<string>(name || "");
  const [tempLocation, setTempLocation] = useState<string>(location || "");
  const [tempCategory, setTempCategory] = useState<string | null>(null);
  const [tempTag, setTempTag] = useState<string | null>(null);
  const [tempExperience, setTempExperience] = useState<string | null>(null);
  const [tempDateSubmit, setTempDateSubmit] = useState<string | null>(null);
  const [tempType, setTempType] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryModel[]>([
    { id: "", name: "Tất cả ngành nghề" },
  ]);
  const [tags, setTags] = useState<TagModel[]>([
    { id: "", name: "Tất cả nhãn" },
  ]);

  const _onClickHideFilter = () => {
    if (hideFilter == true) {
      setTempCategory(null);
      setTempTag(null);
      setTempExperience(null);
      setTempDateSubmit(null);
      setTempType(null);
    }
    setHideFilter(!hideFilter);
  };

  const _onClickSearch = () => {
    setName(tempName);
    setLocation(tempLocation);
    setCategory(tempCategory);
    setExperience(tempExperience);
    setTag(tempTag);
    setType(tempType);
    setDateSubmit(tempDateSubmit);
  };

  const fetchDropdownData = (service: any, setState: any, state: any) => {
    return service
      .getList_Dropdown()
      .then((res: any) => {
        if (res.status === 200 && res.data.Status === 200) {
          setState([...state, ...res.data.Data]);
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
    fetchTasks.push(
      fetchDropdownData(categoriesService, setCategories, categories)
    );
    fetchTasks.push(fetchDropdownData(tagsService, setTags, tags));
    Promise.all(fetchTasks).finally(() => {
      context.handleCloseLoading();
    });
  }, []);

  return (
    <section
      style={sectionStyle}
      className="w-full bg-cover bg-center bg-no-repeat"
    >
      <div className="h-full py-12 w-full lg:w-[80%] mx-auto ">
        <div className="text-2xl lg:text-3xl text-gray-800 font-bold mb-5 text-center px-5 lg:px-0 tracking-wide leading-7">
          Khám Phá <span className="text-orangetext"> Cơ Hội Việc Làm</span>{" "}
          Trên Website Của Chúng Tôi.
        </div>
        <div className="  p-2 lg:p-5 py-10 lg:py-5 grid grid-cols-1 gap-5 shadow-lg bg-orange-200 lg:rounded-lg w-full">
          <div className="bg-white p-4 lg:p-2 rounded lg:rounded-lg lg:flex w-full gap-5">
            <div></div>
            <div className="flex gap-1 w-full lg:w-[60%] bg-white text-left mb-3 lg:mb-0 py-2 lg:py-0 lg:border-r-2 border-orange-300">
              <MdWork className="text-orangetext h-full text-2xl" />
              <input
                className="w-full bg-transparent ml-2 text-gray-800 focus:outline-none"
                type="text"
                placeholder="Nhập tên công việc..."
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
            </div>
            <div className="flex gap-1 w-full lg:w-[40%] bg-white text-left mb-3 lg:mb-0 py-2 lg:py-0">
              <FaLocationCrosshairs className="text-orangetext h-full text-2xl" />
              <input
                className="w-full bg-transparent ml-2 text-gray-800 focus:outline-none"
                type="text"
                placeholder="Nhập địa điểm..."
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
              />
            </div>

            <button
              className="w-full lg:w-max py-3 px-4 lg:px-14 text-white rounded lg:rounded-full flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
              onClick={_onClickSearch}
            >
              <span className="flex relative z-[1] font-medium">Tìm kiếm</span>
            </button>
          </div>
          <button
            className="w-full lg:w-max py-3 px-4 lg:px-14 text-white rounded flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
            onClick={_onClickHideFilter}
          >
            <span className="flex relative z-[1] font-medium gap-2 ">
              <IoFilter className="self-center text-xl" />
              Lọc nâng cao
            </span>
          </button>

          {hideFilter && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-1.5 border border-white p-1.5 rounded transition-all duration-300">
                <div className="content-center w-full">
                  <SelectCustom
                    value={
                      tempCategory || tempCategory == ""
                        ? SelectHelper.findOptionByCategoryId(
                            tempCategory,
                            categories
                          )
                        : null
                    }
                    options={SelectHelper.convertCategoriesToOptions(
                      categories
                    )}
                    onChange={(e: any) => setTempCategory(e ? e.value : null)}
                    isMulti={false}
                    placeholder="Chọn ngành nghề..."
                    theme={ConfigSelect.customTheme}
                  />
                </div>
                <div className="content-center w-full">
                  <SelectCustom
                    value={
                      tempTag || tempTag == ""
                        ? SelectHelper.findOptionByTagId(tempTag, tags)
                        : null
                    }
                    options={SelectHelper.convertTagsToOptions(tags)}
                    onChange={(e: any) => setTempTag(e ? e.value : null)}
                    isMulti={false}
                    placeholder="Chọn nhãn..."
                    theme={ConfigSelect.customTheme}
                  />
                </div>
                <div className="content-center w-full">
                  <SelectCustom
                    value={
                      DataConstants.EXPERIENCE_DROPDOWN.find(
                        (item) => item.value == tempExperience
                      ) || null
                    }
                    options={DataConstants.EXPERIENCE_DROPDOWN}
                    onChange={(e: any) => setTempExperience(e ? e.value : null)}
                    isMulti={false}
                    placeholder="Chọn kinh nghiệm..."
                    theme={ConfigSelect.customTheme}
                  />
                </div>

                <div className="content-center w-full">
                  <SelectCustom
                    value={
                      DataConstants.DATESUBMIT_DROPDOWN.find(
                        (item) => item.value == tempDateSubmit
                      ) || null
                    }
                    options={DataConstants.DATESUBMIT_DROPDOWN}
                    onChange={(e: any) => setTempDateSubmit(e ? e.value : null)}
                    isMulti={false}
                    placeholder="Chọn ngày đăng..."
                    theme={ConfigSelect.customTheme}
                  />
                </div>
                <div className="content-center w-full">
                  <SelectCustom
                    value={
                      DataConstants.TYPEJOB_DROPDOWN.find(
                        (item) => item.value == tempType
                      ) || null
                    }
                    options={DataConstants.TYPEJOB_DROPDOWN}
                    onChange={(e: any) => setTempType(e ? e.value : null)}
                    isMulti={false}
                    placeholder="Chọn loại tin..."
                    theme={ConfigSelect.customTheme}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default SearchJob;
