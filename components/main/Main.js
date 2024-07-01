"use client";

import React, { useEffect } from "react";
import { Layout } from "antd";
import SideBar from "./SideBar";
import Login from "../auth/Login";
const { Content, Footer } = Layout;

const Main = ({ children }) => {
  return (
    <Layout className="min-h-screen ">
      <SideBar />
      <Layout>
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
