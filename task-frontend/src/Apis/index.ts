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
    isVip?: string,
    currentPage?: number,
    itemPerPage?: number
  ) => {
    return `/jobs?keyword=${keyword}&location=${location}&experience=${experience}&dateNumber=${dateNumber}&categoryId=${category}&isVip=${isVip}&tag=${tag}&page=${currentPage}&size=${itemPerPage}`;
  },

  updateStatus_Admin: (id: string) => {
    return `/jobs/updateStatus-admin/${id}`;
  },
  updateStatus_Employer: (id: string) => {
    return `/jobs/updateStatus-employer/${id}`;
  },
};

const ApplicationAPI = {
  applyJob_File: (id: string) => {
    return `/applications/applyWithCV/${id}`;
  },

  applyJob_Link: (id: string) => {
    return `/applications/applyWithLink/${id}`;
  },
};
export {
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
};
