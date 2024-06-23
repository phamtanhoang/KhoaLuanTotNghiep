import { PaginationCustom } from "@/components/ui";
import {
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "./components";
import { candidatesService } from "@/services";
import { AuthHelper, SwalHelper } from "@/utils/helpers";
import { ModalConstants, PathConstants } from "@/utils/constants";
import ModalBase from "@/components/modal";
import { set } from "date-fns";
import { Link } from "react-router-dom";

const FindCandidatePage = () => {
  const dispatch = useDispatch();
  const { currentPage, itemPerPage, totalPages, isEmpty } = useSelector(
    (state: any) => state.paginationReducer
  );

  const [id, setId] = useState<string>("");
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);

  const [candidates, setCandidates] = useState<any>([]);
  const [job, setJob] = useState<string>("");
  const [mainJob, setMainJob] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [mainLocation, setMainLocation] = useState<string>("");
  const [skill, setSkill] = useState<string>("");
  const [mainSkill, setMainSkill] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isPermission, setIsPermission] = useState<boolean>(true);

  const _onClickFilter = () => {
    setMainJob(job);
    setMainLocation(location);
    setMainSkill(skill);
  };
  const _onClickClear = () => {
    setJob("");
    setLocation("");
    setSkill("");
  };
  const fetchListData = () => {
    setIsLoadingTable(true);
    candidatesService
      .getCandidatesFindJob(
        mainJob,
        mainLocation,
        mainSkill,
        currentPage - 1,
        itemPerPage
      )
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setIsPermission(true);
          setCandidates(res.data.Data?.content || []);
          dispatch(ONCHANGE_PAGINATION(res.data.Data));
        } else if (res.data.Status == 403) {
          setIsPermission(false);
        } else {
          setIsPermission(true);
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        setIsLoadingTable(false);
      });
  };
  useEffect(() => {
    fetchListData();
  }, [currentPage, mainJob, mainLocation, mainSkill]);
  const _onClickDetail = (item: any) => {
    setId(item?.id!);
    setFuncs(ModalConstants.CANDIDATE_KEYS.candidateCV);
    handleOpen();
  };
  return (
    <>
      <ModalBase
        id={id}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        fetchData={()=>{}}
      />
      <div className="relative w-full flex flex-col gap-4 max-lg:px-3">
        {isPermission ? (
          <>
            <div className="">
              <h1 className="text-xl font-semibold text-gray-700 uppercase">
                Tìm Kiếm Ứng Viên
              </h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
              <div className="flex flex-col w-full lg:w-1/4 pr-0 h-max">
                <input
                  className="w-full  rounded-[4px] border-[1px] border-borderColor px-2.5 py-2"
                  placeholder="Nhập công việc của ứng viên cần lọc..."
                  value={job}
                  onChange={(e: any) => {
                    e.preventDefault();
                    setJob(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full lg:w-1/4 pr-0 h-max">
                <input
                  className="w-full  rounded-[4px] border-[1px] border-borderColor px-2.5 py-2"
                  placeholder="Nhập vị trí của ứng viên cần lọc..."
                  value={location}
                  onChange={(e: any) => {
                    e.preventDefault();
                    setLocation(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full lg:w-1/4 pr-0 h-max">
                <input
                  className="w-full  rounded-[4px] border-[1px] border-borderColor px-2.5 py-2"
                  placeholder="Nhập kĩ năng của ứng viên cần lọc..."
                  value={skill}
                  onChange={(e: any) => {
                    e.preventDefault();
                    setSkill(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-3 w-full lg:w-1/4">
                <button
                  className="block w-1/2 mx-auto bg-bgBlue hover:bg-bgBlue/85 text-white rounded px-3 py-2 font-medium"
                  onClick={_onClickFilter}
                >
                  Lọc ứng viên
                </button>
                <button
                  className="block w-1/2 mx-auto bg-gray-50 hover:bg-gray-50/85 text-gray-600 rounded px-3 py-2 font-medium border border-gray-600"
                  onClick={_onClickClear}
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
            <div className="overflow-auto border border-borderColor lg:rounded-[4px]">
              <Table
                value={candidates}
                _onClickDetail={_onClickDetail}
                isLoading={isLoadingTable}
                isEmpty={isEmpty}
              />
            </div>
            <div className="w-max mx-auto mt-5">
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
        ) : (
          <>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-[600px] w-full mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Tài khoản của bạn không thể sử dụng chức năng này!
              </h1>
              <p className="text-gray-600 mb-6 text-xl">
                Vui lòng nâng cấp tài khoản nhà tuyển dụng để sử dụng chức năng.
              </p>
              {AuthHelper.isEmployer() && (
                <Link
                  to={PathConstants.EMPLOYER_PATHS.upgrade}
                  className="inline-block py-3 px-6 bg-orangetext hover:bg-orangetext/85 text-white rounded-lg font-semibold"
                >
                  Nâng cấp tài khoản
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default FindCandidatePage;
