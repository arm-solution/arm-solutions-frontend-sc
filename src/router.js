import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LandingPage from './pages/landing-page/LandingPage'
import NotFound from './pages/notFound-page/NotFound';
import Loading from './components/Loading';


const AdminDashboard = lazy(() => import('./pages/admin/admin-dashboard-page/AdminDashboard'));
const Analytics = lazy(() => import('./pages/admin/analytics-page/Analytics'));
const Login = lazy(() => import('./pages/login-page/Login'));
const EmplyeesList = lazy(() => import('./pages/admin/employeeList-page/EmplyeesList'));
const OutletPage = lazy(() => import('./pages/employee/outlet-page/OutletPage'));
const EmployeeHomePage = lazy(() => import('./pages/employee/home-page/Home'));
const Maps = lazy(() => import('./pages/common-pages/Map/Maps'));
const PaySlipPage = lazy(() => import("./pages/employee/pay-slip-page/PaySlipPage"));
const AttendancePage = lazy(() => import('./pages/employee/attendance-page/AttendancePage'));
const UserProfilePage = lazy(() => import('./pages/common-pages/user-profile-page/UserProfilePage'));
const Services = lazy(() => import('./pages/common-pages/services-page/Services'));
const Products = lazy(() => import('./pages/common-pages/products-page/Products'));

const CommonRoutes = () => (
    <>
    <Route path='common'>
        <Route path='user-profile/:id' element={
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

    </Route>
    
    </>
)

export const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={ <LandingPage /> } />

        <Route path='/login' element={ 
            <Suspense fallback={ <Loading />}>
                <Login />
            </Suspense>
         } />

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

            {CommonRoutes()}

        </Route>

        <Route path='employees' element={<OutletPage />}>

            <Route path='' element={ 
                <Suspense fallback={ <Loading /> }>
                    <EmployeeHomePage /> 
                </Suspense>
            }/>

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

            {CommonRoutes()}

        </Route>


        {/* This is for not found route */}
        <Route path='*' element={ <NotFound /> } />
    </Route>
));