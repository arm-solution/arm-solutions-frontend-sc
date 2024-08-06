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
const OutletPage = lazy(() => import('../pages/employee/outlet-page/OutletPage'));
const EmployeeHomePage = lazy(() => import('../pages/employee/home-page/Home'));
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

    </Route>
    </>
)

export const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={ <LandingPage /> } />

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

                {CommonRoutes()}

            </Route>
        
        </Route>

        {/* Employees routing */}
        <Route element={<RequireAuth />}>
            <Route path='employees' element={<OutletPage />}>
            

                <Route path='' element={ 
                    <Suspense fallback={ <Loading /> }>
                        <EmployeeHomePage /> 
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
        <Route path='pdf-viewer/:name' element={
            <Suspense fallback={<Loading/> } >
                <PdfViewPage />
            </Suspense>
        } />



        {/* This is for not found route */}
        <Route path='*' element={ <NotFound /> } />
    </Route>
));