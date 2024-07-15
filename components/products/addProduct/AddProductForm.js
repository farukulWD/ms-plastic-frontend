"use client";
import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import InputElement from "@/components/form/InputElement";
import SelectElement from "@/components/form/SelectElement";
import { Col, Form, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function AddProductForm() {
  const { user } = useSelector((state) => state.user);

  const handleAddproduct = async (data) => {
    data.addedBy = user?._id;
    console.log(data);
  };
  const groupOptions = [
    {
      label: "Pride",
      value: "pride",
    },
  ];
  const companyOption = [
    {
      label: "RFL",
      value: "rfl",
    },
    {
      label: "TELHH",
      value: "TELHH",
    },
    {
      label: "TELFF",
      value: "TELFF",
    },
  ];
  return (
    <Row className="max-w-[600px] mx-auto">
      <Col span={24}>
        <CustomForm onSubmit={handleAddproduct}>
          <InputElement name={"code"} type="number" label={"Code"} />
          <InputElement name={"name"} type="text" label={"product name"} />
          <SelectElement
            name={"groupName"}
            label={"Group Name"}
            options={groupOptions}
          />
          <InputElement name={"price"} type="number" label={"product Price"} />
          <SelectElement
            name={"Company"}
            label={"Company Name"}
            options={companyOption}
          />
          <InputElement
            name={"quantity"}
            label={"Product Quantity"}
            type="number"
          />
          <Form.Item>
            <PrimaryButton title={"Add Product"} className={"w-full"} />
          </Form.Item>
        </CustomForm>
      </Col>
    </Row>
  );
}

export default AddProductForm;
