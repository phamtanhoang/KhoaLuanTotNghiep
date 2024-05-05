import { Hero } from "@/components/ui";

import { GreatEmployers, Pagination, SearchJobs } from "@/components/ui";
import {
  DataConstants,
  ModalConstants,
  PathConstants,
} from "@/utils/constants";
import { useEffect, useRef, useState } from "react";
import ModalBase from "@/components/modal";

import { JobAppliedCard } from "./components";
import { MdArrowDropDown } from "react-icons/md";

const AppliedJobsPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [id, setId] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [status, setStatus] = useState<any>(
    DataConstants.APPLY_STATE_DROPDOWN[0]
  );

  const dropdownRef = useRef<any>(null);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

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

  const _onClickDetail = () => {
    setFuncs(ModalConstants.APPLICATION_KEYS.applycationDetail);
    handleOpen();
  };

  return (
    <>
      <ModalBase id={id} open={open} handleClose={handleClose} funcs={funcs} />
      <Hero
        title="Công việc đã ứng tuyển"
        linkSearch={PathConstants.CANDIDATE_PATHS.jobs}
        titleSearch="Tuyển dụng khác"
      />
      <section className="pb-10 pt-8 bg-gray-100">
        <div className="w-full lg:w-[80%] px-5 lg:px-0 mx-auto flex flex-col gap-3 rounded-md">
          <SearchJobs
            name={name}
            location={location}
            setName={setName}
            setLocation={setLocation}
          />

          <div className="relative ml-auto" ref={dropdownRef}>
            <button
              className="flex gap-1 rounded-md bg-white py-2 px-5 w-max text-gray-700 border border-orangetext"
              onClick={() => {
                setOpenDropdown(!openDropdown);
              }}
            >
              Trạng thái:&nbsp;&nbsp;
              <span className="font-medium" style={{ color: status.color }}>
                {status.name}
              </span>
              <MdArrowDropDown className="my-auto text-xl" />
            </button>
            {openDropdown && (
              <div className="absolute right-0 mt-2 py-2 w-max bg-white rounded-md shadow-xl z-20">
                {DataConstants.APPLY_STATE_DROPDOWN.map((item: any) => (
                  <button
                    className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 hover:text-orangetext w-full text-left"
                    onClick={() => {
                      setStatus(item);
                      setOpenDropdown(false);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
            <JobAppliedCard
              id=""
              employerId=""
              image="https://source.unsplash.com/random/400x400"
              name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
              appliedDate="03/02/2002"
              employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
              location="Thành phố Hồ Chí Minh"
              fromSalary="30"
              toSalary=""
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
