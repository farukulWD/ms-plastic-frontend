"use client";

import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import SelectElement from "@/components/form/SelectElement";
import { groupOptions } from "@/utils/all-options/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Flex, Form, Row } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

export default function AddToCart() {
  const Router = useRouter();

  const handleSubmit = (data) => {
    Router.push(`/dashboard/admin/add-to-cart/${data?.group}`);
  };
  const groupResolver = z.object({
    group: z.string({ required_error: "Please select group" }),
  });
  return (
    <Flex justify="center" align="center" className="h-full">
      <Row className="max-w-[500px] w-full  mx-auto border p-6 rounded-lg border-blue-color">
        <Col className="flex flex-col justify-center items-center" span={24}>
          <h2 className="text-2xl text-balance">Please Select Group </h2>
          <p className="text-gray-300">Before Make a cart</p>
        </Col>
        <Col span={24}>
          <CustomForm
            onSubmit={handleSubmit}
            resolver={zodResolver(groupResolver)}
          >
            <SelectElement
              name={"group"}
              options={groupOptions}
              label={"Select Group"}
            />
            <Form.Item>
              <PrimaryButton className={"w-full"} title={"Okay"} />
            </Form.Item>
          </CustomForm>
        </Col>
      </Row>
    </Flex>
  );
}
