const VERSION = "/v1";
const URL = "http://localhost:8080";
const BASE_URL = URL + "/api" + VERSION;

const AuthAPI = {
  signin: "/auths/login",
  signupCandidate: "/auths/registerCandidate",
  signupEmployer: "/auths/registerEmployer",
  logout: "/auths/logout",
  changePassword: "/auths/changePassword",
  refreshToken: "/auths/refresh",
};

const UserAPI = {
  getByEmail: (email: string) => {
    return `/uses/email=${email}`;
  },
};

const CandidateAPI = {
  profile: "/candidates/profile",
  getList: (
    keyword?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/candidates/getCandidates-admin?keyword=${keyword}&status=${status}&page=${currentPage}&size=${itemPerPage}`;
  },

  candidateById: (id?: string) => {
    return `/candidates/${id}`;
  },

  changeImage: "/candidates/updateAvatar",
  updateProfile: "/candidates/updateProfile",

  extraProfile: "/candidates/extraProfile",

  getSkills: "/candidates/getSkills",
  getExperiences: "/candidates/getExperiences",
  getEducations: "/candidates/getEducations",

  saveSkills: "candidates/saveSkills",
  saveExperiences: "/candidates/saveExperiences",
  saveEducations: "/candidates/saveEducations",

  updateIsFindJob: "/candidates/updateIsFindJob",

  uploadCV: "/candidates/uploadCV",

  clearCV: "/candidates/deleteCV",
};

const EmployerAPI = {
  profile: "/employers/profile",

  getList: (
    keyword?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/employers/getEmployers-admin?keyword=${keyword}&status=${status}&page=${currentPage}&size=${itemPerPage}`;
  },
  getListPublic: (
    keyword?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/employers?keyword=${keyword}&page=${currentPage}&size=${itemPerPage}`;
  },
  getTop: (
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/employers/topEmployer?page=${currentPage}&size=${itemPerPage}`;
  },

  employerById: (id?: string) => {
    return `/employers/${id}`;
  },

  changeBackgroundImage: "/employers/updateBackgroundImage",
  changeImage: "/employers/updateImage",
  updateProfile: "/employers/updateProfile",

  employerById_admin: (id?: string) => {
    return `/employers/getEmployer-admin/${id}`;
  },
};

const TagAPI = {
  tags: "/tags",
  createTag: "/tags/create",

  getList: (name?: string, currentPage?: number, itemPerPage?: number) => {
    return `/tags?name=${name}&page=${currentPage}&size=${itemPerPage}`;
  },

  tagById: (id: string) => {
    return `/tags/${id}`;
  },

  getList_Dropdown: "/tags/getTags_Dropdown",
};

const CategoryAPI = {
  categories: "/categories",
  getTopCategories: (currentPage?: number, itemPerPage?: number) =>
    `categories/topCategories?page=${currentPage}&size=${itemPerPage}`,
  createCategory: "/categories/create",

  getList: (name?: string, currentPage?: number, itemPerPage?: number) => {
    return `/categories?name=${name}&page=${currentPage}&size=${itemPerPage}`;
  },

  categoryById: (id: string) => {
    return `/categories/${id}`;
  },

  getList_Dropdown: "/categories/getCategories_Dropdown",
};

