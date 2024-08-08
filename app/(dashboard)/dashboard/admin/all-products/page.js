"use client";
import {
  useAllProductsQuery,
  useDeleteProductMutation,
} from "@/app/redux/features/products/productsApi";
import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import InputElement from "@/components/form/InputElement";
import SelectElement from "@/components/form/SelectElement";
import { companyOptions, groupOptions } from "@/utils/all-options/options";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Pagination, Popconfirm, Row, Space, Table, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AllProduct() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    company: "",
    groupName: "",
  });

  const Router = useRouter();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useAllProductsQuery({
    page,
    ...filters,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const handleFilter = (data) => {
    setFilters(data);
    setPage(1);
  };

  const handleDelete = async (id) => {
    const toasterId = toast.loading("Deleting", { position: "top-center" });
    try {
      const res = await deleteProduct({ id }).unwrap();
      if (res?.error) {
        toast.error(res?.error?.data?.message, {
          id: toasterId,
          duration: 2000,
        });
      } else {
        toast.success("The product delete has been success", {
          id: toasterId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toasterId,
        duration: 2000,
      });
    }
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
      render: (groupName) => <span className="capitalize">{groupName}</span>,
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
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit This product">
            <EditOutlined
              onClick={() =>
                Router.push(`/dashboard/admin/edit-product/?id=${record?._id}`)
              }
              className="cursor-pointer"
              size={30}
            />
          </Tooltip>

          <Tooltip title="Delete This Product">
            <Popconfirm
              title="Are you sure!"
              description="Do you want to delete this This product"
              onConfirm={() => handleDelete(record?._id)}
            >
              <DeleteOutlined
                className="cursor-pointer text-red-500"
                size={30}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
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
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <h2 className="text-2xl font-medium text-right md:text-left text-white text-balance">
            All Products
          </h2>
          <PrimaryButton
            onClick={() => Router.push("/dashboard/admin/add-product")}
            title={"Add Product"}
            icon={<PlusCircleOutlined />}
          />
        </div>
      </Col>

      <Col span={24}>
        <CustomForm onSubmit={handleFilter}>
          <Row gutter={[10, 10]}>
            <Col span={24} lg={{ span: 7 }}>
              <InputElement
                name={"searchTerm"}
                type="text"
                placeholder={"Name or Code"}
              />
            </Col>

            <Col span={24} lg={{ span: 7 }}>
              <SelectElement
                name={"groupName"}
                options={groupOptions}
                placeholder={"Select Group Name"}
                defaultValue={"All Group"}
              />
            </Col>
            <Col span={24} lg={{ span: 7 }}>
              <SelectElement
                name={"company"}
                options={companyOptions}
                placeholder={"Select Compnay name"}
                defaultValue={"All Company"}
              />
            </Col>

            <Col span={24} lg={{ span: 3 }}>
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
          pageSize={data?.data?.pagination?.limit}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          onChange={handlePageChange}
        />
      </Col>
    </Row>
  );
}
