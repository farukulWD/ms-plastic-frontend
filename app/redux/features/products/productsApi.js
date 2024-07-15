const { baseApi } = require("../baseApi/baseApi");

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "/product/add-product",
          methot: "POST",
          body: productInfo,
        };
      },
    }),
  }),
});

export const { useAddProductMutation } = productsApi;
