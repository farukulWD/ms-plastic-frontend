"use client";

import { Layout, Menu } from "antd";
import React from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import getPath from "@/utils/getPath";

const { Sider } = Layout;

function SideBar() {
  const currentRoute = getPath();

  const items = [
    {
      key: "1",
      icon: React.createElement(UserOutlined),
      label: <Link href="/add-product">Add Product</Link>,
    },
    {
      key: "2",
      icon: React.createElement(VideoCameraOutlined),
      label: <Link href="/">Home</Link>,
    },
  ];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
    >
      <div className="demo-logo-vertical"></div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[currentRoute === "/" ? "2" : "1"]}
        items={items}
      />
    </Sider>
  );
}

export default SideBar;
