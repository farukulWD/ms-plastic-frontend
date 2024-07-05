"use client";
import { Layout } from "antd";
import React, { useEffect } from "react";
import PrimaryButton from "../common/PrimaryButton";
import RemoveCookie from "../common/RemoveCookie";
import { logOut } from "@/app/redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const { Header } = Layout;

export default function DashboardHeader() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    RemoveCookie("refreshToken");
    dispatch(logOut());
    router.push("/auth/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      return;
    }
  }, []);
  const { name } = user;
  return (
    <Header className="bg-black-primary flex items-center w-full ">
      <div className="flex  w-full items-center justify-between">
        <p className="text-2xl font-semibold text-white">{name}</p>
        <PrimaryButton
          onClick={handleLogOut}
          className="dark:text-red-500"
          title="Log Out"
        />
      </div>
    </Header>
  );
}
