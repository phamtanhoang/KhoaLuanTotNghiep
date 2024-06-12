const OTHER_PATHS = {
  all: "*",
  paymentSuccess: "/payment-success",
  paymentError: "/payment-error",
};
const CANDIDATE_PATHS = {
  default: "/",
  home: "/home",
  jobs: "/jobs",
  employers: "/employers",
  jobDetails: "/jobs/:id",
  employerDetails: "/employers/:id",
  employerDetails2: "/employers",
  myProfile: "/profile",
  savedJobs: "/saved-jobs",
  appliedJobs: "/applied-jobs",
  schedule: "/schedule",
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
  savedEmployer: "/employer/saved-employer",
  procedure: "/employer/procedure",
  checkoutHistory: "/employer/trasaction",
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
  trasaction: "/admin/trasaction",
  services: "/admin/services",
  setting: "/admin/setting",
};
export const PathConstants = {
  CANDIDATE_PATHS,
  OTHER_PATHS,
  EMPLOYER_PATHS,
  ADMIN_PATHS,
};
