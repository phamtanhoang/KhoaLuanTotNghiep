const OTHER_PATHS = {
  all: "*",
};
const CANDIDATE_PATHS = {
  default: "/",
  home: "/home",
  jobs: "/jobs",
  employers: "/employers",
  jobDetails: "/jobs/:id",
  employerDetails: "/employers/:id",
  myProfile: "/profile",
  savedJobs: "/saved-jobs",
  appliedJobs: "/applied-jobs",
};
const EMPLOYER_PATHS = {
  default: "/employer",
  signin: "/employer/signin",
  signup: "/employer/signup",
  dashboard: "/employer/dashboard",
  jobs: "/employer/jobs",
  applys: "/employer/applications",
  findCandidate: "/employer/find-candidates",
  hr: "/employer/human-resource",
  setting: "/employer/setting",
  profile: "/employer/profile",
  upgrade: "/employer/upgrade",
  schedule: "/employer/schedule",
  chat: "/employer/chat",
  procedure: "/employer/procedure",
};

const ADMIN_PATHS = {
  default: "/admin",
  signin: "/admin/signin",
  dashboard: "/admin/dashboard",
  categories: "/admin/categories",
  jobs: "/admin/jobs",
  tags: "/admin/tags",
  employers: "/admin/employers",
  candidates: "/admin/candidates",
  services: "/admin/services",
  setting: "/admin/setting",
};
export const PathConstants = {
  CANDIDATE_PATHS,
  OTHER_PATHS,
  EMPLOYER_PATHS,
  ADMIN_PATHS,
};
