import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LandingPage from '../pages/landing-page/LandingPage'
import NotFound from '../pages/notFound-page/NotFound';
import Loading from '../components/loading-spinner/Loading';
import ProtectedRoute from './ProtectedRoute';
import RequireAuth from './RequireAuth';

const AdminDashboard = lazy(() => import('../pages/admin/admin-dashboard-page/AdminDashboard'));
const Analytics = lazy(() => import('../pages/admin/analytics-page/Analytics'));
const Login = lazy(() => import('../pages/login-page/Login'));
const EmplyeesList = lazy(() => import('../pages/admin/employeeList-page/EmplyeesList'));
const EmployeeHomePage = lazy(() => import('../pages/employee/employee-home-page/EmployeesHomePage'))
const DtrPage = lazy(() => import('../pages/employee/dtr-page/DtrPage'));
const Maps = lazy(() => import('../pages/common-pages/Map/Maps'));
const PaySlipPage = lazy(() => import("../pages/employee/pay-slip-page/PaySlipPage"));
const AttendancePage = lazy(() => import('../pages/employee/attendance-page/AttendancePage'));
const UserProfilePage = lazy(() => import('../pages/common-pages/user-profile-page/UserProfilePage'));
const Services = lazy(() => import('../pages/common-pages/services-page/Services'));
const Products = lazy(() => import('../pages/common-pages/products-page/Products'));
const MarketingDashboard = lazy(() => import('../pages/marketing/dashboard/MarketingDashboard'));
const MarketingOutlet = lazy(() => import('../pages/marketing/outlet/MarketingOutlet')); 
const Qoutations = lazy(() => import('./../pages/marketing/quotations/Quotations'));
const PdfViewPage = lazy(() => import('./../pages/pdf-viewer-page/PdfViewPage'));
const MessageRequest = lazy(() => import('./../pages/message-request-page/MessageRequest'));
const UnderMaintenace = lazy(() => import('./../pages/under-maintenace-page/UnderMaintenace'));
const CompanyClient = lazy(() => import('../pages/client-page/Client'));
const ForgotPassword = lazy(() => import('../pages/forgot-password/ForgotPassword'));
const DtrRequest = lazy(() => import('../pages/dtr-request-page/DtrRequest'));
const DtrListByUser = lazy(() => import('../pages/dtr-list-by-user-page/DtrListByUser'));

const CommonRoutes = () => (
    <>
    <Route path='common'>
        <Route path='user-profile' element={
            <Suspense fallback={ <Loading /> }>
                <UserProfilePage />
            </Suspense>
        } ></Route>

        <Route path='map' element={
            <Suspense fallback={<Loading/> } >
                <Maps />
            </Suspense>
        } />

        <Route path='products' element={
            <Suspense fallback={<Loading/> } >
                <Products />
            </Suspense>
        } />

        <Route path='services' element={
            <Suspense fallback={<Loading/> } >
                <Services />
            </Suspense>
        } />

        <Route path='my-attendance' element={ 
            <Suspense fallback={ <Loading /> }>
                <AttendancePage /> 
            </Suspense>
        }/>

        <Route path='dtr' element={ 
            <Suspense fallback={ <Loading /> }>
                <DtrPage /> 
            </Suspense>
        }/>

        <Route path='my-payslip' element={ 
            <Suspense fallback={ <Loading /> }>
                <PaySlipPage /> 
            </Suspense>
        }/>

        <Route path='qoutations' element={ 
            <Suspense fallback={ <Loading /> }>
                 <Qoutations /> 
            </Suspense>
        }/>

        <Route path='clients' element={ 
            <Suspense fallback={ <Loading /> }>
                 <CompanyClient /> 
            </Suspense>
        }/>

        <Route path='dtr-request' element={ 
            <Suspense fallback={ <Loading /> }>
                 <DtrRequest /> 
            </Suspense>
        }/>

    </Route>
    </>
)

export const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={ <LandingPage /> } />

        {/* this is checking not to access the login if you are already login */}
        <Route element={<ProtectedRoute />}>
            <Route path='/login' element={ 
                <Suspense fallback={ <Loading />}>
                    <Login />
                </Suspense>
            } />
        </Route>


        {/* Admin Routing */}
        <Route element={<RequireAuth />}>

                <Route path='/admin' element={ 
                    <Suspense fallback={<Loading />}>
                        <AdminDashboard />
                    </Suspense>
                } >


                <Route path='' element={ 
                        <Suspense fallback={<Loading />}>
                            <Analytics />
                        </Suspense>
                 } />

                <Route path='employees' element={
                    <Suspense fallback={<Loading />}>
                        <EmplyeesList /> 
                    </Suspense>
                } />

                <Route path='message-request' element={
                    <Suspense fallback={<Loading />}>
                        <MessageRequest />
                    </Suspense>
                } >

                </Route>

                <Route path='dtr-record/:userId' element={
                    <Suspense fallback={<Loading/> } >
                        <DtrListByUser />
                    </Suspense>
                } />

                {CommonRoutes()}
                
            </Route>
        
        </Route>

        {/* Employees routing */}
        <Route element={<RequireAuth />}>
            <Route path='employees' element={<EmployeeHomePage />}>
            

                <Route path='' element={ 
                    <Suspense fallback={ <Loading /> }>
                        <DtrPage /> 
                    </Suspense>
                }/>

                {CommonRoutes()}

            </Route>
        
        </Route>


        {/* Marketing Routing */}
        <Route element={<RequireAuth />}>

                <Route path='marketing' element={ <MarketingOutlet /> } >

                    <Route path='' element={ 
                        <Suspense fallback={ <Loading /> }>
                            <MarketingDashboard /> 
                        </Suspense>
                    }/>

                    {CommonRoutes()}

                </Route>
        
        </Route>

        {/* pdf viewer */}
        <Route path='pdf-viewer/:name/id/:id' element={
            <Suspense fallback={<Loading/> } >
                <PdfViewPage />
            </Suspense>
        } />


        <Route path='under-maintenace' element={
            <Suspense fallback={<Loading/> } >
                <UnderMaintenace />
            </Suspense>
        } />

        <Route path='forgot-password' element={
            <Suspense fallback={<Loading/> } >
                <ForgotPassword />
            </Suspense>
        } />

        {/* <Route path='company-profile' element={
            <Suspense fallback={<Loading/> } >
                <Profile />
            </Suspense>
        } /> */}

        <Route path="not-found" element={<NotFound />} />

        {/* This is for not found route */}
        <Route path='*' element={ <NotFound /> } />
    </Route>
));