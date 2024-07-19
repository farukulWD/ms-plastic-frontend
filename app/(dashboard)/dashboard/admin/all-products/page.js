"use client";
import { useAllProductsQuery } from "@/app/redux/features/products/productsApi";
import React from "react";

export default function AllProduct() {
  const { data } = useAllProductsQuery();
  return <div>AllProduct</div>;
}
