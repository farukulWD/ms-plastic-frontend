"use client";

import { useAddCartMutation } from "@/app/redux/features/cartManagement/cartApi";
import { useAllProductsQuery } from "@/app/redux/features/products/productsApi";
import PrimaryButton from "@/components/common/PrimaryButton";
import CustomForm from "@/components/form/CustomForm";
import InputElement from "@/components/form/InputElement";
import CommonModal from "@/components/modal/CommonModal";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Flex, Input, Pagination, Row, Space, Table, Tooltip } from "antd";
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
  const [cartName, setCartName] = useState("");

  // ! for modal start
  const [isShowModal, setIsShowModal] = useState(false);

  // ! modal end
  const [filters, setFilters] = useState({
    name: "",
    code: "",
  });
  const [addCart] = useAddCartMutation();
  const { data, isLoading } = useAllProductsQuery(
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
          {checkExisting(record?._id) ? (
            <Tooltip title={"Delete from cart"}>
              <DeleteOutlined
                className="text-xl text-red-500"
                onClick={() => handleRemoveFromCart(record?._id)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Add to Cart">
              <PlusCircleOutlined
                className="text-xl"
                onClick={() => handleCartProduct(record)}
              />
            </Tooltip>
          )}
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

  const checkExisting = (id) => {
    const exit = cartProduct?.find((p) => p?._id === id);
    return exit;
  };

  const handleCartProduct = (product) => {
    if (checkExisting(product?._id)) {
      return toast.warning("This product already added", {
        duration: 2000,
        position: "top-center",
      });
    } else {
      setCartProduct((pre) => {
        return [...pre, product];
      });
    }
  };

  const handleRemoveFromCart = (id) => {
    const getExistingProductAfterDelete = cartProduct.filter(
      (p) => p?._id !== id
    );
    setCartProduct(getExistingProductAfterDelete);
  };

  const handleAddToCard = async () => {
    if (!cartName) {
      return toast.error("Cart Name is required", { position: "top-center" });
    }

    const products = await productData?.reduce((acc, item) => {
      if (item) {
        const { product, quantity } = item;
        acc.push({
          product: product,
          quantity: quantity,
        });
      }
      return acc;
    }, []);

    const cartBody = {
      products: products,
      cartName: cartName,
      user: user?._id,
      groupName: pathname?.group,
    };
    const tosterId = toast.loading("Cart creating");
    try {
      const res = await addCart(cartBody);

      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 200, id: tosterId });
      } else {
        toast.success("Cart created success", { duration: 2000, id: tosterId });
        setIsShowModal(false);
        setProductData([]), setCartProduct([]);
      }
    } catch (error) {
      toast.error(error?.data?.message, { duration: 2000, id: tosterId });
    }
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
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <h2 className="text-2xl font-medium text-right md:text-left text-white text-balance">
            Products of <span className="capitalize">{pathname?.group}</span>{" "}
            group
          </h2>
          {productData.length > 0 && (
            <PrimaryButton
              onClick={() => setIsShowModal(true)}
              title={"Show and Process"}
            />
          )}
        </div>
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
          <Row className="pt-5" gutter={[10, 10]}>
            <Col span={24}>
              <Input
                name={"cartName"}
                label={"Cart Name"}
                placeholder={"Cart Name"}
                className="outline-none placeholder:text-gray-400 border-none text-white focus:bg-gray-700 hover:bg-gray-700 focus:border-none focus-within:shadow-none focus-within:border-none focus:outline-none rounded-lg py-3 px-4 h-full w-full bg-gray-700 focus-within:bg-gray-700"
                onChange={(e) => setCartName(e.target.value)}
              ></Input>
            </Col>
            <Col span={24}>
              <Row gutter={[0, 10]}>
                {productData?.map((p) => (
                  <Col key={p?.product} span={24}>
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
                ))}
              </Row>
              <Col className="mt-3 flex justify-end" span={24}>
                <PrimaryButton
                  onClick={() => handleAddToCard("This is cart name")}
                  title={"Confirm"}
                />
              </Col>
            </Col>
          </Row>
        }
      />
    </Row>
  );
}
