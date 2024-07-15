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
    forgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: email,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
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
    updateRole: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user/update-user-role",
          method: "PATCH",
          body: userInfo,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useGetAllUserQuery,
  useResetPasswordMutation,
  useUpdateRoleMutation,
} = authApi;
