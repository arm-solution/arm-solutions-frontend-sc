import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import LandingPage from '../pages/reusable-pages/landing-page/LandingPage';
import NotFound from '../pages/reusable-pages/notFound-page/NotFound';
import Loading from '../components/loading-spinner/Loading';
import LoadingLandingPage from '../components/loading-landing-page/LoadingLandingPage';
import ProtectedRoute from './ProtectedRoute';
import RequireAuth from './RequireAuth';

// /reusable-pages

// Lazy-loaded Components
const Analytics = lazy(() => import('../pages/reusable-pages/analytics-page/Analytics'));
const Login = lazy(() => import('../pages/reusable-pages/login-page/Login'));
const DtrPage = lazy(() => import('../pages/reusable-pages/dtr-page/DtrPage'));
const Maps = lazy(() => import('../pages/reusable-pages/common-pages/Map/Maps'));
const PaySlipPage = lazy(() => import("../pages/reusable-pages/pay-slip-page/PaySlipPage"));
const AttendancePage = lazy(() => import('../pages/reusable-pages/attendance-page/AttendancePage'));
const UserProfilePage = lazy(() => import('../pages/reusable-pages/common-pages/user-profile-page/UserProfilePage'));
const Services = lazy(() => import('../pages//reusable-pages/common-pages/services-page/Services'));
const Products = lazy(() => import('../pages/reusable-pages/common-pages/products-page/Products'));
const Quotations = lazy(() => import('../pages/reusable-pages/quotations/Quotations'));
const PdfViewPage = lazy(() => import('../pages/reusable-pages/pdf-viewer-page/PdfViewPage'));
const MessageRequest = lazy(() => import('../pages/reusable-pages/message-request-page/MessageRequest'));
const UnderMaintenance = lazy(() => import('../pages/reusable-pages/under-maintenace-page/UnderMaintenace'));
const CompanyClient = lazy(() => import('../pages/reusable-pages/client-page/Client'));
const ForgotPassword = lazy(() => import('../pages/reusable-pages/forgot-password/ForgotPassword'));
const DtrRequest = lazy(() => import('../pages/reusable-pages/dtr-request-page/DtrRequest'));
const DtrListByUser = lazy(() => import('../pages/reusable-pages/dtr-list-by-user-page/DtrListByUser'));
const MyAnnouncement = lazy(() => import('../pages/reusable-pages/common-pages/announcement-page/MyAnnouncement'));
const AnnouncementPage = lazy(() => import('../pages/reusable-pages/annoucement/Announcement'));
const CompanyProfile = lazy(() => import('../pages/reusable-pages/company-profile-page/Profile'));
const MainContent = lazy(() => import('../pages/reusable-pages/landing-main-content/MainContent'));
const Qoutations = lazy(() => import('../pages/reusable-pages/quotations/Quotations'));
const EmployeeList = lazy(() => import('../pages/reusable-pages/employeeList-page/EmplyeesList'))
const CutOff = lazy(() => import('./../pages/reusable-pages/cutoff-page/CutOff'));
const DtrStandalone = lazy(() => import('./../pages/reusable-pages/dtr-standalone-page/DtrForOnsite'));
const JobOrder = lazy(() => import('./../pages/reusable-pages/job-order/JobOrder'));
const JobOrderForm = lazy(() => import('./../pages/reusable-pages/job-order-form/JobOrderForm'))

// outlets
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const EmployeeHomePage = lazy(() => import('../pages/employees/EmployeesHomePage'));
const MarketingOutlet = lazy(() => import('../pages/marketing/MarketingOutlet'));
const AccountingOutlet = lazy(() => import('../pages/accounting/AccountingOutlet'));
const HrOutlet = lazy(() => import('../pages/hr/HrOutlet'));
const PurchasingOutlet = lazy(() => import('../pages/purchasing/PurchasingOutlet'));
const SalesOutlet = lazy(() => import('../pages/sales/SalesOutlet'));
const WareHouseOutlet = lazy(() => import('../pages/warehouse/WareHouseOutlet'));
const EngineeringOutlet = lazy(() => import('../pages/engineering/EngineeringOutlet'))
const FinanceOutlet = lazy(() => import('../pages/finance/FinanceOutlet'));

// Helper Component for Lazy Loading with Suspense
const LazyComponent = (Component, Fallback = <Loading />) => (
  <Suspense fallback={Fallback}>
    <Component />
  </Suspense>
);

