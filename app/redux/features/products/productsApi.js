import { baseApi } from "../baseApi/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "/product/add-product",
          method: "POST",
          body: productInfo,
        };
      },
    }),
    allProducts: builder.query({
      query: (arg) => {
        return {
          url: "/product/get-products",
          method: "GET",
          params: arg,
        };
      },
    }),
  }),
});

export const { useAddProductMutation, useAllProductsQuery } = productsApi;
