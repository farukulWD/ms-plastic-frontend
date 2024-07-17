import cn from "@/utils/cn";
import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

const SelectElement = ({ label, name, options, className }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            label ? <span className="text-white text-sm">{label}</span> : null
          }
        >
          <Select
            variant="borderless"
            className={cn(
              "outline-none border-none placeholder-gray-400 text-white focus:bg-gray-700 hover:bg-gray-700 focus:border-none focus-within:shadow-none focus-within:border-none focus:outline-none rounded-lg py-3 px-2 h-full w-full bg-gray-700 focus-within:bg-gray-700 ",
              className
            )}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
          />
          {error && <small className="text-red-500">{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default SelectElement;
