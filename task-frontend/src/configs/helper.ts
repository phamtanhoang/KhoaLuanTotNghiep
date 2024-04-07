const AuthAPI = {
  signin: "/auths/login",
  signup: "/auths/register",
  logout: "/auths/logout",
  changePassword: "/auths/change-password",
  refreshToken: "/auths/refresh",
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
export { AuthAPI, TagAPI, CategoryAPI };
