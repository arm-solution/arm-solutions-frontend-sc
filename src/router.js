import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';

export const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={ <LandingPage /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/admin' element={ <AdminDashboard /> } />
        <Route path='*' element={ <NotFound /> } />
    </Route>
))