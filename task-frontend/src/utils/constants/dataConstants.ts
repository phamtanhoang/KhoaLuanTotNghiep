const SEX_DATA = [
  { id: "1", name: "Nam" },
  { id: "2", name: "Nữ" },
  { id: "0", name: "Khác" },
];
const APPLY_STATE_DATA = [
  { id: "", name: "Tất cả", color: "" },
  { id: "PENDING", name: "Chờ xét duyệt", color: "#FFFF00" },
  { id: "DISAPPROVE", name: "Hồ sơ chưa phù hợp", color: "#FF0000" },
  { id: "APPROVE", name: "Hồ sơ phù hợp", color: "#008000" },
  { id: "FAILED", name: "Rớt phỏng vấn", color: "#FF0000" },
  { id: "SUCCESS", name: "Đậu phỏng vấn", color: "#008000" },
];
export { SEX_DATA, APPLY_STATE_DATA };
