"use client";
import { useGetAllUserQuery } from "@/app/redux/features/auth/authApi";
import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import InputElement from "@/components/form/InputElement";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Row, Space, Table, Tooltip, Pagination } from "antd";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

export default function Admin() {
  const [filters, setFilters] = useState({ name: "", email: "", role: "" });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useGetAllUserQuery({ page, limit, ...filters });

  useEffect(() => {
    if (data?.data?.pagination?.total) {
      setTotal(data.data.pagination.total);
    }
  }, [data]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => (
        <Space>{dayjs(createdAt).format("DD/MM/YYYY")}</Space>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (updatedAt) => (
        <Space>{dayjs(updatedAt).format("DD/MM/YYYY")}</Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (record) => (
        <Space>
          <Tooltip title="Edit Role">
            <EditOutlined className="cursor-pointer" size={30} />
          </Tooltip>
          <Tooltip title="Delete This user">
            <DeleteOutlined className="cursor-pointer text-red-500" size={30} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleFilter = (data) => {
    setFilters(data);
    setPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };

  return (
    <Row gutter={[0, 10]}>
      <Col span={24}>
        <h2 className="text-2xl font-medium text-right md:text-left text-white text-balance">
          All Users
        </h2>
      </Col>

      <Col span={24}>
        <CustomForm onSubmit={handleFilter}>
          <Row gutter={[10, 10]}>
            <Col span={24} lg={{ span: 6 }}>
              <InputElement
                name={"name"}
                type="text"
                placeholder={"Type Name"}
              />
            </Col>
            <Col span={24} lg={{ span: 6 }}>
              <InputElement
                name={"email"}
                type="text"
                placeholder={"Type Email"}
              />
            </Col>
            <Col span={24} lg={{ span: 6 }}>
              <InputElement
                name={"role"}
                type="text"
                placeholder={"Select Role"}
              />
            </Col>
            <Col span={24} lg={{ span: 6 }}>
              <PrimaryButton
                className={"w-full bg-green-color"}
                icon={<SearchOutlined />}
                type="submit"
                title={"Search"}
              />
            </Col>
          </Row>
        </CustomForm>
        <Table
          rowKey={(record) => record?._id}
          loading={isLoading}
          pagination={false}
          columns={columns}
          dataSource={data?.data?.users}
          bordered={false}
          scroll={{ x: 1000 }}
        />
      </Col>
      <Col span={24}>
        <Pagination
          total={total}
          current={page}
          pageSize={limit}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          onChange={handlePageChange}
        />
      </Col>
    </Row>
  );
}
