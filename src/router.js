import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmplyeesList from './pages/admin/EmplyeesList';
import Analytics from './pages/admin/Analytics';

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