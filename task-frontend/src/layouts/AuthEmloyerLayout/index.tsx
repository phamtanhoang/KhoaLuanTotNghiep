import FixedPlugin from "@/components/ui/FixedPlugin";
import { Outlet } from "react-router-dom";

import "./module.style.css";
import LOGO from "@/assets/images/auth-logo.jpg";
const AuthEmployerLayout = () => {
  return (
    <>
      <section className="min-h-screen w-full flex items-stretch bg-gradient-to-b from-orangetext to-orangebackground leading-5">
        <div className="flex w-full lg:w-1/2 relative items-center bg-white">
          <Outlet />
        </div>
        <div className="lg:flex w-1/2 hidden bg-transparent relative items-center">
          <div
            className="absolute  opacity-75 inset-0 z-0"
            style={{
              backgroundImage: `url(${LOGO})`,
            }}
          ></div>
          <div className="w-full max-w-[500px] mx-auto z-10 p-10 bg-white rounded-md opacity-90">
            <h1 className="my-3 xl:text-5xl font-bold leading-tight text-gray-900">
              Joobs tuyển dụng xin chào!
            </h1>
            <p className="lg:text-lg text-gray-700 font-normal">
              Joobs sẽ giúp bạn tìm được nhân sự phù hợp nhanh chóng và hiệu
              quả. Đăng ký tài khoản ngay để có thể quản lý tin đăng và thông
              tin ứng tuyển vào các vị trí của bạn.
            </p>
          </div>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        {/* <FixedPlugin /> */}
      </section>
    </>
  );
};
export default AuthEmployerLayout;
