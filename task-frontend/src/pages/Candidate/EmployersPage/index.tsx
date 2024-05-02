import "react-tooltip/dist/react-tooltip.css";
import { EmployerCard, SearchEmployer } from "./components";
import { GreatEmployers, Loading, PaginationCustom } from "@/components/ui";
import { useEffect, useState } from "react";
import { SwalHelper } from "@/utils/helpers";
import { employersService } from "@/services";
import { useNavigate } from "react-router-dom";
import EmptyData from "@/components/ui/EmptyData";
import { PathConstants } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { ONCHANGE_EMPLOYER_LIST } from "@/store/reducers/listDataReducer";

const EmployersPage: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPages, currentPage, itemPerPage, isEmpty } = useSelector(
    (state: any) => state.paginationReducer
  );
  const { employers } = useSelector((state: any) => state.listDataReducer);
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _onClickDetail = (id: string) => {
    const path = `${PathConstants.CANDIDATE_PATHS.employers}/${id}`;
    navigate(path);
  };

  const fetchListData = () => {
    setIsLoading(false);
    employersService
      .getListPublic(keyWord, currentPage - 1, itemPerPage)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_EMPLOYER_LIST(res.data.Data?.content || []));
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
  }, []);

  useEffect(() => {
    fetchListData();
  }, [keyWord, currentPage]);
  return (
    <>
      <SearchEmployer keyWord={keyWord} setKeyWord={setKeyWord} />
      <section className="py-8 lg:py-12 lg:pt-12 lg:pb-16 ">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isEmpty ? (
              <div className="px-5 lg:px-28 justify-between mx-auto">
                <EmptyData text="Chưa tìm thấy nhà tuyển dụng phù hợp với yêu cầu của bạn" />
              </div>
            ) : (
              <>
                <div className="px-2 lg:px-28 mb-8 mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3">
                  {employers.map((item: EmployerModel, index: number) => (
                    <EmployerCard
                      key={index}
                      image={item.image!}
                      banner={item.backgroundImage!}
                      name={item.name!}
                      address={item.location!}
                      description={item.description!}
                      isVip={item.isVip!}
                      _onClickDetail={() => _onClickDetail(item.id!)}
                    />
                  ))}
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
      </section>
      <GreatEmployers />
    </>
  );
};

export default EmployersPage;
