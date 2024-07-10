import cn from "@/utils/cn";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

export default function InputElement({
  name,
  type = "text",
  label,
  className,
}) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={<span className="text-white text-sm">{label}</span>}>
          {type === "password" ? (
            <Input.Password
              className={cn(
                "outline-none border-none placeholder-gray-400 text-white focus:bg-gray-700 hover:bg-gray-700 focus:border-none focus-within:shadow-none focus-within:border-none focus:outline-none rounded-lg py-3 px-4 h-full w-full bg-gray-700 focus-within:bg-gray-700 ",
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
          ) : type === "file" ? (
            <Upload
              {...field}
              className={cn(
                "outline-none placeholder:text-gray-400 border-none text-white focus:bg-gray-700 hover:bg-gray-700 focus:border-none focus-within:shadow-none focus-within:border-none focus:outline-none rounded-lg py-3 px-4 h-full w-full bg-gray-700 focus-within:bg-gray-700",
                className
              )}
              beforeUpload={(file) => {
                field.onChange(file);
                return false; // Prevent automatic upload
              }}
              showUploadList={false}
            >
              <Button className="text-white bg-gray-700 border-none hover:bg-gray-600">
                Click to Upload
              </Button>
            </Upload>
          ) : (
            <Input
              className={cn(
                "outline-none placeholder:text-gray-400 border-none text-white focus:bg-gray-700 hover:bg-gray-700 focus:border-none focus-within:shadow-none focus-within:border-none focus:outline-none rounded-lg py-3 px-4 h-full w-full bg-gray-700 focus-within:bg-gray-700",
                className
              )}
              {...field}
              id={name}
            />
          )}

          {error && <small className="text-red-500">{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
}
