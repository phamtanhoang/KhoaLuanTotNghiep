import { LoadingContext } from "@/App";
import BANNER_SEARCH from "@/assets/images/banner-search.png";
import { SelectCustom } from "@/components/form";
import { ConfigSelect } from "@/configs/selectConfig";
import { categoriesService } from "@/services";
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
const SearchJob = () => {
  const context = useContext(LoadingContext);
  const [hideFilter, setHideFilter] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [dateSubmit, setDateSubmit] = useState<string | null>(null);
  const [type, setType] = useState<boolean | null>(null);
  const [categories, setCategories] = useState<CategoryModel[]>([
    { id: "", name: "Tất cả ngành nghề" },
  ]);

  const _onClickHideFilter = () => {
    setHideFilter(!hideFilter);
  };

  const fetchCategories = async () => {
    context.handleOpenLoading();
    await categoriesService
      .getList_Dropdown()
      .then((res: any) => {
        if (res.status === 200 && res.data.Status === 200) {
          setCategories([...categories, ...res.data.Data]);
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

  useEffect(() => {
    fetchCategories();
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex gap-1 w-full lg:w-[40%] bg-white text-left mb-3 lg:mb-0 py-2 lg:py-0">
              <FaLocationCrosshairs className="text-orangetext h-full text-2xl" />
              <input
                className="w-full bg-transparent ml-2 text-gray-800 focus:outline-none"
                type="text"
                placeholder="Nhập địa điểm..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              className="w-full lg:w-max py-3 px-4 lg:px-14 text-white rounded lg:rounded-full flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
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
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 border border-white p-2 rounded transition-all duration-300">
                <div className="content-center w-full">
                  <SelectCustom
                    className={"mt-1"}
                    value={
                      category || category == ""
                        ? SelectHelper.findOptionByCategoryId(
                            category,
                            categories
                          )
                        : null
                    }
                    options={SelectHelper.convertCategoriesToOptions(
                      categories
                    )}
                    onChange={(e: any) => setCategory(e ? e.value : null)}
                    isMulti={false}
                    placeholder="--- Chọn ngành nghề ---"
                    theme={ConfigSelect.customTheme}
                  />
                </div>
                <div className="content-center w-full">
                  <SelectCustom
                    className={"mt-1"}
                    value={
                      DataConstants.EXPERIENCE_DROPDOWN.find(
                        (item) => item.value == experience
                      ) || null
                    }
                    options={DataConstants.EXPERIENCE_DROPDOWN}
                    onChange={(e: any) => setExperience(e ? e.value : null)}
                    isMulti={false}
                    placeholder="--- Chọn kinh nghiệm ---"
                    theme={ConfigSelect.customTheme}
                  />
                </div>

                <div className="content-center w-full">
                  <SelectCustom
                    className={"mt-1"}
                    value={
                      DataConstants.DATESUBMIT_DROPDOWN.find(
                        (item) => item.value == dateSubmit
                      ) || null
                    }
                    options={DataConstants.DATESUBMIT_DROPDOWN}
                    onChange={(e: any) => setDateSubmit(e ? e.value : null)}
                    isMulti={false}
                    placeholder="--- Chọn ngày đăng ---"
                    theme={ConfigSelect.customTheme}
                  />
                </div>
                <div className="content-center w-full">
                  <SelectCustom
                    className={"mt-1"}
                    value={
                      DataConstants.TYPEJOB_DROPDOWN.find(
                        (item) => item.value == type
                      ) || null
                    }
                    options={DataConstants.TYPEJOB_DROPDOWN}
                    onChange={(e: any) => setType(e ? e.value : null)}
                    isMulti={false}
                    placeholder="--- Chọn loại tin ---"
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
