import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import LoginPage from './pages/login';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import Home from './components/Student';
import Loading from './components/Loading';
import './App.scss';
import { fetchUserAccountReduxThunk } from './redux/account/accountSlice';
import DepartmentPage from './pages/department';
import LayoutAdmin from './components/Admin';
import Dashboard from './components/Admin/Dashboard';
import HomeStaff from './components/Staff';
import Post from './components/Staff/Post';
import TableUser from './components/Admin/User';
import History from './components/Student/History';
import Header from './components/Student/Header';
import Footer from './components/Student/Footer';

const Layout = () => {
  return (
    <div className='wrapper'>
      <div className='container'>
        <Header />
        <div className='body-content'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

const LayoutStaff = () => {
  return (
    <Outlet />
  )
}

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading)
  useEffect(() => {
    if (window.location.pathname === '/login'
      // || window.location.pathname === '/'
    ) return;
    dispatch(fetchUserAccountReduxThunk());

  }, [])
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  // console.log("check authenticated app", isAuthenticated);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>  <Layout /> </ProtectedRoute>,
      errorElement: <NotFound />,
      children: [,
        { index: true, element: <Home /> },
        {
          path: "/department",
          element: <DepartmentPage />,
        },
        {
          path: "history/",
          element: <History />,
        },
      ],
    },
    {
      path: "/staff",
      element: <ProtectedRoute>  <LayoutStaff /> </ProtectedRoute>,
      errorElement: <NotFound />,
      children: [,
        { index: true, element: <HomeStaff /> },
        {
          path: "post/",
          element: <Post />,
        },
      ],
    },
    {
      path: "/admin",
      element: <ProtectedRoute> <LayoutAdmin /> </ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element: <Dashboard />
        },
        {
          path: "user/", element: <TableUser />
        },
      ],
    },
    {
      path: "login/",
      element: isAuthenticated ? <Navigate to="/" /> : <LoginPage />,
    },
  ]);

  return (
    <>
      {isLoading === false
        || window.location.pathname === '/login'
        // || window.location.pathname === '/'
        ?
        <RouterProvider router={router} />
        :
        <Loading />
      }
    </>
  );
}
