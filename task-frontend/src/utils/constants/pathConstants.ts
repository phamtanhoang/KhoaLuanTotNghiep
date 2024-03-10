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
  signin: "/employer/signin",
  signup: "/employer/signup",
  dashboard: "/employer/dashboard",
  jobs: "/employer/jobs",
  applys: "/employer/applys",
  findCandidate: "/employer/find-candidates",
  setting: "/employer/setting",
  profile: "/employer/profile",
  vips: "/employer/vips",
};
export { CANDIDATE_PATHS, OTHER_PATHS, EMPLOYER_PATHS };
