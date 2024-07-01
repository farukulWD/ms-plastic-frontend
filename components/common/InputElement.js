import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState } from "react";

function InputElement({
  name,
  placeholder,
  value,
  onChange,
  label,
  type = "text",
  errorMessage,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="my-4 flex flex-col">
      <label htmlFor={name} className="mb-2">
        {label}
      </label>

      <div className="relative w-full   text-white  ">
        {type === "password" ? (
          <div>
            <input
              className="outline-none rounded-lg py-3 px-4 h-full w-full bg-gray-700 "
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              id={name}
              type={showPassword ? "text" : "password"}
            />
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        ) : (
          <input
            className="outline-none rounded-lg py-3 px-4 h-full w-full bg-gray-700 "
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            id={name}
            type={type}
          />
        )}
        {type === "password" && (
          <div className="absolute right-5 top-[26%]">
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
    </div>
  );
}

export default InputElement;
