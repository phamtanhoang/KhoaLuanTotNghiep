import "react-tooltip/dist/react-tooltip.css";
import { EmployerCard, SearchEmployer } from "./components";
import {
  GreatEmployers,
  ListEmpty,
  Loading,
  PaginationCustom,
} from "@/components/ui";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/App";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import employersService from "@/services/employersService";
import { useNavigate } from "react-router-dom";
import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import EmptyData from "@/components/ui/EmptyData";

const EmployersPage: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(LoadingContext);
  const [keyWord, setKeyWord] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerpage = 10;
  const [totalPages, setTotalPages] = useState<number>(0);
  const [employers, setEmployers] = useState<EmployerModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _onClickDetail = (id: string) => {
    const path = `${CANDIDATE_PATHS.employers}/${id}`;
    navigate(path);
  };

  const fetchListData = () => {
    setIsLoading(false);
    employersService
      .getListPublic(keyWord, currentPage - 1, itemPerpage)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setEmployers(res?.data?.Data?.content);
          setTotalPages(res?.data?.Data?.totalPages);
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
            {employers.length === 0 ? (
              <div className="px-5 lg:px-28 justify-between mx-auto">
                <EmptyData text="Chưa tìm thấy nhà tuyển dụng phù hợp với yêu cầu của bạn" />
              </div>
            ) : (
              <>
                <div className="px-2 lg:px-28 mb-8 mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3">
                  {employers.map((item: EmployerModel, index: number) => (
                    <EmployerCard
                      key={index}
                      image={item.image}
                      banner={item.backgroundImage}
                      name={item.name}
                      address={item.location}
                      description={item.description}
                      isVip={item.isVip}
                      _onClickDetail={() => _onClickDetail(item.id)}
                    />
                  ))}
                </div>

                <div className="px-2 lg:px-28 justify-between mx-auto w-max">
                  <PaginationCustom
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    type={false}
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
