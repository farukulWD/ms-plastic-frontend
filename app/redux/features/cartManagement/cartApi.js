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
    }),

    getCarts: builder.query({
      query: (arg) => {
        return {
          url: "/cart/get-carts",
          method: "GET",
          params: arg,
        };
      },
    }),
  }),
});

export const { useAddCartMutation, useGetCartsQuery } = cartApi;
