import { LoadingContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import VNPAY from "@/assets/images/vnpay.jpg";
import vipsService from "@/services/vipsService";
import { DateHelper, SwalHelper } from "@/utils/helpers";
import { useSelector } from "react-redux";

const Checkout = (props: any) => {
  const handleClose = props.handleClose;
  const context = useContext(LoadingContext);
  const id = props.id;

  const [bank, setBank] = useState<string>("NCB");
  const [vip, setVip] = useState<any>(null);
  const _onchangeBank = (event: any) => {
    setBank(event.target.value);
  };

  const { currentEmployer } = useSelector((state: any) => state.authReducer);
  useEffect(() => {
    context.handleOpenLoading();
    vipsService
      .getById_Employer(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setVip(res.data.Data);
        } else {
          SwalHelper.MiniAlert("Thanh toán thất bại!", "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        context.handleCloseLoading();
      });
  }, [id]);

  const _onClickCheckout = () => {
    context.handleOpenLoading();
    vipsService
      .pay(id, bank)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          window.location.href = res.data.Data;
        } else {
          SwalHelper.MiniAlert("Thanh toán thất bại!", "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        context.handleCloseLoading();
      });
  };
  return (
    <div className="md:w-[50%] xl:w-[30%] w-screen bg-white relative lg:rounded">
      <div className="p-5 max-h-[90vh]">
        <h1 className=" mb-5 text-3xl text-center font-semibold">Thanh toán</h1>
        <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 mb-6 font-medium">
          <div className="w-full flex mb-3 items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Tên dịch vụ:</span>
            </div>
            <div className="flex-grow pl-3">
              <span>{vip?.name}</span>
            </div>
          </div>
          <div className="w-full flex mb-3 items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Giá tiền:</span>
            </div>
            <div className="flex-grow pl-3">
              <span>{vip?.price?.toLocaleString()} VNĐ</span>
            </div>
          </div>
          <div className="w-full flex mb-3 items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Thời hạn:</span>
            </div>
            <div className="flex-grow pl-3">
              <span>{vip?.month} Tháng</span>
            </div>
          </div>
          <div className="w-full flex items-center mb-3 ">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Bắt đầu từ:</span>
            </div>
            <div className="flex-grow pl-3">
              <span>{DateHelper.formatDateTime(vip?.fromDate)}</span>
            </div>
          </div>
          <div className="w-full flex items-center font-semibold">
            <div className="w-32">
              <span className="text-gray-600 ">Kết thúc vào:</span>
            </div>
            <div className="flex-grow pl-3">
              <span>{DateHelper.formatDateTime(vip?.toDate)}</span>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
          <div className="w-full p-3 border-b border-gray-200">
            <div className="mb-5">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-indigo-500"
                  name="type"
                  id="type1"
                  checked
                />
                <img src={VNPAY} className="h-6 ml-3" />
              </label>
            </div>
            <div>
              <span className="pr-2">Chọn ngân hàng:</span>
              <select
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none "
                value={bank}
                onChange={_onchangeBank}
              >
                <option value="NCB">Ngân hàng Quốc Dân(NCB)</option>
              </select>
            </div>
          </div>
        </div>
        {currentEmployer?.isVip && (
          <p className="font-semibold text-red-500 text-sm mb-4">
            Lưu ý: Tài khoàn đã được nâng cấp và có thời hạn đến{" "}
            <span className="italic">
              {DateHelper.formatDateTime(vip?.fromDate)}
            </span>
            !
          </p>
        )}
        <div className="flex gap-4">
          <button
            className="block w-full mx-auto bg-red-500 hover:bg-red-500/85 text-white rounded px-3 py-2 font-medium"
            onClick={handleClose}
          >
            Hủy thanh toán
          </button>
          <button
            className="block w-full mx-auto bg-bgBlue hover:bg-bgBlue/85 text-white rounded px-3 py-2 font-medium"
            onClick={_onClickCheckout}
          >
            Thanh toán ngay
          </button>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
