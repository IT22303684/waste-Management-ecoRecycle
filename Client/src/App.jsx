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
  AddBankDetails,
  ViewBankDetails,
  // MyEarning,
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
  Vehicle,
  Route,
  AddRoute,
  Test,
  EditRoute,
  AddVehicle,
  AddEmployee,
  EditEmployee,
  EditVehicle,
} from "./pages/index";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as profileAction } from "./pages/Profile";
import { action as addRitemAction } from "./pages/AddItems";
import { action as addBankDetails } from "./pages/AddBankDetails";
import { action as viewBankDetails } from "./pages/ViewBankDetails";
// import { action as myEarning } from "./pages/MyEarning";
import { loader as AllItemsLoader } from "./pages/AllItems";
import { loader as editItemLoader } from "./pages/EditItems";
import { action as editItemAction } from "./pages/EditItems";
import { action as deleteItemAction } from "./pages/DeleteItem";
import { loader as AdminDashboardLoader } from "./pages/AdminDashbordLayout";
import { loader as routeLoader } from "./pages/Route";
import { loader as editRouteLoader } from "./pages/EditRoute";
import { action as editRouteAction } from "./pages/EditRoute";
import { loader as AdminDashbordLoader } from "./pages/Dashbord";
import { loader as RequestLoader } from "./pages/Dashbord";
import { loader as addRouteLoader } from "./pages/AddRoute";
import { action as addRouteAction } from "./pages/AddRoute";
import { action as AddVehicleAction } from "./pages/AddVehicle";
import { loader as vehicleLoader } from "./pages/Vehicle";
import { loader as editVehicleLoader } from "./pages/EditVehicel";
import { action as editVehicleAction } from "./pages/EditVehicel";

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
              path: "edit-items/:id",
              element: <EditItems />,
              loader: editItemLoader,
              action: editItemAction,
            },
            {
              path: "delete-item/:id",
              action: deleteItemAction
            },
          ],
        },
        {
          path: "AdminDashboard",
          element: <AdminDashbordLayout />,
          children: [
            {
              index: true,
              element: <AdminDashbord />,
              loader: AdminDashbordLoader,
            },
            {
              path: "request",
              element: <Request />,
              loader: RequestLoader,
            },
            {
              path: "route",
              element: <Route />,
              loader: routeLoader,
            },
            {
              path: "staf",
              element: <Staf />,
            },
            {
              path: "company",
              element: <Company />,
            },
            {
              path: "transaction",
              element: <Transaction />,
            },
            {
              path: "vehicle",
              element: <Vehicle />,
              loader: vehicleLoader,

            },
            {
              path: "item",
              element: <Item />,
            },
            {
              path: "addRoute/:Reqid",
              element: <AddRoute />,
              loader: addRouteLoader,
              action: addRouteAction,
            },
            {
              path: "editRoute/:id",
              element: <EditRoute />,
              loader: editRouteLoader,
              action: editRouteAction,
            },
            {
              path: "AddVehicle",
              element: <AddVehicle />,
              action: AddVehicleAction,
            },
            {
              path: "EditVehicle/:id",
              element: <EditVehicle />,
              loader: editVehicleLoader,
              action: editVehicleAction,
            },
            {
              path: "AddEmployee",
              element: <AddEmployee />
            },
            {
              path: "EditEmployee",
              element: <EditEmployee />
            }

          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
