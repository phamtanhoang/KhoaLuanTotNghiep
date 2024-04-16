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

  employerById: (id?: string) => {
    return `/employers/${id}`;
  },

  changeBackgroundImage: "/employers/updateBackgroundImage",
  changeImage: "/employers/updateImage",
  updateProfile: "/employers/updateProfile",
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
};
export {
  AuthAPI,
  TagAPI,
  CategoryAPI,
  UserAPI,
  CandidateAPI,
  EmployerAPI,
  HumanResourceAPI,
};
