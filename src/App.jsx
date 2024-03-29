import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import LoginStudent from './pages/login/Login';
import LoginStaff from './pages/login/LoginStaff';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import Home from './components/Student';
import Loading from './components/Loading';
import './App.scss';
import { fetchUserAccountReduxThunk } from './redux/account/accountSlice';
import LayoutAdmin from './components/Admin';
import Dashboard from './components/Admin/Dashboard';
import HomeStaff from './components/Staff';
import Post from './components/Staff/Post';
import UserTable from './components/Admin/User';
import FacultyTable from './components/Admin/Faculty';
import SubjectTable from './components/Admin/Subject';
import Header from './components/Student/header';
import Document from './components/Student/Document';
import PostPage from './pages/post';
import PostTable from './components/Admin/Post';
import DocumentTable from './components/Admin/Document';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

const LayoutStaff = () => {
  return (
    <Outlet />
  )
}

console.log('%cStop!', 'color: #ff0000; font-size: 48px; font-weight: bold; padding: 5px;');
console.log('%cThis is a browser feature intended for developers! Unauthorized access and damage to the system will result in legal prosecution!', 'background: #fff; color: #000; font-size: 18px; font-weight: bold; padding: 5px;');

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading);
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);


  useEffect(() => {
    if (window.location.pathname === '/login'
      || window.location.pathname === '/staff/login'
      || window.location.pathname === '/login/success'
      || window.location.pathname === '/login/error'
    ) return;

    dispatch(fetchUserAccountReduxThunk());

  }, []);


  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (window.location.pathname === '/login') {
  //       window.location.replace('/');
  //     }
  //     if (window.location.pathname.includes('/staff/login')) {
  //       window.location.replace('/staff');
  //     }
  //   }
  //   else {
  //     dispatch(fetchUserAccountReduxThunk());
  //   }

  // }, [window.location.pathname, isAuthenticated]);

  const LoginSuccess = () => {
    useEffect(() => {
      setTimeout(() => {
        window.close();
      }, 1000);
    }, []);

    return <div>Thanks for logging in!</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>  <Layout /> </ProtectedRoute>,
      errorElement: <NotFound />,
      children: [,
        { index: true, element: <Home /> },
        {
          path: "post/:slug",
          element: <PostPage />,
        },
        {
          path: "document/", element: <Document />
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
          path: "user/", element: <UserTable />
        },
        {
          path: "faculty/", element: <FacultyTable />
        },
        {
          path: "subject/", element: <SubjectTable />
        },
        {
          path: "post/", element: <PostTable />
        },
        {
          path: "document/", element: <DocumentTable />
        },
      ],
    },
    {
      path: "/login",
      element: !isAuthenticated ? <LoginStudent /> : <Navigate to="/" replace />,
    },
    {
      path: "/staff/login",
      element: !isAuthenticated ? <LoginStaff /> : <Navigate to="/staff" replace />,
    },
    {
      path: "/login/success",
      element: <LoginSuccess />
    },
    {
      path: "/login/error",
      element: <p>Error logging in. Please try again later!</p>
    },
    {
      path: "/*",
      element: <NotFound />
    }
  ]);

  return (
    <>
      {isLoading === false
        || window.location.pathname === '/login'
        || window.location.pathname === '/staff/login'
        || window.location.pathname === '/login/success'
        || window.location.pathname === '/login/error'
        ?
        <RouterProvider router={router} />
        :
        <Loading />
      }
    </>
  );
}
