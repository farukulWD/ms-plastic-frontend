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
  }),
});

export const { useAddProductMutation } = productsApi;
