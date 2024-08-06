import AddProductForm from "@/components/products/addProduct/AddProductForm";
import { Col, Row } from "antd";
import React from "react";

export default function AddProductPage() {
  return (
    <Row gutter={[0, 10]}>
      <Col span={24}>
        <h2 className="text-2xl font-medium text-right md:text-center text-white text-balance">
          Add Product
        </h2>
      </Col>
      <Col span={24}>
        <AddProductForm />
      </Col>
    </Row>
  );
}
