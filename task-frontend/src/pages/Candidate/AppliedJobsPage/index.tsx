import { EmptyData, Hero, Loading, PaginationCustom } from "@/components/ui";

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
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { DateHelper, SwalHelper } from "@/utils/helpers";
import { ONCHANGE_APPLICATION_LIST } from "@/store/reducers/listDataReducer";
import applicationsService from "@/services/applicationsService";

const AppliedJobsPage = () => {
  const dispatch = useDispatch();
  const { totalPages, currentPage, itemPerPage, isEmpty } = useSelector(
    (state: any) => state.paginationReducer
  );
  const { applications } = useSelector((state: any) => state.listDataReducer);

  const [open, setOpen] = useState<boolean>(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const _onClickDetail = (id: string) => {
    setId(id);
    setFuncs(ModalConstants.APPLICATION_KEYS.applycationDetail);
    handleOpen();
  };

  const fetchListData = () => {
    setIsLoading(false);
    applicationsService
      .getApplications_Candidate(
        name,
        location,
        status?.id,
        currentPage - 1,
        itemPerPage
      )
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_APPLICATION_LIST(res.data.Data?.content || []));
          dispatch(ONCHANGE_PAGINATION(res.data.Data));
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    dispatch(CLEAR_PAGINATION_STATE());
    dispatch(ONCHANGE_APPLICATION_LIST([]));
  }, []);

  useEffect(() => {
    fetchListData();
  }, [name, location, currentPage, status]);

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

          {isLoading ? (
            <Loading />
          ) : (
            <>
              {isEmpty ? (
                <div className="px-5 lg:px-28 justify-between mx-auto">
                  <EmptyData text="Danh sách rỗng..." />
                </div>
              ) : (
                <>
                  <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {applications.map(
                      (item: ApplicationModel, index: number) => (
                        <JobAppliedCard
                          key={index}
                          id={item.job?.id}
                          employerId={item.job?.employer?.id}
                          image={item.job?.employer?.image}
                          name={item.job?.name}
                          appliedDate={DateHelper.formatDate(item.applyDate)}
                          employer={item.job?.employer?.name}
                          location={item.job?.location}
                          fromSalary={item.job?.fromSalary}
                          toSalary={item.job?.toSalary}
                          category={item.job?.category?.name}
                          isVip={item.job?.isVip}
                          state={item.status}
                          _onClickDetail={() => _onClickDetail(item?.id)}
                        />
                      )
                    )}
                  </div>

                  <div className="px-2 lg:px-28 justify-between mx-auto w-max">
                    <PaginationCustom
                      currentPage={currentPage}
                      setCurrentPage={(page: number) =>
                        dispatch(ONCHANGE_CURRENTPAGE(page))
                      }
                      totalPages={totalPages}
                      type={true}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
      <GreatEmployers />
    </>
  );
};
export default AppliedJobsPage;
