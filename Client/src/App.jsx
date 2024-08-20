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
  AdminDashbordLayout, 
  AdminDashbord, Request, 
  Staf, 
  Company, 
  Item, 
  Transaction, 
  Vehicle, Route, AddRoute
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
        {
          path: "admin",
          element: <AdminDashbordLayout />,
          children: [
            {
              index: true,
              element: <AdminDashbord />,
            },
            {
              path: "/admin/request",
              element: <Request />,
            },
            {
              path: "/admin/route",
              element: <Route />,
            },
            {
              path: "/admin/staf",
              element: <Staf />,
            },
            {
              path: "/admin/company",
              element: <Company />,
            },
            {
              path: "/admin/transaction",
              element: <Transaction />,
            },
            {
              path: "/admin/vehicle",
              element: <Vehicle />,
            },
            {
              path: "/admin/item",
              element: <Item />,
            },
            {
              path: "/admin/request/add-route",
              element: <AddRoute />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
