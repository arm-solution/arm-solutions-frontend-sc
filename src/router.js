import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/LandingPage'
import Login from './pages/loginPage/Login';
import NotFound from './pages/NotFoundPage/NotFound';
import AdminDashboard from './pages/admin/admin-dashboard/AdminDashboard';
import EmplyeesList from './pages/admin/employeeList/EmplyeesList';
import Analytics from './pages/admin/analytics/Analytics';

export const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={ <LandingPage /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/admin' element={ <AdminDashboard /> } >
            <Route path='' element={ <Analytics /> } />
            <Route path='employees' element={ <EmplyeesList /> } />
        </Route>
        <Route path='*' element={ <NotFound /> } />
    </Route>
))