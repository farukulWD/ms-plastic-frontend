"use client";
import cn from "@/utils/cn";
import { Flex } from "antd";
import React from "react";

function PrimaryButton({ title, className, icon, loading, ...restProps }) {
  return (
    <button
      className={cn(
        "text-white px-5 py-2.5 bg-blue-color font-medium focus:ring-1 focus:ring-gray-100 hover:bg-gray-700 dark:text-white text-sm  dark:hover:bg-gray-700 rounded-lg border-gray-300 dark:focus:ring-gray-700 me-2 mb-2 dark:border-gray-600 transition-colors delay-75 ",
        className
      )}
      {...restProps}
    >
      {icon ? (
        <Flex gap={10} align="center" justify="center">
          {icon && icon}
          {loading ? "Loading..." : title}
        </Flex>
      ) : (
        <>{loading ? "Loading..." : title}</>
      )}
    </button>
  );
}

export default PrimaryButton;
