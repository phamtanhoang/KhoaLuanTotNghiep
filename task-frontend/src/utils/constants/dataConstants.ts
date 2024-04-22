const SEX_DATA = [
  { id: "MALE", name: "Nam" },
  { id: "FEMALE", name: "Nữ" },
  { id: "OTHER", name: "Khác" },
];
const ROLE_DATA = {
  ADMIN: "ADMIN",
  CANDIDATE: "CANDIDATE",
  HR: "HR",
  EMPLOYER: "EMPLOYER",
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
  { id: "INACTIVE", name: "Không hoạt động", color: "#FF0000" },
];

const EMPLOYER_STATE_DROPDOWN = [
  { id: "", name: "Toàn bộ" },
  { id: "ACTIVE", name: "Hoạt động" },
  { id: "INACTIVE", name: "Không hoạt động" },
  { id: "PENDING", name: "Chờ duyệt" },
];
const CANDIDATE_STATE_DROPDOWN = [
  { id: "", name: "Toàn bộ" },
  { id: "ACTIVE", name: "Hoạt động" },
  { id: "INACTIVE", name: "Không hoạt động" },
];

const USER_STATUS_DATA = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING",
  DELETED: "DELETED",
};

export const DataConstants = {
  SEX_DATA,
  APPLY_STATE_DATA,
  JOB_STATE_DATA,
  HR_STATE_DATA,
  ROLE_DATA,
  USER_STATUS_DATA,
  EMPLOYER_STATE_DROPDOWN,
  CANDIDATE_STATE_DROPDOWN,
};
