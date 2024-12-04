import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import LandingPage from '../pages/landing-page/LandingPage';
import NotFound from '../pages/notFound-page/NotFound';
import Loading from '../components/loading-spinner/Loading';
import LoadingLandingPage from '../components/loading-landing-page/LoadingLandingPage';
import ProtectedRoute from './ProtectedRoute';
import RequireAuth from './RequireAuth';

// Lazy-loaded Components
const AdminDashboard = lazy(() => import('../pages/admin/admin-dashboard-page/AdminDashboard'));
const Analytics = lazy(() => import('../pages/admin/analytics-page/Analytics'));
const Login = lazy(() => import('../pages/login-page/Login'));
const EmployeeHomePage = lazy(() => import('../pages/employee/employee-home-page/EmployeesHomePage'));
const DtrPage = lazy(() => import('../pages/employee/dtr-page/DtrPage'));
const Maps = lazy(() => import('../pages/common-pages/Map/Maps'));
const PaySlipPage = lazy(() => import("../pages/employee/pay-slip-page/PaySlipPage"));
const AttendancePage = lazy(() => import('../pages/employee/attendance-page/AttendancePage'));
const UserProfilePage = lazy(() => import('../pages/common-pages/user-profile-page/UserProfilePage'));
const Services = lazy(() => import('../pages/common-pages/services-page/Services'));
const Products = lazy(() => import('../pages/common-pages/products-page/Products'));
const MarketingDashboard = lazy(() => import('../pages/marketing/dashboard/MarketingDashboard'));
const MarketingOutlet = lazy(() => import('../pages/marketing/outlet/MarketingOutlet'));
const Quotations = lazy(() => import('../pages/marketing/quotations/Quotations'));
const PdfViewPage = lazy(() => import('../pages/pdf-viewer-page/PdfViewPage'));
const MessageRequest = lazy(() => import('../pages/message-request-page/MessageRequest'));
const UnderMaintenance = lazy(() => import('../pages/under-maintenace-page/UnderMaintenace'));
const CompanyClient = lazy(() => import('../pages/client-page/Client'));
const ForgotPassword = lazy(() => import('../pages/forgot-password/ForgotPassword'));
const DtrRequest = lazy(() => import('../pages/dtr-request-page/DtrRequest'));
const DtrListByUser = lazy(() => import('../pages/dtr-list-by-user-page/DtrListByUser'));
const MyAnnouncement = lazy(() => import('../pages/common-pages/announcement-page/MyAnnouncement'));
const AnnouncementPage = lazy(() => import('../pages/annoucement/Announcement'));
const CompanyProfile = lazy(() => import('../pages/company-profile-page/Profile'));
const MainContent = lazy(() => import('../pages/landing-main-content/MainContent'));

// Helper Component for Lazy Loading with Suspense
const LazyComponent = (Component, Fallback = <Loading />) => (
  <Suspense fallback={Fallback}>
    <Component />
  </Suspense>
);

// Common Routes
const CommonRoutes = () => (
  <Route path="common">
    <Route path="user-profile" element={LazyComponent(UserProfilePage)} />
    <Route path="map" element={LazyComponent(Maps)} />
    <Route path="products" element={LazyComponent(Products)} />
    <Route path="services" element={LazyComponent(Services)} />
    <Route path="my-attendance" element={LazyComponent(AttendancePage)} />
    <Route path="dtr" element={LazyComponent(DtrPage)} />
    <Route path="my-payslip" element={LazyComponent(PaySlipPage)} />
    <Route path="quotations" element={LazyComponent(Quotations)} />
    <Route path="clients" element={LazyComponent(CompanyClient)} />
    <Route path="dtr-request" element={LazyComponent(DtrRequest)} />
    <Route path="announcement" element={LazyComponent(MyAnnouncement)} />
  </Route>
);

// Router
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />}>
        <Route path="" element={LazyComponent(MainContent, <LoadingLandingPage />)} />
        <Route path="company-profile" element={LazyComponent(CompanyProfile, <LoadingLandingPage />)} />
        <Route path="announcement" element={LazyComponent(AnnouncementPage, <LoadingLandingPage />)} />
      </Route>

      {/* Protected Login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/login" element={LazyComponent(Login)} />
      </Route>

      {/* Admin Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={LazyComponent(AdminDashboard)}>
          <Route path="" element={LazyComponent(Analytics)} />
          <Route path="employees" element={LazyComponent(EmployeeHomePage)} />
          <Route path="message-request" element={LazyComponent(MessageRequest)} />
          <Route path="dtr-record/:userId" element={LazyComponent(DtrListByUser)} />
          {CommonRoutes()}
        </Route>
      </Route>

      {/* Employee Routes */}
      <Route element={<RequireAuth />}>
        <Route path="employees" element={<EmployeeHomePage />}>
          <Route path="" element={LazyComponent(DtrPage)} />
          {CommonRoutes()}
        </Route>
      </Route>

      {/* Marketing Routes */}
      <Route element={<RequireAuth />}>
        <Route path="marketing" element={LazyComponent(MarketingOutlet)}>
          <Route path="" element={LazyComponent(MarketingDashboard)} />
          {CommonRoutes()}
        </Route>
      </Route>

      {/* Miscellaneous Routes */}
      <Route path="pdf-viewer/:name/id/:id" element={LazyComponent(PdfViewPage)} />
      <Route path="under-maintenance" element={LazyComponent(UnderMaintenance)} />
      <Route path="forgot-password" element={LazyComponent(ForgotPassword)} />
      <Route path="not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
