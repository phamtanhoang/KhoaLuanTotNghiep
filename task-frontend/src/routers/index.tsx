import { CandidateLayout } from "@/layouts";
import {
  EmployersPage,
  HomePage,
  JobsPage,
  SchedulePage,
} from "@/pages/Candidate";
import ErrorPage from "@/pages/ErrorPage";
import {
  PATH_DEFAULT,
  PATH_EMPLOYERS,
  PATH_HOME,
  PATH_JOBS,
} from "@/utils/constants/pathConstants";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PATH_DEFAULT}
          element={<Navigate to={PATH_HOME} replace />}
        />
        <Route path={PATH_DEFAULT} element={<CandidateLayout />}>
          <Route path={PATH_HOME} element={<HomePage />} />
          <Route path={PATH_JOBS} element={<JobsPage />} />
          <Route path={PATH_EMPLOYERS} element={<EmployersPage />} />
        </Route>
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
