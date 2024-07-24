"use client";
import { useGetCartsQuery } from "@/app/redux/features/cartManagement/cartApi";
import React from "react";

export default function AllCarts() {
  const { data, isLoading, refetch } = useGetCartsQuery();
  console.log(data);
  return <div>AllCarts</div>;
}
