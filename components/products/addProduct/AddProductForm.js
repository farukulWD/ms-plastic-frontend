"use client";
import { useAddProductMutation } from "@/app/redux/features/products/productsApi";
import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import InputElement from "@/components/form/InputElement";
import SelectElement from "@/components/form/SelectElement";
import { companyOptions, groupOptions } from "@/utils/all-options/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Form, Row } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

function AddProductForm() {
  const { user } = useSelector((state) => state.user);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { reset } = useForm();
  const Router = useRouter();

  const addProductResolver = z.object({
    code: z.string({ required_error: "Code is required" }),
    name: z.string({ required_error: "Product name is required" }),
    groupName: z.string({ required_error: "Group name is required" }),
    price: z.coerce.number({ required_error: "Price is required" }),
    company: z.string({ required_error: "Company Name is required" }),
    quantity: z.coerce.number({ required_error: "Quantity is required" }),
  });

  const handleAddproduct = async (data) => {
    const toasterId = toast("Adding Product", { position: "top-center" });
    data.addedBy = user?._id;
    try {
      const res = await addProduct(data);
      if (res?.error) {
        toast.error(res?.error.data?.message, {
          duration: 2000,
          position: "top-center",
          id: toasterId,
        });
      } else {
        toast.success("Product added success", {
          duration: 2000,
          position: "top-center",
          id: toasterId,
        });
        reset();
        Router.push("/dashboard/admin/all-products");
      }
    } catch (error) {
      toast.error(error.data?.message, {
        duration: 2000,
        position: "top-center",
        id: toasterId,
      });
    }
  };

  return (
    <Row className="max-w-[600px] mx-auto border p-6 rounded-lg border-blue-color">
      <Col span={24}>
        <CustomForm
          resolver={zodResolver(addProductResolver)}
          onSubmit={handleAddproduct}
        >
          <InputElement name="code" label="Code" />
          <InputElement name={"name"} label={"Product Name"} />
          <SelectElement
            name={"groupName"}
            label={"Group Name"}
            options={groupOptions}
          />
          <InputElement name={"price"} label={"Product Price"} type="number" />
          <SelectElement
            name={"company"}
            label={"Company"}
            options={companyOptions}
          />
          <InputElement name={"quantity"} label={"Quantity"} type="number" />
          <Form.Item>
            <PrimaryButton
              type="submit"
              title="Add Product"
              className="w-full"
              loading={isLoading}
              disable={isLoading}
            />
          </Form.Item>
        </CustomForm>
      </Col>
    </Row>
  );
}

export default AddProductForm;
