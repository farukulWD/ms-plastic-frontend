"use client";
import { useAllProductsQuery } from "@/app/redux/features/products/productsApi";
import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import InputElement from "@/components/form/InputElement";
import SelectElement from "@/components/form/SelectElement";
import { companyOptions, groupOptions } from "@/utils/all-options/options";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Flex, Pagination, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

export default function AllProduct() {
  const [filters, setFilters] = useState({
    name: "",
    code: "",
    company: "",
    groupName: "",
  });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useAllProductsQuery({
    page,
    limit,
    ...filters,
  });
  const handleFilter = (data) => {
    setFilters(data);
    setPage(1);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
    },

    {
      title: "Group Name",
      dataIndex: "groupName",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      render: (addedBy) => (
        <div>
          <p>{addedBy?.name}</p>
          <p>{addedBy?.role}</p>
        </div>
      ),
    },
  ];

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };
  useEffect(() => {
    if (data?.data?.pagination?.total) {
      setTotal(data.data.pagination.total);
    }
  }, [data]);

  return (
    <Row gutter={[0, 10]}>
      <Col span={24}>
        <h2 className="text-2xl font-medium text-right md:text-left text-white text-balance">
          All Products
        </h2>
      </Col>

      <Col span={24}>
        <CustomForm onSubmit={handleFilter}>
          <Row gutter={[10, 10]}>
            <Col span={24} lg={{ span: 5 }}>
              <InputElement
                name={"name"}
                type="text"
                placeholder={"Type Name"}
              />
            </Col>
            <Col span={24} lg={{ span: 5 }}>
              <InputElement
                name={"code"}
                type="text"
                placeholder={"Product code"}
              />
            </Col>
            <Col span={24} lg={{ span: 5 }}>
              <SelectElement
                name={"groupName"}
                options={groupOptions}
                placeholder={"Select Group Name"}
              />
            </Col>
            <Col span={24} lg={{ span: 5 }}>
              <SelectElement
                name={"company"}
                options={companyOptions}
                placeholder={"Select Compnay name"}
              />
            </Col>
            <Col span={24} lg={{ span: 4 }}>
              <PrimaryButton
                className={"w-full bg-blue-color"}
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
          dataSource={data?.data?.products}
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
