const TYPE_EXTRA_DATA = {
  EXP: "EXP",
  EDU: "EDU",
  SKILL: "SKILL",
};

const SEX_DATA_DROPDOWN = [
  { id: "MALE", name: "Nam" },
  { id: "FEMALE", name: "Nữ" },
  { id: "OTHER", name: "Khác" },
];

const EXPERIENCE_DROPDOWN = [
  { value: "", label: "Tất cả kinh nghiệm" },
  { value: "Chưa có kinh nghiệm", label: "Chưa có kinh nghiệm" },
  { value: "Dưới 1 năm", label: "Dưới 1 năm" },
  { value: "1 - 3 năm", label: "1 - 3 năm" },
  { value: "3 - 5 năm", label: "3 - 5 năm" },
  { value: "5 - 10 năm", label: "5 - 10 năm" },
  { value: "Trên 10 năm", label: "Trên 10 năm" },
];
const DATESUBMIT_DROPDOWN = [
  { value: "", label: "Tất cả thời gian" },
  { value: "1", label: "24 giờ trước" },
  { value: "3", label: "3 ngày trước" },
  { value: "5", label: "5 ngày trước" },
  { value: "7", label: "7 ngày trước" },
  { value: "30", label: "30 ngày trước" },
];
const TYPEJOB_DROPDOWN = [
  { value: "", label: "Tất cả loại tin" },
  { value: true, label: "Tin đăng VIP" },
  { value: false, label: "Tin đăng thường" },
];

// yellow: #FFC300
// gray: #C0C0C0
// green: #169C46
// blue: #0000FF
// red:"#FF0000"

const APPLY_STATE_DROPDOWN = [
  { id: "", name: "Toàn bộ", color: "" },
  { id: "PENDING", name: "Chờ xét duyệt", color: "#FFC300" },
  { id: "PROCESSING", name: "Trong quá trình", color: "#0000FF" },
  { id: "REJECTED", name: "Thất bại", color: "#FF0000" },
  { id: "APPROVED", name: "Thành công", color: "#169C46" },
];

const JOB_STATE_DROPDOWN = [
  { id: "", name: "Toàn bộ", color: "" },
  { id: "PENDING", name: "Chờ duyệt", color: "#FFC300" },
  { id: "INACTIVE", name: "Không hoạt động", color: "#C0C0C0" },
  { id: "ACTIVE", name: "Hoạt động", color: "#0000FF" },
  { id: "PAUSED", name: "Tạm dừng", color: "#FF0000" },
];

const HR_STATE_DROPDOWN = [
  { id: "", name: "Toàn bộ", color: "" },
  { id: "ACTIVE", name: "Hoạt động", color: "#0000FF" },
  { id: "INACTIVE", name: "Không hoạt động", color: "#C0C0C0" },
];

const EMPLOYER_STATE_DROPDOWN = [
  { id: "", name: "Toàn bộ", color: "" },
  { id: "ACTIVE", name: "Hoạt động", color: "#0000FF" },
  { id: "INACTIVE", name: "Không hoạt động", color: "#C0C0C0" },
  { id: "PENDING", name: "Chờ duyệt", color: "#FFC300" },
];

const CANDIDATE_STATE_DROPDOWN = [
  { id: "", name: "Toàn bộ", color: "" },
  { id: "ACTIVE", name: "Hoạt động", color: "#0000FF" },
  { id: "INACTIVE", name: "Không hoạt động", color: "#FF0000" },
];
const SERVICE_DROPDOWN = [
  { id: "", name: "Toàn bộ", color: "" },
  { id: "ACTIVE", name: "Hoạt động", color: "#0000FF" },
  { id: "INACTIVE", name: "Không hoạt động", color: "#FF0000" },
];

const ROLE_DATA = {
  ADMIN: "ADMIN",
  CANDIDATE: "CANDIDATE",
  HR: "HR",
  EMPLOYER: "EMPLOYER",
};

const STATUS_DATA = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING",
  DELETED: "DELETED",
  PAUSED: "PAUSED",
  PROCESSING: "PROCESSING",
  REJECTED: "REJECTED",
  APPROVED: "APPROVED",
  PASS: "PASS",
  FAIL: "FAIL",
};

export const DataConstants = {
  SEX_DATA_DROPDOWN,
  APPLY_STATE_DROPDOWN,
  JOB_STATE_DROPDOWN,
  HR_STATE_DROPDOWN,
  ROLE_DATA,
  STATUS_DATA,
  EMPLOYER_STATE_DROPDOWN,
  CANDIDATE_STATE_DROPDOWN,
  EXPERIENCE_DROPDOWN,
  DATESUBMIT_DROPDOWN,
  TYPEJOB_DROPDOWN,
  TYPE_EXTRA_DATA,
  SERVICE_DROPDOWN,
};