const HumanResourceAPI = {
  create: "/hr",
  getList: (
    keyword?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/hr/getHumanResource-employer?keyword=${keyword}&status=${status}&page=${currentPage}&size=${itemPerPage}`;
  },
  HRById: (id: string) => {
    return `/hr/${id}`;
  },

  updateAvatar: "/hr/updateAvatar",
  updateProfile: "/hr/updateProfile",

  profile: "/hr/profile",

  getList_Dropdown: "/hr/getHumanResources_Dropdown",
};

const ProcedureAPI = {
  getList: (name?: string, currentPage?: number, itemPerPage?: number) => {
    return `/processes?name=${name}&status=${status}&page=${currentPage}&size=${itemPerPage}`;
  },
  procedureById: (id: string) => {
    return `/processes/${id}`;
  },
  create: "/processes",
  getList_Dropdown: "/processes/getProcesses_Dropdown",
};

const JobAPI = {
  saveJobs: (id: string) => {
    return `/jobs/save-job/${id}`;
  },
  unSaveJobs: (id: string) => {
    return `/jobs/unsave-job/${id}`;
  },
  getSavedJobs: (
    keyword?: string,
    location?: string,
    page?: number,
    size?: number
  ) => {
    return `/jobs/jobsSaved?keyword=${keyword}&location=${location}&page=${page}&size=${size}`;
  },
  getList_Employer: (
    keyword?: string,
    category?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/jobs/getJobs-employer?keyword=${keyword}&categoryId=${category}&status=${status}&page=${currentPage}&size=${itemPerPage}`;
  },
  getList_Admin: (
    keyword?: string,
    category?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/jobs/getJobs-admin?keyword=${keyword}&categoryId=${category}&status=${status}&page=${currentPage}&size=${itemPerPage}`;
  },

  createJob: "/jobs/create",

  jobById: (id: string) => {
    return `/jobs/${id}`;
  },

  getDetail_Public: (id: string) => {
    return `/jobs/${id}`;
  },
  getDetail_Employer: (id: string) => {
    return `/jobs/getDetail-employer/${id}`;
  },

  getDetail_Admin: (id: string) => {
    return `/jobs/getDetail-admin/${id}`;
  },

  getList_Public: (
    keyword?: string,
    location?: string,
    category?: string,
    tag?: string,
    dateNumber?: string,
    experience?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/jobs?keyword=${keyword}&location=${location}&experience=${experience}&dateNumber=${dateNumber}&categoryId=${category}&tagId=${tag}&page=${currentPage}&size=${itemPerPage}`;
  },

  updateStatus_Admin: (id: string) => {
    return `/jobs/updateStatus-admin/${id}`;
  },
  updateStatus_Employer: (id: string) => {
    return `/jobs/updateStatus-employer/${id}`;
  },
  getJobsByEmployerID: (
    id: string,
    name?: string,
    location?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/jobs/getJobs/${id}?name=${name}&location=${location}&page=${currentPage}&size=${itemPerPage}`;
  },
};

const ApplicationAPI = {
  applyJob_File: (id: string) => {
    return `/applications/applyWithCV/${id}`;
  },

  applyJob_Link: (id: string) => {
    return `/applications/applyWithLink/${id}`;
  },

  getApplication_Employer: (
    name?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/applications/getApplications-employer?title=${name}&status=${status}&page=${currentPage}&size=${itemPerPage}`;
  },

  getApplicationDetail_Employer: (id: string) => {
    return `/applications/getApplication-employer/${id}`;
  },

  getApplicationDetail_Candidate: (id: string) => {
    return `/applications/getApplication-candidate/${id}`;
  },

  getApplication_Candidate: (
    name?: string,
    location?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/applications/getApplications-candidate?title=${name}&location=${location}&status=${status}&page=${currentPage}&size=${itemPerPage}`;
  },

  getMessagesApplication: (id?: string) => {
    return `/chats/${id}`;
  },
  sendMessagesApplication: (id?: string) => {
    return `/chats/${id}/sendMessage`;
  },
  updateStatus: (id?: string) => {
    return `/applications/updateStatus/${id}`;
  },

  detailStepSchedule: (id?: string) => {
    return `/applications/detailStepSchedule/${id}`;
  },
  createStepSchedule: (id?: string) => {
    return `/applications/createStepSchedule/${id}`;
  },
  updateStepSchedule: (id?: string) => {
    return `/applications/updateStepSchedule/${id}`;
  },
  deleteStepSchedule: (id?: string) => {
    return `/applications/deleteStepSchedule/${id}`;
  },
};
const ScheduleAPI = {
  getDataSchedule: (id?: string, fromDate?: string, toDate?: string) => {
    return `/schedule?userId=${id}&fromDate=${fromDate}&toDate=${toDate}`;
  },
};
const VipAPI = {
  base: "/vips",
  vipById: (id: string) => {
    return `/vips/${id}`;
  },
  getById_Employer: (id: string) => {
    return `/vips/getVip-employer/${id}`;
  },
  getListByAdmin: (
    name?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/vips/getVips-admin?name=${name}&status=${status}&page=${currentPage}&size=${itemPerPage}`;
  },
  getListByEmployer: () => {
    return `/vips/getVips-employer`;
  },
  pay: (id: string, bank: string) => {
    return `/vips/pay?vipId=${id}&&bank=${bank}`;
  },

  getTrasactions_admin: (
    name?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/vips/getTrasactions-admin?name=${name}&page=${currentPage}&size=${itemPerPage}`;
  },
  getTrasactionDetail_admin: (id: string) => {
    return `/vips/getTrasactionDetail-Admin/${id}`;
  },
  getTrasactions_employer: (
    name?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/vips/getTrasactions-employer?name=${name}&page=${currentPage}&size=${itemPerPage}`;
  },
  getTrasactionDetail_employer: (id: string) => {
    return `/vips/getTrasactionDetail-Employer/${id}`;
  },
};
export {
  URL,
  BASE_URL,
  VERSION,
  AuthAPI,
  TagAPI,
  CategoryAPI,
  UserAPI,
  CandidateAPI,
  EmployerAPI,
  HumanResourceAPI,
  ProcedureAPI,
  JobAPI,
  ApplicationAPI,
  ScheduleAPI,
  VipAPI,
};
