import { AuthEmployerLayout, CandidateLayout } from "@/layouts";
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
  DashboardPage,
  SigninEmployerPage,
  SignupEmployerPage,
} from "@/pages/Employer";
import ErrorPage from "@/pages/ErrorPage";
import {
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
        <Route path={EMPLOYER_PATHS.dashboard} element={<DashboardPage />} />
        <Route path={OTHER_PATHS.all} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
