import { LoadingContext } from "@/App";
import NON_USER from "@/assets/images/non-user.jpg";
import ModalBase from "@/components/modal";
import { candidatesService } from "@/services";
import { ONCHANGE_CANDIDATE_LIST } from "@/store/reducers/listDataReducer";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { ModalConstants } from "@/utils/constants";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

const FollowerList = () => {
  const dispatch = useDispatch();
  const { totalElements, currentPage, isFirstPage, isLastPage } = useSelector(
    (state: any) => state.paginationReducer
  );
  const { candidates } = useSelector((state: any) => state.listDataReducer);
  const context = useContext(LoadingContext);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState<string>("");

  const fetchListData = () => {
    context.handleOpenLoading();
    candidatesService
      .getFollower(currentPage - 1, 32)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_CANDIDATE_LIST(res.data.Data?.content || []));
          dispatch(ONCHANGE_PAGINATION(res.data.Data));
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
    dispatch(CLEAR_PAGINATION_STATE());
  }, []);

  useEffect(() => {
    fetchListData();
  }, [currentPage]);
  const _onClickInfo = (item: CandidateModel) => {
    setId(item.id!);
    setFuncs(ModalConstants.CANDIDATE_KEYS.detailCandidate);
    handleOpen();
  };
  return (
    <>
      <ModalBase
        id={id}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        setFuncs={setFuncs}
        fetchData={fetchListData}
      />

      <div className="flex items-center justify-between">
        <h4 className="text-xl text-gray-900 font-bold">
          Người theo dõi ({totalElements})
        </h4>
        <div className="flex gap-3">
          {!isFirstPage && (
            <p
              className=" font-lato font-normal flex gap-2 text-lightGray hover:gap-3.5 hover:text-orangetext transition-all duration-300 cursor-pointer border-2 rounded-full border-lightGray hover:border-orangetext"
              onClick={() => dispatch(ONCHANGE_CURRENTPAGE(currentPage - 1))}
            >
              <GrFormPreviousLink className="text-2xl" />
            </p>
          )}
          {!isLastPage && (
            <p
              className=" font-lato font-normal flex gap-2 text-lightGray hover:gap-3.5 hover:text-orangetext transition-all duration-300 cursor-pointer border-2 rounded-full border-lightGray hover:border-orangetext"
              onClick={() => dispatch(ONCHANGE_CURRENTPAGE(currentPage + 1))}
            >
              <GrFormNextLink className="text-2xl" />
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 lg: gap-4 lg:gap-8 mt-4 lg:mt-8">
        {candidates.map((item: CandidateModel, index: number) => (
          <div
            key={index}
            onClick={() => _onClickInfo(item)}
            className=" text-gray-800 hover:text-orangetext cursor-pointer"
          >
            <img
              src={item.avatar ? item.avatar : NON_USER}
              className="w-16 rounded-full mx-auto"
            />
            <p className="text-center font-semibold text-sm mt-1 line-clamp-2">
              {item.firstName} {item.lastName}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default FollowerList;
