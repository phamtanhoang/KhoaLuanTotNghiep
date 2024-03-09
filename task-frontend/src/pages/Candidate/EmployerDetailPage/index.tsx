import Hero from "@/components/ui/Hero";
import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import { GreatEmployers } from "../EmployersPage/components";

const EmployerDetailPage = () => {
  return (
    <>
      <Hero
        title="Chi tiết nhà tuyển dụng"
        linkSearch={CANDIDATE_PATHS.employers}
        titleSearch="Nhà tuyển dụng khác"
      />
      <section className="pb-10 pt-8 bg-gray-100 ">
        <div className="w-full lg:w-[80%] px-5 lg:px-0 mx-auto flex lg:flex-row flex-col lg:gap-5">
          <div className="w-full lg:w-4/12 lg:flex flex-col gap-5">
            <div>
              <div className="bg-orangetext h-[1vh]"></div>
              <div className="bg-white p-5 rounded-sm flex flex-col gap-5">
                <img
                  className="w-[200px] h-[200px] mx-auto rounded-lg"
                  src="https://source.unsplash.com/random/400x400"
                  alt=""
                />

                <h1 className="text-2xl font-bold uppercase leading-tight tracking-wide antialiased hover:underline cursor-pointer text-center">
                  Jane Doe
                </h1>
              </div>
            </div>
            <hr className="lg:hidden border border-gray-300 border-dashed mx-5" />
            <div className="w-full bg-white rounded-sm p-5 flex flex-col gap-3">
              <h3 className="text-gray-800 font-bold text-xl leading-8">
                Mô tả
              </h3>

              <p className="text-sm text-gray-500">
                w-full lg:w-8/12 flex flex-col mx-auto w-full lg:w-8/12 flex
                flex-col mx-auto w-full lg:w-8/12 flex flex-col mx-auto w-full
                lg:w-8/12 flex flex-col mx-auto
              </p>
            </div>
          </div>
          <div className="w-full lg:w-8/12 flex flex-col mx-auto ">
            <div className="bg-white rounded-sm ">
              <img
                className="w-[700px] h-[350px] mx-auto rounded-lg object-fill p-5"
                src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1695030121/DoAnNganh/How_to_Succeed_at_Sandler_Rule_15__The_Best_Presentation_You_Will_Ever_Give_the_Prospect_Will_Never_See_-_Sandler_brqpty.png"
                alt=""
              />
              <hr className="border border-gray-300 border-dashed mx-5" />
              <div className="flex flex-col gap-3 p-5">
                <h3 className="text-gray-800 font-bold text-xl leading-8 ">
                  Thông tin chi tiết
                </h3>
                <div className="text-gray-700 ">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">Jane</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">Doe</div>
                    </div>
                    {/* <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">Female</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">+11 998001001</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2">
                      Beech Creek, PA, Pennsylvania
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Permanant Address
                    </div>
                    <div className="px-4 py-2">
                      Arlington Heights, IL, Illinois
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        jane@example.com
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">Feb 06, 1998</div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GreatEmployers />
    </>
  );
};
export default EmployerDetailPage;
