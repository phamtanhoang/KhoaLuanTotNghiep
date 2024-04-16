import HERO from "@/assets/images/hero.png";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdWork } from "react-icons/md";

const Hero = () => {
  return (
    <section className=" bg-orangebackground py-5">
      <div className="md:pl-28 mx-auto flex flex-wrap md:flex-row flex-col-reverse items-center">
        <div className="p-5 md:p-0 flex flex-col w-full md:w-[55%] justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-loose w-full mb-4">
            Chào mừng bạn đến với Joobs!
          </p>
          <h1
            className="leading-tight text-3xl sm:text-4xl md:text-5xl
        font-bold text-gray-900"
          >
            Tìm kiếm công việc{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 from-20% via-orange-500 via-30% to-orange-400">
              trong mơ
            </span>{" "}
            của bạn.
          </h1>
          <p className="mt-8 text-gray-600 text-lg font-normal">
            Tại đây, bạn có thể tìm thấy những tin tuyển dụng việc làm với mức
            lương vô cùng hấp dẫn. Là nơi bạn có thể tìm những công việc việc có
            môi trường chuyên nghiệp, năng động, trẻ trung.
          </p>

          <div className="bg-white  p-1  mt-8 w-full rounded-md lg:rounded-full lg:flex">
            <div className="rounded-t-md flex gap-1 w-full lg:w-[55%] bg-white text-left py-2 px-3 pl-5 lg:rounded-l-full mb-2 lg:mb-0  lg:border-r-2 border-orange-300">
              <MdWork className="text-orangetext h-full text-2xl" />
              <input
                className="w-full bg-transparent ml-2 text-gray-800 focus:outline-none"
                type="text"
                placeholder="Nhập tên công việc..."
              />
            </div>
            <div className="flex gap-1 w-full lg:w-[45%] bg-white text-left py-2 px-3 pl-5 mb-3 lg:mb-0">
              <FaLocationCrosshairs className="text-orangetext h-full text-2xl" />
              <select className="bg-transparent ml-2 text-gray-800 focus:outline-none w-full">
                <option className="w-full" value="">
                  Afganistan
                </option>
                <option className="w-full" value="">
                  Albaniya
                </option>
                <option className="w-full" value="">
                  Bangladesh
                </option>
                <option className="w-full" value="">
                  Belgium
                </option>
                <option className="w-full" value="">
                  Canada
                </option>
              </select>
            </div>

            <button
              className="w-full  py-3  text-white rounded lg:rounded-r-full flex  justify-center items-center min-w-max lg:w-max px-4 lg:px-6 h-12 outline-none relative overflow-hidden border duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
            >
              <span className="flex relative z-[1] font-medium">Tìm kiếm</span>
            </button>
          </div>
        </div>
        <div className="w-full md:w-[45%] text-center flex justify-end">
          <img className="w-full md:w-4/5" src={HERO} />
        </div>
      </div>
    </section>
    // <section className="min-h-[90vh] flex py-6 lg:flex-row flex-col-reverse items-center bg-orangebackground">
    //   <div className="flex-auto lg:w-2/3 relative">
    //     <div className="hidden lg:absolute top-0 -right-48 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    //     <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
    //       <span className="absolute right-24 -bottom-40 w-48 h-36 rounded-full bg-orange-200 blur-xl opacity-40"></span>
    //     </div>
    //     <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-orange-300 to-orange-200 absolute -top-96 lg:-top-44 left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
    //     <span className="w-6/12 lg:w-5/12 aspect-square bg-gradient-to-tr from-orange-200 to-orange-300 absolute -top-10 lg:-top-44 right-0 lg:-right-44 rounded-full skew-y-12 blur-2xl opacity-30 skew-x-12 rotate-90"></span>
    //     <div className="w-[90%] mx-auto lg:w-10/12 m-0 lg:mx-32">
    //       <h1
    //         className="leading-tight text-3xl sm:text-4xl md:text-5xl
    //         font-bold text-gray-900"
    //       >
    //         Tìm kiếm những công việc{" "}
    //         <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 from-20% via-orange-500 via-30% to-orange-400">
    //           trong mơ
    //         </span>{" "}
    //         của bạn.
    //       </h1>
    //       <p className="mt-8 text-gray-600 text-lg font-normal">
    //         Tại đây, bạn có thể tìm thấy những tin tuyển dụng việc làm với mức
    //         lương vô cùng hấp dẫn. Là nơi bạn có thể tìm những công việc việc có
    //         môi trường chuyên nghiệp, năng động, trẻ trung.
    //       </p>
    //       <div className="mt-10  w-full flex max-w-md mx-auto lg:mx-0">
    //         <div
    //           className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-gray-600 shadow-lg shadow-gray-200/20
    //                         border border-gray-200 bg-white rounded-full ease-linear  focus-within:border-orange-300"
    //         >
    //           <span className="min-w-max pr-2 border-r border-gray-200 text-2xl">
    //             <CiSearch />
    //           </span>
    //           <input
    //             type="text"
    //             name=""
    //             placeholder="Nhập tên công việc..."
    //             className="w-full py-3 outline-none bg-transparent"
    //           />
    //           <button
    //             className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-4 lg:px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
    //                             after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
    //           >
    //             <span className="flex relative z-[1] font-medium">
    //               Tìm kiếm
    //             </span>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex-auto lg:w-1/3 flex items-center justify-center">
    //     <img
    //       src={HERO}
    //       alt="hero-logo"
    //       className="w-5/6 ml-auto lg:w-full h-full object-cover"
    //     />
    //   </div>
    // </section>
  );
};
export default Hero;
