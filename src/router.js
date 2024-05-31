import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page/LandingPage'
import Login from './pages/login-page/Login';
import NotFound from './pages/notFound-page/NotFound';
import AdminDashboard from './pages/admin/admin-dashboard-page/AdminDashboard';
import EmplyeesList from './pages/admin/employeeList-page/EmplyeesList';
import Analytics from './pages/admin/analytics-page/Analytics';
import OutletPage from './pages/employee/outlet-page/OutletPage';
import Home from './pages/employee/home-page/Home';
export const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={ <LandingPage /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/admin' element={ <AdminDashboard /> } >
            <Route path='' element={ <Analytics /> } />
            <Route path='employees' element={ <EmplyeesList /> } />
        </Route>
        <Route path='employees' element={<OutletPage />}>
            <Route path='' element={ <Home /> }/>
        </Route>
        <Route path='*' element={ <NotFound /> } />
    </Route>
));