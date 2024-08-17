import React, { useEffect, useRef, useState } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Dashboard,
  AddItems,
  Profile,
  Admin,
  EditItems,
  AllItems,
  AdminDashboard,
} from "./pages/index";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as profileAction } from "./pages/Profile";
import { action as addRitemAction } from "./pages/AddItems";
import { loader as AllItemsLoader } from "./pages/AllItems";
import { loader as editItemLoader } from "./pages/EditItems";
import { action as editItemAction } from "./pages/EditItems";
import { action as deleteItemAction } from "./pages/DeleteItem";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "AdminDashboard",
          element: <AdminDashboard />,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          loader: dashboardLoader,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "Add-Items",
              element: <AddItems />,
              action: addRitemAction,
            },
            {
              path: "all-items",
              element: <AllItems />,
              loader: AllItemsLoader,
            },
            {
              path: "profile",
              element: <Profile />,
              action: profileAction,
            },
            {
              path: "admin",
              element: <Admin />,
            },
            {
              path: "edit-items/:id",
              element: <EditItems />,
              loader: editItemLoader,
              action: editItemAction,
            },
            { path: "delete-item/:id", action: deleteItemAction },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
