import Hero from "@/components/ui/Hero";

import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import { GreatEmployers, Pagination, SearchJobs } from "@/components/ui";
import { DataConstants } from "@/utils/constants/dataConstants";
import { useEffect, useRef, useState } from "react";
import ModalBase from "@/components/modal";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { JobAppliedCard } from "./components";

const AppliedJobsPage = () => {
  const dropdownRef = useRef<any>(null);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState(null);
  const [open, setOpen] = useState<boolean>(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    document.addEventListener("mousedown", _handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", _handleClickOutside);
    };
  }, []);

  const _handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };
  const _onClickState = (item: any) => {
    setSelectedState(item);
  };
  const _onClickDetail = () => {
    setFuncs(MODAL_KEYS.applycationDetail);
    handleOpen();
  };
  return (
    <>
      <ModalBase open={open} handleClose={handleClose} funcs={funcs} />
      <Hero
        title="Công việc đã ứng tuyển"
        linkSearch={CANDIDATE_PATHS.jobs}
        titleSearch="Tuyển dụng khác"
      />
      <section className="pb-10 pt-8 bg-gray-100">
        <div className="w-full lg:w-[80%] px-5 lg:px-0 mx-auto flex flex-col lg:gap-5 rounded-md">
          <SearchJobs />

          <div className="relative ml-auto" ref={dropdownRef}>
            <button
              className="block rounded-md bg-white py-2 px-5 w-max text-gray-700"
              onClick={() => {
                setOpenDropdown(!openDropdown);
              }}
            >
              Trạng thái:{" "}
              <span className="font-semibold">
                {selectedState ? selectedState.name : "Tất cả"}
              </span>
            </button>
            {openDropdown && (
              <div className="absolute right-0 mt-2 py-2 w-max bg-white rounded-md shadow-xl z-20">
                {DataConstants.APPLY_STATE_DATA.map((item: any) => (
                  <button
                    className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 hover:text-orangetext w-full text-left"
                    onClick={() => _onClickState(item)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
            <JobAppliedCard
              image="https://source.unsplash.com/random/400x400"
              name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
              appliedDate="03/02/2002"
              employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
              location="Thành phố Hồ Chí Minh"
              salary="Từ 30 - 50 triệu"
              category="Công nghệ thông tin"
              isVip
              state="PENDING"
              _onClickDetail={_onClickDetail}
            />
          </div>

          <div className="w-max mx-auto mt-5">
            <Pagination />
          </div>
        </div>
      </section>
      <GreatEmployers />
    </>
  );
};
export default AppliedJobsPage;
