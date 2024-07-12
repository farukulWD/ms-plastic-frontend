"use client";
import React from "react";
import { Layout } from "antd";
import SideBar from "./SideBar";
import DashboardHeader from "./Header";
const { Content, Footer } = Layout;

const Main = ({ children }) => {
  return (
    <Layout style={{ height: "100%" }}>
      <SideBar />
      <Layout>
        <DashboardHeader></DashboardHeader>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div className="h-full">{children}</div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Created by Farukul Islam ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Main;
