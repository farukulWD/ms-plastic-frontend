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

    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/product/get-single-product/${id}`,
          method: "GET",
        };
      },
    }),

    updateProduct: builder.mutation({
      query: (arg) => {
        const { id, data } = arg;
        return {
          url: `/product/edit-product/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: "/product/delete-product",
          method: "DELETE",
          body: id,
        };
      },
    }),
  }),
});

export const {
  useAddProductMutation,
  useAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
