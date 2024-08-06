"use client";
import { Layout, Menu } from "antd";
import React from "react";

import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import { addminRout } from "../routes/admin.routes";

const { Sider } = Layout;

function SideBar() {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      className="z-10"
    >
      <div className="demo-logo-vertical h-[64px] flex items-center justify-center flex-col">
        <h2 className="text-2xl text-white font-semibold">MS Plastic</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={sidebarItemsGenerator(addminRout, "dashboard", "admin")}
      />
    </Sider>
  );
}

export default SideBar;
