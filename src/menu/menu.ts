import { ComponentType } from "react";
import { RxDashboard } from "react-icons/rx";

import { IconType } from "react-icons";

export const Menus = [
  {
    icon: RxDashboard,
    name: "Dashboard",
    role: ["ADMIN"],
    path: "/dashboard",
  },
  {
    icon: RxDashboard,
    name: "Masters",
    role: ["ADMIN", "CARRIER"],
    path: "/masters",
    subItems: [
      {
        name: "Add Carrier",
        path: "/masters/carrier",
        role: ["ADMIN"],
      },
      { name: "Drivers", path: "/masters/drivers", role: ["ADMIN", "CARRIER"] },
      { name: "Route", path: "/masters/route", role: ["ADMIN", "CARRIER"] },
      {
        name: "Vehical Model",
        path: "/masters/vehical-model",
        role: ["ADMIN", "CARRIER"],
      },
      { name: "Permits", path: "/masters/permits", role: ["ADMIN", "CARRIER"] },
      {
        name: "Existing Renewal Docs",
        path: "/existing-renewal-docs",
        role: ["ADMIN", "CARRIER"],
      },
    ],
  },
  {
    icon: RxDashboard,
    name: "Tracking",
    role: ["ADMIN", "CARRIER"],
    path: "/tracking",
    subItems: [
      {
        name: "Track Vehicle",
        path: "/tracking/trackvehicle",
        role: ["ADMIN"],
      },
      {
        name: "Start Point",
        path: "/tracking/startPoint",
        role: ["ADMIN", "CARRIER"],
      },
    ],
  },
  {
    icon: RxDashboard,
    name: "Customers",
    path: "/customers",
    role: ["ADMIN"],
  },
];

export const Other = [];
