import { HTMLReactParserOptions } from "html-react-parser";

const DescriptionJob =
  "<h3><strong>Mô tả công việc:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Địa điểm làm việc:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Thời gian làm việc:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Số lượng tuyển:</strong></h3><blockquote><p>&nbsp;</p></blockquote>";
const ApplicationHelper =
  "<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là [Tên của bạn], và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>";

const OptionParses: HTMLReactParserOptions = {
  replace: (domNode: any) => {
    switch (domNode.name) {
      case "ul":
        domNode.attribs.className =
          (domNode.attribs.className || "") + " list-disc list-inside";
        return domNode;
      case "ol":
        domNode.attribs.className =
          (domNode.attribs.className || "") + " list-decimal list-inside";
        return domNode;
      case "h3":
        domNode.attribs.className =
          (domNode.attribs.className || "") + " mb-1.5";
        return domNode;
      case "strong":
        domNode.attribs.className =
          (domNode.attribs.className || "") + " font-medium";
        return domNode;
      case "blockquote":
        domNode.attribs.className =
          (domNode.attribs.className || "") + " ml-2 mb-2";
        return domNode;
      default:
        return null;
    }
  },
};

const SalaryText = (from?: string, to?: string) => {
  if (!from && !to) return "Thỏa thuận";
  if (from && !to) return `Tối thiểu ${from}`;
  if (!from && to) return `Tối đa ${to}`;
  return `Từ ${from} đến ${to}`;
};

export const TextHelper = {
  DescriptionJob,
  ApplicationHelper,
  OptionParses,
  SalaryText,
};
