import { CandidateLayout } from "@/layouts";
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
import ErrorPage from "@/pages/ErrorPage";
import { CANDIDATE_PATHS, OTHER_PATHS } from "@/utils/constants/pathConstants";
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
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
