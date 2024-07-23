"use client";

import { useAllProductsQuery } from "@/app/redux/features/products/productsApi";
import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import InputElement from "@/components/form/InputElement";
import CommonModal from "@/components/modal/CommonModal";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Flex, Pagination, Row, Space, Table, Tooltip } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function GroupProduct() {
  const { user } = useSelector((state) => state.user);
  const [productData, setProductData] = useState([]);
  const pathname = useParams();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [cartProduct, setCartProduct] = useState([]);

  // ! for modal
  const [isShowModal, setIsShowModal] = useState(false);

  // ! modal end
  const [filters, setFilters] = useState({
    name: "",
    code: "",
  });

  const { data, isLoading, refetch } = useAllProductsQuery(
    {
      page,
      limit,
      ...filters,
      groupName: pathname?.group,
      sort: "newest",
    },
    { skip: !pathname?.group }
  );

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
          <Tooltip title="Add to Cart">
            <PlusCircleOutlined
              className="text-xl"
              onClick={() => handleCartProduct(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    if (data?.data?.pagination?.total) {
      setTotal(data.data.pagination.total);
    }
  }, [data]);

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };
  const handleFilter = (data) => {
    setFilters(data);
    setPage(1);
  };

  const handleCartProduct = (product) => {
    const existing = cartProduct?.find((p) => p?._id === product?._id);
    if (existing) {
      return toast.warning("This product already added", { duration: 2000 });
    } else {
      setCartProduct((pre) => {
        return [...pre, product];
      });
    }
  };

  const handleAddToCard = async () => {
    setIsShowModal(true);
  };

  useEffect(() => {
    const converPorduct = cartProduct?.reduce((acc, item) => {
      if (item) {
        const { _id, name, quantity } = item;
        acc.push({
          productName: name,
          productQuantity: quantity,
          product: _id,
          quantity: 1,
        });
      }
      return acc;
    }, []);
    setProductData(converPorduct);
  }, [cartProduct]);

  const updateQuantity = (id, operator) => {
    const findProduct = productData.find((p) => p?.product === id);
    const findIndex = productData.findIndex((x) => x?.product == id);
    const copyProducts = [...productData];
    if (operator === "+") {
      copyProducts[findIndex] = {
        ...copyProducts[findIndex],
        quantity: findProduct.quantity + 1,
      };
    } else {
      copyProducts[findIndex] = {
        ...copyProducts[findIndex],
        quantity: findProduct.quantity - 1,
      };
    }

    setProductData(copyProducts);
  };

  return (
    <Row gutter={[0, 10]}>
      <Col className="mb-3" span={24}>
        <h2 className="text-2xl font-medium text-right md:text-left text-white text-balance">
          Products of <span className="capitalize">{pathname?.group}</span>{" "}
          group
        </h2>
        <PrimaryButton onClick={() => handleAddToCard()} title={"Save Cart"} />
      </Col>

      <Col span={24}>
        <CustomForm onSubmit={handleFilter}>
          <Row gutter={[10, 10]}>
            <Col span={24} lg={{ span: 8 }}>
              <InputElement
                name={"name"}
                type="text"
                placeholder={"Type Name"}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }}>
              <InputElement
                name={"code"}
                type="text"
                placeholder={"Product code"}
              />
            </Col>

            <Col span={24} lg={{ span: 8 }}>
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

      <CommonModal
        isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
        footer={false}
        mask={false}
        children={
          <Row>
            <Col span={24}>
              {productData?.map((p) => (
                <Row key={p?.product}>
                  <Col className="pt-5" span={24}>
                    <Flex justify="space-between" align="center">
                      <p>{p?.productName}</p>
                      <div className="flex gap-2 justify-between items-center">
                        <PrimaryButton
                          onClick={() => updateQuantity(p?.product, "-")}
                          icon={<MinusCircleOutlined />}
                        />
                        <p className="">{p?.quantity}</p>
                        <PrimaryButton
                          onClick={() => updateQuantity(p?.product, "+")}
                          icon={<PlusCircleOutlined />}
                        />
                      </div>
                    </Flex>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        }
      />
    </Row>
  );
}
