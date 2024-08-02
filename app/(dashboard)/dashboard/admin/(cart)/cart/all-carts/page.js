"use client";
import {
  useDeleteCartMutation,
  useGetCartsQuery,
} from "@/app/redux/features/cartManagement/cartApi";
import PrimaryButton from "@/components/common/PrimaryButton";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Col,
  Flex,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AllCarts() {
  const Router = useRouter();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useGetCartsQuery();
  const [deleteCart] = useDeleteCartMutation();

  const handleDelete = async (id) => {
    const tosterId = toast.loading("Deleting");
    try {
      const res = await deleteCart(id);
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 200, id: tosterId });
      } else {
        toast.success("Cart deleted success", { duration: 2000, id: tosterId });
      }
    } catch (error) {
      toast.error(error?.data?.message, { id: tosterId });
    }
  };

  const columns = [
    {
      title: "Cart Name",
      dataIndex: "cartName",
      key: "cartName",
    },

    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "Created By",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <Flex gap={6} align="center">
          <Avatar
            src={user?.profilePicture}
            size={20}
            alt={user?.name}
          ></Avatar>{" "}
          <p>{user?.name}</p>
        </Flex>
      ),
    },

    {
      title: "Total Products",
      dataIndex: "products",
      key: "products",
      render: (products) => <span>{products?.length}</span>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `${price} TK`, // Assuming currency symbol ₹
    },
    {
      title: "Is Order",
      dataIndex: "isOrder",
      key: "isOrder",
      render: (isOrder) => (isOrder ? "Yes" : "No"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Flex gap={10}>
          <Tooltip title="View Cart">
            <EyeOutlined
              onClick={() =>
                Router.push(`/dashboard/admin/cart/${record?._id}`)
              }
              className="2xl cursor-pointer"
            />
          </Tooltip>
          <Tooltip title="Edit Cart">
            <EditOutlined className="2xl cursor-pointer" />
          </Tooltip>
          <Tooltip title="Delete Product">
            <Popconfirm
              title="Are you sure!"
              description="Do you want to delete this This cart"
              onConfirm={() => handleDelete(record?._id)}
            >
              <DeleteOutlined className="2xl text-red-500 cursor-pointer" />
            </Popconfirm>
          </Tooltip>
        </Flex>
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
            onClick={() => Router.push("/dashboard/admin/add-to-cart")}
            title={"Add Cart"}
            icon={<PlusCircleOutlined />}
          />
        </div>
      </Col>

      <Col span={24}>
        <Table
          rowKey={(record) => record?._id}
          loading={isLoading}
          pagination={false}
          columns={columns}
          dataSource={data?.data?.carts}
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
