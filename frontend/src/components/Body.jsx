import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Feed from './Feed';
import Profile from './Profile';

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
            children: [
                {
                    path: '/home',
                    element: <Feed />
                },
                {
                    path: '/profile/:id',
                    element: <Profile />,
                },
            ]
        },
        {
            path: '/login',
            element: <Login />
        },
    ])

    return (
        <RouterProvider router={appRouter} />
    )
}

export default Body