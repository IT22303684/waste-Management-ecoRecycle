import React from "react";

import { IoBag } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  {
    text: "MY DASHBOARD",
    path: ".",
    icon: <FaWpforms />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "Add Items",
    path: "Add-Items",
    icon: <IoBarChartSharp />,
  },
  {
    text: "Bank Account Details",
    path: "Bank-Details",
    icon: <IoBag />,
  },
  // {
  //   text: "View Bank Account Details",
  //   path: "VBank-Details",
  //   icon: <IoBagCheckOutline />,
  // },
  // {
  //   text: "My Earnings",
  //   path: "my-earning",
  //   icon: <IoBarChartSharp />,
  // },
  {
    text: "all Items",
    path: "all-Items",
    icon: <MdQueryStats />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
