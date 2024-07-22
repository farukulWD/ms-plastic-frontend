"use client";

import { useAllProductsQuery } from "@/app/redux/features/products/productsApi";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function GroupProduct() {
  const pathname = useParams();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    name: "",
    code: "",
    company: "",

    sort: "newest",
  });

  const { data, isLoading, refetch } = useAllProductsQuery(
    {
      page,
      limit,
      ...filters,
      groupName: pathname?.group,
    },
    { skip: !pathname?.group }
  );
  console.log(data);
  return <div>GroupProduct</div>;
}
