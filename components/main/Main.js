"use client";
import React, { useEffect } from "react";
import { Layout } from "antd";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import RemoveCookie from "../common/RemoveCookie";
import PrimaryButton from "../common/PrimaryButton";
import { logOut } from "@/app/redux/features/auth/authSlice";
const { Content, Footer, Header } = Layout;

const Main = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const handleLogOut = () => {
    RemoveCookie("refreshToken");
    dispatch(logOut());
    router.push("/auth/login");
  };

  return (
    <Layout className="min-h-screen ">
      <SideBar />
      <Layout>
        <Header className="bg-black-primary">
          <PrimaryButton
            onClick={() => handleLogOut()}
            className={"dark:text-red-500"}
            title={"Log Out"}
          />
        </Header>
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
