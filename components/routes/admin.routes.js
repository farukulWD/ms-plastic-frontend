import { UserOutlined } from "@ant-design/icons";
import React from "react";

export const addminRout = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "User management",
    children: [
      {
        name: "Al Users",
        icon: React.createElement(UserOutlined),
        path: "/users",
      },
    ],
  },
  {
    name: "Product Managment",
    children: [
      {
        name: "Add Produt",
        path: "/add-product",
      },
    ],
  },
  {
    name: "Order Managment",
    children: [
      {
        name: "Add Produt",
        path: "/add-product",
      },
    ],
  },
  {
    name: "Cart Managment",
    children: [
      {
        name: "Add Produt",
        path: "/add-product",
      },
    ],
  },
];
