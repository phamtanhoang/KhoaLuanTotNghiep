import { HTMLReactParserOptions } from "html-react-parser";

const DescriptionJob =
  "<h3><strong>Mô tả công việc:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Địa điểm làm việc:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Thời gian làm việc:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Số lượng tuyển:</strong></h3><blockquote><p>&nbsp;</p></blockquote>";
const ApplicationHelper = "<p></p>";

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
  if (from && !to) return `Tối thiểu ${to}`;
  if (!from && to) return `Tối đa ${to}`;
  return `Từ ${from} đến ${to}`;
};

export const TextHelper = {
  DescriptionJob,
  ApplicationHelper,
  OptionParses,
  SalaryText,
};
