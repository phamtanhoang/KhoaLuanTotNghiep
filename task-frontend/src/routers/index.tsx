import { CandidateLayout } from "@/layouts";
import {
  EmployersPage,
  HomePage,
  JobDetailPage,
  JobsPage,
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
          element={<Navigate to={CANDIDATE_PATHS.homePage} replace />}
        />
        <Route path={CANDIDATE_PATHS.default} element={<CandidateLayout />}>
          <Route path={CANDIDATE_PATHS.homePage} element={<HomePage />} />
          <Route path={CANDIDATE_PATHS.jobsPage} element={<JobsPage />} />
          <Route
            path={CANDIDATE_PATHS.employersPage}
            element={<EmployersPage />}
          />
          <Route
            path={CANDIDATE_PATHS.jobDetails}
            element={<JobDetailPage />}
          />
        </Route>
        <Route path={OTHER_PATHS.all} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
