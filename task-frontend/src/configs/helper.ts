const AuthAPI = {
  signin: "/auths/login",
  signupCandidate: "/auths/registerCandidate",
  signupEmployer: "/auths/registerEmployer",
  logout: "/auths/logout",
  changePassword: "/auths/change-password",
  refreshToken: "/auths/refresh",
};

const UserAPI = {
  getByEmail: (email: string) => {
    return `/uses/email=${email}`;
  },
};

const CandidateAPI = {
  profile: "/candidates/profile",
};

const EmployerAPI = {
  profile: "/employers/profile",
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
export { AuthAPI, TagAPI, CategoryAPI, UserAPI, CandidateAPI, EmployerAPI };
