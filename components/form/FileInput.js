import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Upload, Form, ConfigProvider, Image } from "antd";
import PrimaryButton from "../common/PrimaryButton";
import { CloudUploadOutlined } from "@ant-design/icons";

export default function FileInput({
  name,
  label,
  className,
  accept,
  maxCount,
}) {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const handlePreview = (file) => {
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      handlePreview(fileList[0].originFileObj);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <Controller
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Form.Item label={<span className="text-white text-sm">{label}</span>}>
          <ConfigProvider
            theme={{
              components: {
                Upload: {
                  actionsColor: "red",
                },
              },
            }}
          >
            <Upload
              beforeUpload={(file) => {
                onChange(file);
                return false;
              }}
              fileList={fileList}
              onChange={handleChange}
              showUploadList={true}
              accept={accept}
              maxCount={maxCount}
            >
              <PrimaryButton
                className={`bg-gray-700 rounded-sm bg-transparent border border-gray-700 ${className}`}
                type="button"
                icon={
                  <CloudUploadOutlined
                    title={"Profile Picture"}
                    className="text-2xl"
                  />
                }
              />
            </Upload>
          </ConfigProvider>
          {previewImage && (
            <div className="mt-2">
              <Image src={previewImage} alt="Preview" width={100} />
            </div>
          )}
          {error && <small className="text-red-500">{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
}
