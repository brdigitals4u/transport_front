import { BiSolidData } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { TbCurrentLocation } from "react-icons/tb";
import { FaUserShield } from "react-icons/fa";

export const Menus = [
  {
    icon: MdDashboard,
    name: "Dashboard",
    role: ["ADMIN"],
    path: "/dashboard",
  },
  {
    icon: BiSolidData,
    name: "Fleet",
    role: ["ADMIN", "CARRIER"],
    path: "/fleet",
    subItems: [
      {
        name: "Add Carrier",
        path: "/fleet/carrier",
        role: ["ADMIN"],
      },
      { name: "Trailer", path: "/fleet/trailer", role: ["ADMIN", "CARRIER"] },
      { name: "Drivers", path: "/fleet/drivers", role: ["ADMIN", "CARRIER"] },
      { name: "Route", path: "/fleet/route", role: ["ADMIN", "CARRIER"] },
      {
        name: "Vehical Model",
        path: "/fleet/vehical-model",
        role: ["ADMIN", "CARRIER"],
      },
      { name: "Permits", path: "/fleet/permits", role: ["ADMIN", "CARRIER"] },
      {
        name: "Existing Renewal Docs",
        path: "/fleet/existing-renewal-docs",
        role: ["ADMIN", "CARRIER"],
      },
    ],
  },
  {
    icon: TbCurrentLocation,
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
    icon: FaUserShield,
    name: "Customers",
    path: "/customers",
    role: ["ADMIN"],
  },
];

export const Other = [];
