import cn from "@/utils/cn";
import React from "react";

function PrimaryButton({ title, className, loading, ...restProps }) {
  return (
    <button
      className={cn(
        "bg-black-primary px-4 py-2 rounded-md text-white text-lg",
        className
      )}
      {...restProps}
    >
      {loading ? "Loading..." : title}
    </button>
  );
}

export default PrimaryButton;
