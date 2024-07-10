import { baseApi } from "../baseApi/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user/create-user",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    getAllUser: builder.query({
      query: (query) => {
        return {
          url: "/user/users",
          method: "GET",
          params: query,
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetAllUserQuery } =
  authApi;
