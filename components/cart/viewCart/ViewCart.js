"use client";
import { useGetSingleCartQuery } from "@/app/redux/features/cartManagement/cartApi";
import { Col, Flex, Row } from "antd";
import dayjs from "dayjs";
import React from "react";

function ViewCart({ id }) {
  const { data } = useGetSingleCartQuery(id, { skip: !id });

  return (
    <Row
      gutter={[0, 10]}
      className="w-full max-w-[762px] p-3 rounded-lg mx-auto bg-white"
    >
      <Col span={24} className="text-black-secondary text-center">
        <h1 className="text-black-secondary text-2xl  font-semibold">
          Masnun Plastic Gallery
        </h1>
        <p>Korora, Noyapara, Madhabpur, Hobiganj</p>
        <Flex gap={10} justify="center">
          <p>
            <span className="font-semibold">Dealer:</span> RFL
          </p>
          <p>
            <span className="font-semibold">Phone:</span> 01747296382
          </p>
        </Flex>
      </Col>
      <Col className="text-black-secondary" span={24}>
        <h3>Name: {data?.data?.cartName}</h3>
        <p>Date: {dayjs(new Date()).format("DD/MM/YYYY")} </p>
      </Col>
    </Row>
  );
}

export default ViewCart;
