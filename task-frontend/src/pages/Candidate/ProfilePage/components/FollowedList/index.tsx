import { LoadingContext } from "@/App";
import NON_USER from "@/assets/images/non-user.jpg";
import ModalBase from "@/components/modal";
import { candidatesService, employersService } from "@/services";
import {
  ONCHANGE_CANDIDATE_LIST,
  ONCHANGE_EMPLOYER_LIST,
} from "@/store/reducers/listDataReducer";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { ModalConstants, PathConstants } from "@/utils/constants";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useEffect } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { RiUserFollowFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FollowedList = () => {
  const dispatch = useDispatch();
  const { totalElements, currentPage, isFirstPage, isLastPage } = useSelector(
    (state: any) => state.paginationReducer
  );
  const { employers } = useSelector((state: any) => state.listDataReducer);
  const context = useContext(LoadingContext);

  const navigate = useNavigate();

  const fetchListData = () => {
    context.handleOpenLoading();
    employersService
      .getFollowed(currentPage - 1, 16)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_EMPLOYER_LIST(res.data.Data?.content || []));
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
  const _onClickInfo = (item: EmployerModel) => {
    navigate(`${PathConstants.CANDIDATE_PATHS.employerDetails2}/${item.id}`);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
          <span className="text-orangetext text-xl my-auto">
            <RiUserFollowFill />
          </span>
          <span className="tracking-wide text-lg font-medium">
            Đang theo dõi ({totalElements})
          </span>
        </div>
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
      <div className="grid grid-cols-2  lg:grid-cols-4 lg: gap-4 lg:gap-8 mt-4 lg:mt-8">
        {employers.map((item: EmployerModel, index: number) => (
          <div
            key={index}
            onClick={() => _onClickInfo(item)}
            className=" text-gray-800 hover:text-orangetext cursor-pointer"
          >
            <img
              src={item.image ? item.image : NON_USER}
              className="w-16 rounded-full mx-auto"
            />
            <p className="text-center font-semibold text-sm mt-1 line-clamp-2">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default FollowedList;
