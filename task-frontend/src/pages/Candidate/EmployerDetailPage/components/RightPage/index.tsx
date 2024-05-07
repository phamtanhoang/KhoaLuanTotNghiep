import {
  EmptyData,
  JobCard,
  Loading,
  Pagination,
  PaginationCustom,
  SearchJobs,
} from "@/components/ui";
import { jobsService } from "@/services";
import {
  ONCHANGE_APPLICATION_LIST,
  ONCHANGE_JOB_LIST,
} from "@/store/reducers/listDataReducer";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { DateHelper, SwalHelper, TextHelper } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface RightPageProps {
  image?: string;
  id?: string;
}

const RightPage: React.FC<RightPageProps> = ({ image, id }) => {
  const dispatch = useDispatch();
  const { totalPages, currentPage, itemPerPage, isEmpty } = useSelector(
    (state: any) => state.paginationReducer
  );
  const { jobs } = useSelector((state: any) => state.listDataReducer);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const fetchListData = () => {
    setIsLoading(false);
    jobsService
      .getJobsByEmployerID(id!, name, location, currentPage - 1, itemPerPage)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_JOB_LIST(res.data.Data?.content || []));
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
    dispatch(ONCHANGE_JOB_LIST([]));
  }, []);

  useEffect(() => {
    fetchListData();
  }, [id, name, location, currentPage]);
  return (
    <>
      {image && (
        <img
          className="w-full mx-auto rounded-lg object-fill p-3 lg:p-5 pb-0 lg:pb-0"
          src={image}
          alt="image background"
        />
      )}

      <div className="flex flex-col gap-5 p-3 lg:p-5">
        <h3 className="font-bold text-xl leading-8 bg-orangetext text-white px-5 py-3 rounded-md">
          Tuyển dụng
        </h3>
        <SearchJobs
          name={name}
          setName={setName}
          location={location}
          setLocation={setLocation}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isEmpty ? (
              <div className=" pt-5 pb-10 lg:px-28 justify-between mx-auto">
                <EmptyData text="Danh sách rỗng..." />
              </div>
            ) : (
              <>
                <div className="w-full flex flex-col gap-3">
                  {jobs.map((item: JobModel, index: number) => (
                    <JobCard
                      key={index}
                      id={item?.id}
                      image={item?.employer?.image}
                      name={item?.name}
                      dateline={DateHelper.formatDate(new Date(item?.toDate!))}
                      employer={item?.employer?.name}
                      location={item?.location}
                      salary={TextHelper.SalaryText(
                        item?.fromSalary,
                        item?.toSalary
                      )}
                      fetchData={fetchListData}
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
      </div>
    </>
  );
};
export default RightPage;
