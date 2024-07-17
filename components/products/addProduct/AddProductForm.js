"use client";
import { useAddProductMutation } from "@/app/redux/features/products/productsApi";
import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import InputElement from "@/components/form/InputElement";
import SelectElement from "@/components/form/SelectElement";
import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Form, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

function AddProductForm() {
  const { user } = useSelector((state) => state.user);
  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleAddproduct = async (data) => {
    const toasterId = toast.loading("Creating Product", {
      position: "top-center",
    });
    data.addedBy = user?._id;
    try {
      const res = await addProduct(data).unwrap();
      if (res.error) {
        toast.error(res?.error?.data?.message, {
          id: toasterId,
          position: "top-center",
        });
      } else {
        toast.success("Product Created Successfully", {
          id: toasterId,
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toasterId,
        position: "top-center",
        duration: 2000,
      });
    }
  };

  const groupOptions = [{ label: "Pride", value: "pride" }];

  const companyOptions = [
    { label: "RFL", value: "rfl" },
    { label: "TELHH", value: "TELHH" },
    { label: "TELFF", value: "TELFF" },
  ];

  const addProductResolver = z.object({
    name: z.string({ required_error: "Name is required" }),
    code: z.string({ required_error: "Code is required" }),
    groupName: z.string({ required_error: "Group name is required" }),
    price: z.string({ required_error: "Price is required" }),
    company: z.string({ required_error: "Company is required" }),
    quantity: z.string({ required_error: "Quantity is required" }),
    addedBy: z.string({ required_error: "Added By is required" }),
  });

  return (
    <Row className="max-w-[600px] mx-auto border p-6 rounded-lg border-blue-color">
      <Col span={24}>
        <CustomForm
          onSubmit={handleAddproduct}
          resolver={zodResolver(addProductResolver)}
        >
          <InputElement name="code" label="Code" />
          <InputElement name="name" type="text" label="Product Name" />
          <SelectElement
            name="groupName"
            label="Group Name"
            options={groupOptions}
          />
          <InputElement name="price" type="number" label="Product Price" />
          <SelectElement
            name="company"
            label="Company Name"
            options={companyOptions}
          />
          <InputElement
            name="quantity"
            type="number"
            label="Product Quantity"
          />
          <Form.Item>
            <PrimaryButton
              type="submit"
              title="Add Product"
              className="w-full"
            />
          </Form.Item>
        </CustomForm>
      </Col>
    </Row>
  );
}

export default AddProductForm;
