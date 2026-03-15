import { createBrowserRouter } from 'react-router'
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import Protected from './auth/components/protected';
import Home from './home/pages/Home';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home/></Protected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
])