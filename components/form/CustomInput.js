import cn from "@/utils/cn";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

export default function CustomInput({ name, type = "text", label, className }) {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={<span className="text-white">{label}</span>}>
          {type === "password" ? (
            <Input.Password
              className={cn(
                "outline-none border-none text-white focus:bg-gray-700 hover:bg-gray-700 focus:border-none focus-within:shadow-none focus-within:border-none focus:outline-none rounded-lg py-3 px-4 h-full w-full bg-gray-700 focus-within:bg-gray-700 ",
                className
              )}
              {...field}
              id={name}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={{ color: "white" }} title="Hide" />
                ) : (
                  <EyeInvisibleOutlined
                    style={{ color: "white" }}
                    title="Show"
                  />
                )
              }
            />
          ) : (
            <Input
              className={cn(
                "outline-none border-none text-white focus:bg-gray-700 hover:bg-gray-700 focus:border-none focus-within:shadow-none focus-within:border-none focus:outline-none rounded-lg py-3 px-4 h-full w-full bg-gray-700 focus-within:bg-gray-700",
                className
              )}
              {...field}
              id={name}
            />
          )}
        </Form.Item>
      )}
    />
  );
}
