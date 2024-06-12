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
  const [email, setEmail] = useState<any>("");

  const check = () => {
    const emailPattern = new RegExp(
      "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
    );
    if (emailPattern.test(email)) {
      alert("phai email");
    } else {
      alert("kh phai email");
    }
  };
  return (
    <div>
      <div id="pdf">
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button onClick={check}>checkEmail</button>
    </div>
  );
}

export default App;
