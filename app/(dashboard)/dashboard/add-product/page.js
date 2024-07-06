"use client";
import { useGetAllUserQuery } from "@/app/redux/features/auth/authApi";
import React from "react";

export default function AddProduct() {
  const { data } = useGetAllUserQuery();

  return <div>add product</div>;
}
