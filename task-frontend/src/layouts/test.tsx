// import React, { useEffect, useState } from "react";
// import Stomp from "stompjs";
// import SockJS from "sockjs-client";

// const App: React.FC = () => {
//   const [messages, setMessages] = useState<any>([]);
//   const [stompClient, setStompClient] = useState<any>(null);

//   useEffect(() => {
//     const socket = new SockJS("http://localhost:8080/ws");
//     const client = Stomp.over(socket);

//     client.connect(
//       {},
//       () => {
//         client.subscribe("/topic/messages", (message: any) => {
//           const receivedMessage = JSON.parse(message.body);
//           // setMessages((prevMessages: any) => [
//           //   ...prevMessages,
//           //   receivedMessage,
//           // ]);
//           console.log(receivedMessage);
//         });
//       },
//       (error) => {
//         console.log("Failed to connect: ", error);
//       }
//     );

//     setStompClient(client);

//     return () => {
//       client.disconnect(() => {});
//     };
//   }, []);

//   return <div>App1111</div>;
// };

// export default App;

// import {
//   Document,
//   Page,
//   PDFViewer,
//   PDFDownloadLink,
// } from "@react-pdf/renderer";
// import { View, Text, Image } from "@react-pdf/renderer";
// import NON_USER from "@/assets/images/non-user.jpg";
// const Preview = () => {
//   return (
//     <div style={{ flexGrow: 1 }}>
//       <PDFViewer
//         showToolbar={false}
//         style={{
//           width: "100%",
//           height: "90%",
//         }}
//       >
//         <Template />
//       </PDFViewer>
//       <PDFDownloadLink document={<Template />} fileName="somename.pdf">
//         {({ loading }) => (loading ? "Loading document..." : "Download now!")}
//       </PDFDownloadLink>
//     </div>
//   );
// };

// const Template = () => {
//   return (
//     <Document>
//       <Page size="A4">
//         {/* <LeftSection profile={profile} />
//         <RightSection about={profile.about} /> */}
//         <View>
//           <View>
//             <Image src={NON_USER} />

//             <View
//               style={{
//                 justifyContent: "center",
//               }}
//             >
//               <Text>Phạm Tấn Hoàng</Text>
//             </View>
//             <Text>Full-Stack Developer</Text>
//             <View />
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default Preview;
// MyDocument.tsx
// import { jsPDF } from "jspdf";
import { LoadingContext } from "@/App";
import NON_USER from "@/assets/images/non-user.jpg";
import { candidatesService } from "@/services";
import { DateHelper, SwalHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import {
  MdLink,
  MdOutlineLocationOn,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from "react-icons/md";
import { PiGenderIntersexBold } from "react-icons/pi";

function App() {
  const [candidate, setCandidate] = useState<any>(null);
  const context = useContext(LoadingContext);

  const fetchInfo = () => {
    context.handleOpenLoading();
    candidatesService
      .getDetail_Employer("8adf1cbb-5579-483b-8dad-7f5507a7ac33")
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setCandidate(res?.data?.Data);
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
    fetchInfo();
  }, []);

  const createPdf = () => {
    const element = document.getElementById("pdf");

    var opt = {
      margin: [0.5, 0.8, 0.5, 0.8],
      filename: "cv.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "p" },
    };

    html2pdf().set(opt).from(element).save();
  };
  return (
    <div>
      <div id="pdf">
        {/* <div className="flex justify-center mb-3">
          <img
            src={candidate?.avatar ? candidate?.avatar : NON_USER}
            className="w-24 h-24 rounded-full"
          />
        </div> */}
        <div className="flex gap-3 items-center justify-between">
          <div className="my-auto">
            <h2 className="text-3xl font-semibold">
              {candidate?.firstName} {candidate?.lastName}
            </h2>
            <p className="text-lg text-gray-600 font-medium italic mt-1">
              {candidate?.job}
            </p>
          </div>

          <div className="my-auto text-sm text-gray-700">
            {candidate?.email && (
              <p className="flex gap-1">
                <MdOutlineMailOutline className="my-auto text-base" />
                <a href={`mailto:${candidate?.email}`} className="my-auto">
                  {candidate?.email}
                </a>
              </p>
            )}
            {candidate?.sex && (
              <p className="flex gap-1">
                <PiGenderIntersexBold className="my-auto text-base" />
                <p className="my-auto">
                  {candidate?.sex == "MALE"
                    ? "Nam"
                    : candidate?.sex == "FEMALE"
                    ? "Nữ"
                    : "Khác"}
                </p>
              </p>
            )}
            {candidate?.phoneNumber && (
              <p className="flex gap-1">
                <MdOutlinePhone className="my-auto text-base" />
                <a href={`tel:${candidate?.phoneNumber}`} className="my-auto">
                  {candidate?.phoneNumber}
                </a>
              </p>
            )}
            {candidate?.link && (
              <p className="flex gap-1">
                <MdLink className="my-auto text-base" />
                <a href={candidate?.link} className="my-auto">
                  {candidate?.link}
                </a>
              </p>
            )}
            {candidate?.address && (
              <p className="flex gap-1">
                <MdOutlineLocationOn className="my-auto text-base" />
                <span className="my-auto">{candidate?.address}</span>
              </p>
            )}
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <h3 className="text-xl font-semibold mb-2">Giới thiệu</h3>
          <p className="text-md leading-relaxed text-justify">
            {candidate?.introduction}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Kĩ năng</h3>
          <ul className="text-md">
            {candidate?.extra?.skills?.map((item: any, index: number) => (
              <li key={index} className="text-justify">
                <span className="font-medium">-&nbsp;{item?.skill}</span>
                {item?.description && ": "}
                {item?.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Kinh nghiệm</h3>
          <div>
            {candidate?.extra?.experiences?.map((item: any, index: number) => (
              <div className="mt-2" key={index}>
                <h4 className="text-base font-medium">
                  -&nbsp;{item?.experience} |{" "}
                  {DateHelper.formatDate2(new Date(item?.fromDate!))} -{" "}
                  {item?.toDate == "now"
                    ? "Hiện tại"
                    : DateHelper.formatDate2(new Date(item?.toDate!))}
                </h4>
                <p className="text-md text-gray-600 italic text-justify">
                  &nbsp;&nbsp;&nbsp;{item?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 mb-2">
          <h3 className="text-xl font-semibold">Học vấn</h3>
          <div>
            {candidate?.extra?.educations?.map((item: any, index: number) => (
              <div className="mt-2" key={index}>
                <h4 className="text-base font-medium">
                  -&nbsp;{item?.education} |{" "}
                  {DateHelper.formatDate2(new Date(item?.fromDate!))} -{" "}
                  {item?.toDate == "now"
                    ? "Hiện tại"
                    : DateHelper.formatDate2(new Date(item?.toDate!))}
                </h4>
                <p className="text-md text-gray-600 italic text-justify">
                  &nbsp;&nbsp;&nbsp;{item?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={createPdf}>Download PDF</button>
    </div>
  );
}

export default App;
