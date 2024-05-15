import { PathConstants } from "@/utils/constants";
import { AuthHelper } from "@/utils/helpers";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const PaymentError = () => {
  return (
    <div className="w-full">
      <div className="w-full  m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6  md:mx-auto my-auto text-center rounded-lg">
          <div className="flex justify-center pb-5">
            <AiFillCloseCircle className="bg-white text-red-500 text-7xl text-center" />
          </div>

          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Thanh toán không thành công!
          </h3>
          <p className="text-gray-600 my-2">
            Bạn đã thanh toán không thành công gói dịch vụ của Joobs!
          </p>
          <div className="pt-10 pb-5 text-center">
            <Link
              to={
                AuthHelper.isEmployer()
                  ? PathConstants.EMPLOYER_PATHS.dashboard
                  : PathConstants.CANDIDATE_PATHS.home
              }
              className="px-12 bg-bgBlue hover:bg-bgBlue/85 text-white font-semibold py-3 rounded"
            >
              Trở về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentError;
