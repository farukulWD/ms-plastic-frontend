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
            padding: "24px 16px 0",
          }}
          className="bg-black-secondary"
        >
          <div className="h-full">{children}</div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
          className="bg-black-secondary text-white"
        >
          Created by Farukul Islam ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Main;
