import ViewCart from "@/components/cart/viewCart/ViewCart";
import { Col, Row } from "antd";
import React from "react";

export default function ViewCartPage({ params }) {
  return (
    <Row>
      <Col span={24}>
        <ViewCart id={params?.id} />
      </Col>
    </Row>
  );
}
