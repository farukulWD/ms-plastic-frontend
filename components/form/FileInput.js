import React from "react";
import { Controller } from "react-hook-form";
import { Upload, Button, Form } from "antd";

export default function FileInput({ name, label, className }) {
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Form.Item label={<span className="text-white text-sm">{label}</span>}>
          <Upload
            className={className}
            beforeUpload={(file) => {
              onChange(file);
              return false; // Prevent automatic upload
            }}
            showUploadList={true}
          >
            <Button className="text-white w-full bg-gray-700 py-6 border-none dark:hover:bg-gray-700 hover:bg-gray-700">
              Click to Upload
            </Button>
          </Upload>
          {error && <small className="text-red-500">{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
}
