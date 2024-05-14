import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={ <LandingPage /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='*' element={ <NotFound /> } />
    </Route>
))