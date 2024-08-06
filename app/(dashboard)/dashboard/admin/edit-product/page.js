"use client";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/app/redux/features/products/productsApi";
import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import InputElement from "@/components/form/InputElement";
import SelectElement from "@/components/form/SelectElement";
import { companyOptions, groupOptions } from "@/utils/all-options/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Form, Row, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export default function EditProduct() {
  const Router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const [defaultValue, setDefultValue] = useState(null);

  const { data, refetch } = useGetSingleProductQuery(id, { skip: !id });
  const [updateProduct, { isLoading, error }] = useUpdateProductMutation();

  useEffect(() => {
    if (data?.data) {
      const { code, name, groupName, price, company, quantity } = data?.data;
      setDefultValue({ code, name, groupName, price, company, quantity });
    }
  }, [data]);

  const editResolver = z.object({
    code: z.string({ required_error: "Code is required" }),
    name: z.string({ required_error: "Product name is required" }),
    groupName: z.string({ required_error: "Group name is required" }),
    price: z.coerce.number({ required_error: "Price is required" }),
    company: z.string({ required_error: "Company Name is required" }),
    quantity: z.coerce.number({ required_error: "Quantity is required" }),
  });

  const handleEdit = async (data) => {
    const toasterId = toast.loading("Updating product", {
      position: "top-center",
    });
    try {
      const res = await updateProduct({ id, data }).unwrap();
      if (res?.error) {
        toast.error(res?.error?.data?.message, {
          id: toasterId,
          duration: 2000,
        });
      } else {
        toast.success("The update hase been success", {
          id: toasterId,
          duration: 2000,
        });
        refetch();
        Router.push("/dashboard/admin/all-products");
      }
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toasterId,
        duration: 2000,
      });
    }
  };
  return (
    <Row className="max-w-[600px] mx-auto border p-6 rounded-lg border-blue-color">
      {data?.data && defaultValue ? (
        <Col span={24}>
          <CustomForm
            resolver={zodResolver(editResolver)}
            defaultValues={defaultValue}
            onSubmit={handleEdit}
          >
            <InputElement name="code" label="Code" readOnly />
            <InputElement name={"name"} label={"Product Name"} />
            <SelectElement
              name={"groupName"}
              label={"Group Name"}
              options={groupOptions}
            />
            <InputElement
              name={"price"}
              label={"Product Price"}
              type="number"
            />
            <SelectElement
              name={"company"}
              label={"Company"}
              options={companyOptions}
            />
            <InputElement name={"quantity"} label={"Quantity"} type="number" />
            <Form.Item>
              <PrimaryButton
                type="submit"
                title="Save Product"
                className="w-full"
                loading={isLoading}
                disable={isLoading}
              />
            </Form.Item>
          </CustomForm>
        </Col>
      ) : (
        <Spin></Spin>
      )}
    </Row>
  );
}
