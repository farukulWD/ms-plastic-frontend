"use client";
import {
  useGetAllUserQuery,
  useUpdateRoleMutation,
} from "@/app/redux/features/auth/authApi";
import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import InputElement from "@/components/form/InputElement";
import SelectElement from "@/components/form/SelectElement";
import CommonModal from "@/components/modal/CommonModal";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Row, Space, Table, Tooltip, Pagination, Avatar } from "antd";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Admin() {
  const [filters, setFilters] = useState({ name: "", email: "", role: "" });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [updateRole, { data: upadatData, isSuccess }] = useUpdateRoleMutation();

  const handleEditShow = (record) => {
    setSelected(record);
    setEditRoleModalOpen(true);
  };
  const { data, isLoading, refetch } = useGetAllUserQuery({
    page,
    limit,
    ...filters,
  });
  const hanldeRoleEdit = async (data) => {
    const toasterId = toast.loading("Upadating role", {
      position: "top-center",
    });

    data.id = selected?._id;
    data.email = selected?.email;
    try {
      const result = await updateRole(data).unwrap();
      toast.success("Role update Success", {
        id: toasterId,
        position: "top-center",
      });
      setSelected(null);
      setEditRoleModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toasterId,
        position: "top-center",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (data?.data?.pagination?.total) {
      setTotal(data.data.pagination.total);
    }
  }, [data]);

  const columns = [
    {
      title: "Profile",
      dataIndex: "profilePicture",
      render: (profilePicture, record) => (
        <Space>
          <Avatar
            src={profilePicture}
            alt={record?.name}
            className="w-8 h-8 rounded-full"
          />
        </Space>
      ),
    },
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
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Role">
            <EditOutlined
              onClick={() => handleEditShow(record)}
              className="cursor-pointer"
              size={30}
            />
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
  const roleOption = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];
  return (
    <>
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

      <CommonModal
        isOpen={editRoleModalOpen}
        onClose={() => setEditRoleModalOpen(false)}
        footer={false}
        title={"Edit User Role"}
        mask={false}
      >
        <CustomForm onSubmit={hanldeRoleEdit} className="pt-5">
          <SelectElement
            options={roleOption}
            name={"role"}
            label={"Select role"}
          />
          <PrimaryButton
            className={"w-full"}
            type={"submit"}
            title={"Update User Role"}
            loading={isLoading}
          />
        </CustomForm>
      </CommonModal>
    </>
  );
}
