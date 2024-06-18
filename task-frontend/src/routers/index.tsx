import {
  ErrorPage,
  PaymentError,
  PaymentSuccess,
  ProtectedRoute,
  ResetPasswordPage,
} from "@/components/ui";
import { AdminLayout, CandidateLayout, EmployerLayout } from "@/layouts";
import {
  CandidateAdminPage,
  CategoryAdminPage,
  DashboardAdminPage,
  EmployerAdminPage,
  JobAdminPage,
  ServiceAdminPage,
  SigninAdminPage,
  TagsAdminPage,
  TrasactionAdminPage,
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
  SchedulePage,
} from "@/pages/Candidate";
import {
  ApplicationsEmployerPage,
  SavedEmployerPage,
  DashboardPage,
  FindCandidatePage,
  HREmployerPage,
  JobsEmployerPage,
  ProcedureEmployerPage,
  ProfileEmployerPage,
  ScheduleEmployerPage,
  SigninEmployerPage,
  TrasactionEmployerPage,
  UpgradeAccountEmployer,
} from "@/pages/Employer";

import { PathConstants } from "@/utils/constants";
import { AuthHelper } from "@/utils/helpers";
import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

//scroll to top when navigate
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

const Routers = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={PathConstants.CANDIDATE_PATHS.default}
          element={<Navigate to={PathConstants.CANDIDATE_PATHS.home} replace />}
        />
        <Route
          path={PathConstants.EMPLOYER_PATHS.default}
          element={
            <Navigate to={PathConstants.EMPLOYER_PATHS.signin} replace />
          }
        />
        <Route
          path={PathConstants.ADMIN_PATHS.default}
          element={<Navigate to={PathConstants.ADMIN_PATHS.signin} replace />}
        />

        <Route element={<CandidateLayout />}>
          <Route
            path={PathConstants.CANDIDATE_PATHS.home}
            element={<HomePage />}
          />
          <Route
            path={PathConstants.CANDIDATE_PATHS.jobs}
            element={<JobsPage />}
          />
          <Route
            path={PathConstants.CANDIDATE_PATHS.employers}
            element={<EmployersPage />}
          />
          <Route
            path={PathConstants.CANDIDATE_PATHS.jobDetails}
            element={<JobDetailPage />}
          />
          <Route
            path={PathConstants.CANDIDATE_PATHS.employerDetails}
            element={<EmployerDetailPage />}
          />
          <Route
            element={
              <ProtectedRoute
                isAllowed={AuthHelper.isCandidate()}
                redirectTo={PathConstants.CANDIDATE_PATHS.home}
              />
            }
          >
            <Route
              path={PathConstants.CANDIDATE_PATHS.savedJobs}
              element={<SavedJobsPage />}
            />
            <Route
              path={PathConstants.CANDIDATE_PATHS.appliedJobs}
              element={<AppliedJobsPage />}
            />
            <Route
              path={PathConstants.CANDIDATE_PATHS.myProfile}
              element={<ProfilePage />}
            />
            <Route
              path={PathConstants.CANDIDATE_PATHS.schedule}
              element={<SchedulePage />}
            />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAllowed={!AuthHelper.isEmployer() && !AuthHelper.isHR()}
              redirectTo={PathConstants.EMPLOYER_PATHS.dashboard}
            />
          }
        >
          <Route
            path={PathConstants.EMPLOYER_PATHS.signin}
            element={<SigninEmployerPage />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAllowed={AuthHelper.isEmployer() || AuthHelper.isHR()}
              redirectTo={PathConstants.EMPLOYER_PATHS.signin}
            />
          }
        >
          <Route element={<EmployerLayout />}>
            <Route
              path={PathConstants.EMPLOYER_PATHS.dashboard}
              element={<DashboardPage />}
            />
            <Route
              path={PathConstants.EMPLOYER_PATHS.jobs}
              element={<JobsEmployerPage />}
            />
            <Route
              path={PathConstants.EMPLOYER_PATHS.applys}
              element={<ApplicationsEmployerPage />}
            />
            <Route
              path={PathConstants.EMPLOYER_PATHS.findCandidate}
              element={<FindCandidatePage />}
            />
            <Route
              path={PathConstants.EMPLOYER_PATHS.savedEmployer}
              element={<SavedEmployerPage />}
            />
            <Route
              path={PathConstants.EMPLOYER_PATHS.schedule}
              element={<ScheduleEmployerPage />}
            />
            <Route
              path={PathConstants.EMPLOYER_PATHS.procedure}
              element={<ProcedureEmployerPage />}
            />
            <Route
              path={PathConstants.EMPLOYER_PATHS.hr}
              element={<HREmployerPage />}
            />
            <Route
              path={PathConstants.EMPLOYER_PATHS.profile}
              element={<ProfileEmployerPage />}
            />
            <Route
              path={PathConstants.EMPLOYER_PATHS.upgrade}
              element={<UpgradeAccountEmployer />}
            />
            <Route
              path={PathConstants.EMPLOYER_PATHS.checkoutHistory}
              element={<TrasactionEmployerPage />}
            />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAllowed={!AuthHelper.isAdmin()}
              redirectTo={PathConstants.ADMIN_PATHS.dashboard}
            />
          }
        >
          <Route
            path={PathConstants.ADMIN_PATHS.signin}
            element={<SigninAdminPage />}
          />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAllowed={AuthHelper.isAdmin()}
              redirectTo={PathConstants.ADMIN_PATHS.signin}
            />
          }
        >
          <Route element={<AdminLayout />}>
            <Route
              path={PathConstants.ADMIN_PATHS.dashboard}
              element={<DashboardAdminPage />}
            />
            <Route
              path={PathConstants.ADMIN_PATHS.categories}
              element={<CategoryAdminPage />}
            />
            <Route
              path={PathConstants.ADMIN_PATHS.jobs}
              element={<JobAdminPage />}
            />
            <Route
              path={PathConstants.ADMIN_PATHS.tags}
              element={<TagsAdminPage />}
            />
            <Route
              path={PathConstants.ADMIN_PATHS.employers}
              element={<EmployerAdminPage />}
            />
            <Route
              path={PathConstants.ADMIN_PATHS.candidates}
              element={<CandidateAdminPage />}
            />
            <Route
              path={PathConstants.ADMIN_PATHS.services}
              element={<ServiceAdminPage />}
            />
            <Route
              path={PathConstants.ADMIN_PATHS.trasaction}
              element={<TrasactionAdminPage />}
            />
          </Route>
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAllowed={AuthHelper.isEmployer() || AuthHelper.isCandidate()}
              redirectTo={PathConstants.OTHER_PATHS.all}
            />
          }
        >
          <Route
            path={PathConstants.OTHER_PATHS.paymentSuccess}
            element={<PaymentSuccess />}
          />
          <Route
            path={PathConstants.OTHER_PATHS.paymentError}
            element={<PaymentError />}
          />
        </Route>
        <Route
          path={PathConstants.OTHER_PATHS.resetPassword}
          element={<ResetPasswordPage />}
        />
        <Route path={PathConstants.OTHER_PATHS.all} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
