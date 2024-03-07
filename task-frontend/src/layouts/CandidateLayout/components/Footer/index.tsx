import {
  AiFillFacebook,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineGooglePlus,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

import LOGO from "@/assets/images/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-white text-center  lg:text-left">
        <div className="flex items-center justify-center border-b-2 border-gray-200 p-4 lg:justify-between">
          <div className="mr-12 hidden lg:block text-gray-800">
            <span>Hãy kết nối với chúng tôi trên các mạng xã hội:</span>
          </div>

          <div className="flex justify-center">
            <a href="#!" className="mr-6  hover:text-orangetext">
              <AiFillFacebook className="text-xl" />
            </a>
            <a href="#!" className="mr-6  hover:text-orangetext">
              <AiOutlineTwitter className="text-xl" />
            </a>
            <a href="#!" className="mr-6  hover:text-orangetext">
              <AiOutlineGooglePlus className="text-xl" />
            </a>
            <a href="#!" className="mr-6  hover:text-orangetext">
              <AiOutlineInstagram className="text-xl" />
            </a>
            <a href="#!" className="mr-6  hover:text-orangetext">
              <AiFillLinkedin className="text-xl" />
            </a>
            <a href="#!" className="mr-6  hover:text-orangetext">
              <AiFillGithub className="text-xl" />
            </a>
          </div>
        </div>

        <div className="mx-6 pt-10 pb-5 text-center md:text-left text-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap text-left lg:text-left">
              <div className="w-full lg:w-4/12 px-4">
                <img
                  src={LOGO}
                  alt="logo"
                  className="w-3/4 mx-auto md:ml-5  lg:w-full"
                />
              </div>
              <div className="w-full lg:w-8/12 px-4">
                <div className="flex flex-wrap items-top mb-6">
                  <div className="w-full lg:w-4/12 px-4 ml-auto">
                    <span className="block uppercase text-sm font-semibold mb-2">
                      Useful Links
                    </span>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          className="hover:text-orangetext font-semibold block pb-2 text-sm"
                          href="https://www.creative-tim.com/presentation?ref=njs-profile"
                        >
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          className="hover:text-orangetext font-semibold block pb-2 text-sm"
                          href="https://blog.creative-tim.com?ref=njs-profile"
                        >
                          Blog
                        </a>
                      </li>
                      <li>
                        <a
                          className="hover:text-orangetext font-semibold block pb-2 text-sm"
                          href="https://www.github.com/creativetimofficial?ref=njs-profile"
                        >
                          Github
                        </a>
                      </li>
                      <li>
                        <a
                          className="hover:text-orangetext font-semibold block pb-2 text-sm"
                          href=""
                        >
                          Free Products
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                      Liên hệ
                    </span>
                    <ul className="list-unstyled">
                      <li>
                        <p className="font-semibold block pb-2 text-sm">
                          Địa chỉ:{" "}
                          <a href="#!" className="hover:text-orangetext">
                            Thành phố Hồ Chí minh
                          </a>
                        </p>
                      </li>
                      <li>
                        <p className="font-semibold block pb-2 text-sm">
                          Email:{" "}
                          <a href="#!" className="hover:text-orangetext">
                            2051052048hoang@gmail.com
                          </a>
                        </p>
                      </li>
                      <li>
                        <p className="font-semibold block pb-2 text-sm">
                          SĐT:{" "}
                          <a href="#!" className="hover:text-orangetext">
                            0362400302
                          </a>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />
          <div className="flex flex-wrap items-center md:justify-between justify-center text-gray-800">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-base  font-semibold">
                Copyright ©{" "}
                <span className="font-bold">{new Date().getFullYear()}</span> by{" "}
                <a
                  href="https://github.com/phamtanhoang"
                  className="hover:text-orangetext"
                >
                  Hoang Pham
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
