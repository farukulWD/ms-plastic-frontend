"use client";
import { useGetAllUserQuery } from "@/app/redux/features/auth/authApi";
import React from "react";

export default function Admin() {
  const { data } = useGetAllUserQuery({ page: 1, limit: 10 });

  console.log(data);
  return <div>Admin</div>;
}
