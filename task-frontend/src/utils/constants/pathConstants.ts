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
  vips: "/employer/vips",
  vipHistory: "/employer/vip-history",
  schedule: "/employer/schedule",
  chat: "/employer/chat",
  procedure: "/employer/procedure",
};
export { CANDIDATE_PATHS, OTHER_PATHS, EMPLOYER_PATHS };
