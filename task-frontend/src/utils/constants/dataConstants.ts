const SEX_DATA = [
  { id: "MALE", name: "Nam" },
  { id: "FEMALE", name: "Nữ" },
  { id: "OTHER", name: "Khác" },
];
const ROLE_DATA = {
  ADMIN: 'ADMIN',
  CANDIDATE: 'CANDIDATE',
  HUMANRESOURCE: 'HUMANRESOURCE',
  EMPLOYER: 'EMPLOYER'
};

const APPLY_STATE_DATA = [
  { id: "PENDING", name: "Chờ xét duyệt", color: "#FFC300" },
  { id: "DISAPPROVE", name: "Hồ sơ chưa phù hợp", color: "#C0C0C0" },
  { id: "APPROVE", name: "Hồ sơ phù hợp", color: "#0000FF" },
  { id: "FAILED", name: "Rớt phỏng vấn", color: "#FF0000" },
  { id: "SUCCESS", name: "Đậu phỏng vấn", color: "#169C46" },
];
const JOB_STATE_DATA = [
  { id: "PENDING", name: "Chờ duyệt", color: "#FFC300" },
  { id: "REJECT", name: "Từ chối", color: "#FF0000" },
  { id: "ACTIVE", name: "Phê duyệt", color: "#169C46" },
  { id: "PAUSE", name: "Tạm ngừng", color: "#0000FF" },
];
const HR_STATE_DATA = [
  { id: "ACTIVE", name: "Hoạt động", color: "#0000FF" },
  { id: "PAUSE", name: "Tạm ngừng", color: "#FF0000" },
];

export const DataConstants = {
  SEX_DATA,
  APPLY_STATE_DATA,
  JOB_STATE_DATA,
  HR_STATE_DATA,
  ROLE_DATA
};
