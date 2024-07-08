import { baseApi } from "../baseApi/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useLoginMutation, useGetAllUserQuery } = authApi;
