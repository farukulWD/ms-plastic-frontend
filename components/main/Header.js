"use client";
import { Flex, Layout } from "antd";
import React, { useEffect } from "react";
import PrimaryButton from "../common/PrimaryButton";
import RemoveCookie from "../common/RemoveCookie";
import { logOut } from "@/app/redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  const { name, profilePicture } = user;
  return (
    <Header className="flex sticky top-0 right-0 z-10 items-center w-full ">
      <div className="flex  w-full items-center justify-between">
        <Flex align="center" gap={8}>
          <Image
            src={profilePicture}
            height={32}
            width={32}
            className="h-8 w-8 rounded-full"
            alt={name}
          />
          <p className="text-2xl font-semibold text-white">{name}</p>
        </Flex>

        <PrimaryButton
          onClick={handleLogOut}
          className="dark:text-red-500"
          title="Log Out"
        />
      </div>
    </Header>
  );
}
