import { baseApi } from "../baseApi/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (data) => {
        return {
          url: "/cart/add-cart",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["allCarts"],
    }),

    getCarts: builder.query({
      query: (arg) => {
        return {
          url: "/cart/get-carts",
          method: "GET",
          params: arg,
        };
      },
      providesTags: ["allCarts"],
    }),

    getSingleCart: builder.query({
      query: (id) => {
        return {
          url: `cart/get-single-cart/${id}`,
          method: "GET",
        };
      },
    }),

    deleteCart: builder.mutation({
      query: (id) => {
        return {
          url: "/cart/delete-cart",
          method: "DELETE",
          body: { id: id },
        };
      },
      invalidatesTags: ["allCarts"],
    }),
  }),
});

export const {
  useAddCartMutation,
  useGetCartsQuery,
  useDeleteCartMutation,
  useGetSingleCartQuery,
} = cartApi;
