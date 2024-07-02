"use client";
import cn from "@/utils/cn";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function InputElement({
  name,
  placeholder,
  value,
  onChange,
  label,
  type = "text",
  errorMessage,
  className,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="my-4 flex flex-col">
      <label htmlFor={name} className="mb-2">
        {label}
      </label>

      <div className=" w-full   text-white  ">
        {type === "password" ? (
          <div className="relative">
            <input
              style={{ border: errorMessage ? "1px solid red" : "" }}
              className={cn(
                "outline-none rounded-lg py-3 px-4 h-full w-full bg-gray-700 ",
                className
              )}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              id={name}
              type={showPassword ? "text" : "password"}
            />
            {errorMessage && (
              <label className="text-red-700">{errorMessage}</label>
            )}
            {type === "password" && (
              <div className="absolute right-5 top-[22%]">
                {!showPassword ? (
                  <EyeOutlined
                    title="Show password"
                    onClick={() => setShowPassword(true)}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    title="Hide password"
                    onClick={() => setShowPassword(false)}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <input
              style={{ border: errorMessage ? "1px solid red" : "" }}
              className={cn(
                "outline-none rounded-lg py-3 px-4 h-full w-full bg-gray-700  ",
                className
              )}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              id={name}
              type={type}
            />
            {errorMessage && (
              <label className="text-red-700">{errorMessage}</label>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputElement;
