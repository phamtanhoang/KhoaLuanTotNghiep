import { LoadingContext } from "@/App";
import vipsService from "@/services/vipsService";
import { ONCHANGE_VIP_LIST } from "@/store/reducers/listDataReducer";
import { CLEAR_PAGINATION_STATE } from "@/store/reducers/paginationState";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ServiceItem } from "./components";
import { useNavigate } from "react-router-dom";
import ModalBase from "@/components/modal";
import { ModalConstants } from "@/utils/constants";

const UpgradeAccountEmployer = () => {
  const dispatch = useDispatch();
  const { vips } = useSelector((state: any) => state.listDataReducer);
  const context = useContext(LoadingContext);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [id, setId] = useState<string>("");

  const fetchListData = () => {
    context.handleOpenLoading();
    vipsService
      .getListByEmployer()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_VIP_LIST(res.data.Data || []));
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
  }, []);
  const _onClickCheckout = (id: string) => {
    setId(id);
    handleOpen();
    setFuncs(ModalConstants.VIP_KEYS.checkout);
  };
  return (
    <>
      <ModalBase
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        setFuncs={setFuncs}
        id={id}
      />
      <div className="mx-auto text-center w-full mt-4 lg:mt-8 ">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800 lg:text-4xl px-4">
          Nâng cấp tài khoản!
        </h2>
        <p className="mt-4 lg:text-lg leading-8 text-gray-600 px-4">
          Bảng giá dịch vụ dành cho nhà tuyển dụng của Joobs
        </p>
        <div className="container py-5 lg:py-10 mx-auto">
          <div className="flex-wrap text-center grid grid-cols-1 lg:grid-cols-2 gap-4">
            {vips.map((item: VipModel, index: number) => (
              <ServiceItem
                key={index}
                color={item.color}
                id={item.id}
                name={item.name}
                description={item?.description}
                month={item.month}
                price={item.price}
                _onClickCheckout={() => {
                  _onClickCheckout(item.id);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default UpgradeAccountEmployer;