// Common Routes
const CommonRoutes = () => (
  <Route path="common">
    <Route path="products" element={LazyComponent(Products)} />
    <Route path="services" element={LazyComponent(Services)} />
    <Route path="quotations" element={LazyComponent(Quotations)} />
    <Route path="clients" element={LazyComponent(CompanyClient)} />
    <Route path="dtr-request" element={LazyComponent(DtrRequest)} />
    <Route path="announcement" element={LazyComponent(MyAnnouncement)} />
    <Route path="qoutations" element={LazyComponent(Qoutations)} />
    <Route path="map" element={LazyComponent(Maps)} />
    <Route path="job-order" element={LazyComponent(JobOrder)} />
    <Route path="job-order-form/:proposalID" element={LazyComponent(JobOrderForm)} />
  </Route>
);

const CommonAllUsersRoutes = () => (
  <Route path="general">
      <Route path="dtr" element={LazyComponent(DtrPage)} />
      <Route path="user-profile" element={LazyComponent(UserProfilePage)} />
      <Route path="my-attendance" element={LazyComponent(AttendancePage)} />
      <Route path="my-payslip" element={LazyComponent(PaySlipPage)} />
  </Route>
);

// Router
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Landing Page */}
      {/* <Route path="/" element={<LandingPage />}>
        <Route path="" element={LazyComponent(MainContent, <LoadingLandingPage />)} />
        <Route path="company-profile" element={LazyComponent(CompanyProfile, <LoadingLandingPage />)} />
        <Route path="announcement" element={LazyComponent(AnnouncementPage, <LoadingLandingPage />)} />
      </Route> */}

      {/* Protected Login */}
      {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" element={<Login />} />
      {/* </Route> */}

      {/* Admin Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={LazyComponent(AdminDashboard)}>
          <Route path="" element={LazyComponent(Analytics)} />
          <Route path="employeeList" element={LazyComponent(EmployeeList)} />
          <Route path="message-request" element={LazyComponent(MessageRequest)} />
          <Route path="dtr-record/:userId" element={LazyComponent(DtrListByUser)} />
          <Route path='cutoff' element={LazyComponent(CutOff)}/>
          {CommonAllUsersRoutes()}
          {CommonRoutes()}
        </Route>
      </Route>

      {/* Employee Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/production" element={LazyComponent(EmployeeHomePage)}>
          <Route path="" element={LazyComponent(DtrPage)} />
          {CommonAllUsersRoutes()}
        </Route>
      </Route>

      {/* Marketing Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/marketing" element={LazyComponent(MarketingOutlet)}>
          <Route path="" element={LazyComponent(DtrPage)} /> 
          {CommonAllUsersRoutes()}  
          {CommonRoutes()}
        </Route>
      </Route>

      {/* Accounting Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/accounting" element={LazyComponent(AccountingOutlet)}>
          <Route path="" element={LazyComponent(DtrPage)} /> 
          {CommonAllUsersRoutes()}
          {CommonRoutes()}
        </Route>
      </Route>

      {/* Engineering Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/engineering" element={LazyComponent(EngineeringOutlet)}>
          <Route path="" element={LazyComponent(DtrPage)} /> 
          {CommonAllUsersRoutes()}
          {CommonRoutes()}
        </Route>
      </Route>

      {/* Finance Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/finance" element={LazyComponent(FinanceOutlet)}>
          <Route path="" element={LazyComponent(DtrPage)} /> 
          {CommonAllUsersRoutes()}
          {CommonRoutes()}
        </Route>
      </Route>

      {/* Sales Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/sales" element={LazyComponent(SalesOutlet)}>
          <Route path="" element={LazyComponent(DtrPage)} /> 
          {CommonAllUsersRoutes()}
        </Route>
      </Route>

      {/* HR Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/hr" element={LazyComponent(HrOutlet)}>
          <Route path="" element={LazyComponent(DtrPage)} /> 
          {CommonAllUsersRoutes()}
          {CommonRoutes()}
        </Route>
      </Route>

      {/* Purchasing Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/purchasing" element={LazyComponent(PurchasingOutlet)}>
          <Route path="" element={LazyComponent(DtrPage)} /> 
          {CommonAllUsersRoutes()}
          {CommonRoutes()}
        </Route>
      </Route>

      {/* WareHouse Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/warehouse" element={LazyComponent(WareHouseOutlet)}>
          <Route path="" element={LazyComponent(DtrPage)} /> 
          {CommonAllUsersRoutes()}
          {CommonRoutes()}
        </Route>
      </Route>


      {/* Miscellaneous Routes */}
      <Route path="pdf-viewer/:name/id/:id" element={LazyComponent(PdfViewPage)} />
      <Route path="under-maintenance" element={LazyComponent(UnderMaintenance)} />
      <Route path="dtr-onsite-access" element={LazyComponent(DtrStandalone)} />
      <Route path="forgot-password" element={LazyComponent(ForgotPassword)} />
      <Route path="not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
