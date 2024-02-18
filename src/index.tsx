import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './modules/layout/pages/home';
import AboutPage from './modules/layout/pages/about';
import AdminContact from './modules/contacts/pages/admin-contact';
import AddContact from './modules/contacts/pages/add-contact';
import EditContact from './modules/contacts/pages/edit-contact';
import ViewContact from './modules/contacts/pages/view-contact';
import LoginUser from './modules/users/pages/login-user';
import RegisterUser from './modules/users/pages/register-user';
import NotFound from './modules/ui/pages/not-found';

/**
 * configure redux store
 */

import {Provider} from "react-redux";
import store from "./utils/cma-redux/store";
// import CounterRedux from './modules2/counter/counter-redux';
// import EmployeeRedux from './modules2/employee/employee-redux';
// import GamesDashboard from './modules2/games-dashboard';
// import UserListRedux from './modules2/userlist/userlist-redux';

/**
 * configure React-Toastify
 */
// import "../node_modules/react-toastify/dist/react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "contacts",
        children: [
          {
            path: "admin",
            element: <AdminContact />
          },
          {
            path: "add",
            element: <AddContact />
          },
          {
            path: "edit/:contactId",
            element: <EditContact />
          },
          {
            path: "view/:contactId",
            element: <ViewContact />
          }
        ]
      },
      {
        path: "users",
        children: [
          {
            path: "login",
            element: <LoginUser />
          },
          {
            path: "register",
            element: <RegisterUser />
          }
        ]
      }
    ]
  },
  // {
  //   path: "/games",
  //   element: <GamesDashboard />,
  //   children: [
  //     {
  //       path: "counter",
  //       element: <CounterRedux />
  //     },
  //     {
  //       path: "employee",
  //       element: <EmployeeRedux />
  //     },
  //     {
  //       path: "user",
  //       element: <UserListRedux />
  //     }
  //   ]
  // },
  {
    path: "*",
    element: <NotFound />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
);