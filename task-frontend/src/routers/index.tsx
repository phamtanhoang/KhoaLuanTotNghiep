import { ErrorPage } from "@/components/ui";
import {
  AdminLayout,
  AuthEmployerLayout,
  CandidateLayout,
  EmployerLayout,
} from "@/layouts";
import {
  CategoryAdminPage,
  DashboardAdminPage,
  ServiceAdminPage,
  SigninAdminPage,
  TagsAdminPage,
} from "@/pages/Admin";
import {
  AppliedJobsPage,
  EmployerDetailPage,
  EmployersPage,
  HomePage,
  JobDetailPage,
  JobsPage,
  ProfilePage,
  SavedJobsPage,
} from "@/pages/Candidate";
import {
  ApplicationsEmployerPage,
  ChatEmployerPage,
  DashboardPage,
  FindCandidatePage,
  HREmployerPage,
  JobsEmployerPage,
  ProcedureEmployerPage,
  ScheduleEmployerPage,
  SigninEmployerPage,
  SignupEmployerPage,
} from "@/pages/Employer";
import ProfileEmployerPage from "@/pages/Employer/ProfileEmployerPage";
import UpgradeAccountEmployer from "@/pages/Employer/UpgradeAccountEmployer";
import {
  ADMIN_PATHS,
  CANDIDATE_PATHS,
  EMPLOYER_PATHS,
  OTHER_PATHS,
} from "@/utils/constants/pathConstants";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={CANDIDATE_PATHS.default}
          element={<Navigate to={CANDIDATE_PATHS.home} replace />}
        />
        <Route path={CANDIDATE_PATHS.default} element={<CandidateLayout />}>
          <Route path={CANDIDATE_PATHS.home} element={<HomePage />} />
          <Route path={CANDIDATE_PATHS.jobs} element={<JobsPage />} />
          <Route path={CANDIDATE_PATHS.employers} element={<EmployersPage />} />
          <Route
            path={CANDIDATE_PATHS.jobDetails}
            element={<JobDetailPage />}
          />
          <Route
            path={CANDIDATE_PATHS.employerDetails}
            element={<EmployerDetailPage />}
          />
          <Route path={CANDIDATE_PATHS.savedJobs} element={<SavedJobsPage />} />
          <Route
            path={CANDIDATE_PATHS.appliedJobs}
            element={<AppliedJobsPage />}
          />
          <Route path={CANDIDATE_PATHS.myProfile} element={<ProfilePage />} />
        </Route>

        <Route
          path={EMPLOYER_PATHS.default}
          element={<Navigate to={EMPLOYER_PATHS.signin} replace />}
        />
        <Route path={EMPLOYER_PATHS.default} element={<AuthEmployerLayout />}>
          <Route
            path={EMPLOYER_PATHS.signin}
            element={<SigninEmployerPage />}
          />
          <Route
            path={EMPLOYER_PATHS.signup}
            element={<SignupEmployerPage />}
          />
        </Route>
        <Route path={EMPLOYER_PATHS.default} element={<EmployerLayout />}>
          <Route path={EMPLOYER_PATHS.dashboard} element={<DashboardPage />} />
          <Route path={EMPLOYER_PATHS.jobs} element={<JobsEmployerPage />} />
          <Route
            path={EMPLOYER_PATHS.applys}
            element={<ApplicationsEmployerPage />}
          />
          <Route
            path={EMPLOYER_PATHS.findCandidate}
            element={<FindCandidatePage />}
          />
          <Route path={EMPLOYER_PATHS.chat} element={<ChatEmployerPage />} />
          <Route
            path={EMPLOYER_PATHS.schedule}
            element={<ScheduleEmployerPage />}
          />
          <Route
            path={EMPLOYER_PATHS.procedure}
            element={<ProcedureEmployerPage />}
          />
          <Route path={EMPLOYER_PATHS.hr} element={<HREmployerPage />} />
          <Route
            path={EMPLOYER_PATHS.profile}
            element={<ProfileEmployerPage />}
          />
          <Route
            path={EMPLOYER_PATHS.upgrade}
            element={<UpgradeAccountEmployer />}
          />
        </Route>

        <Route
          path={ADMIN_PATHS.default}
          element={<Navigate to={ADMIN_PATHS.signin} replace />}
        />
        <Route path={ADMIN_PATHS.signin} element={<SigninAdminPage />} />
        <Route path={ADMIN_PATHS.default} element={<AdminLayout />}>
          <Route
            path={ADMIN_PATHS.dashboard}
            element={<DashboardAdminPage />}
          />
          <Route
            path={ADMIN_PATHS.categories}
            element={<CategoryAdminPage />}
          /><Route
            path={ADMIN_PATHS.tags}
            element={<TagsAdminPage />}
          />
          <Route
            path={ADMIN_PATHS.services}
            element={<ServiceAdminPage />}
          />
        </Route>

        <Route path={OTHER_PATHS.all} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
