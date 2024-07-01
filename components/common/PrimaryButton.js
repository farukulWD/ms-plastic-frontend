import cn from "@/utils/cn";
import React from "react";

function PrimaryButton({ title, className, loading, ...restProps }) {
  return (
    <button
      className={cn(
        "text-white px-5 py-2.5 bg-black-primary font-medium focus:ring-1 focus:ring-gray-100 hover:bg-gray-100 dark:text-white text-sm  dark:hover:bg-gray-700 rounded-lg border-gray-300 dark:focus:ring-gray-700 me-2 mb-2 dark:border-gray-600  ",
        className
      )}
      {...restProps}
    >
      {loading ? "Loading..." : title}
    </button>
  );
}

export default PrimaryButton;
