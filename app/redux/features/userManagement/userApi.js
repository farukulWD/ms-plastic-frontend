const { baseApi } = require("../baseApi/baseApi");

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => {
        return {
          url: `/user/user/${id}`,
          method: "GET",
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
      providesTags: ["allUsers"],
    }),
    updateRole: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user/update-user-role",
          method: "PATCH",
          body: userInfo,
        };
      },
      invalidatesTags: ["allUsers"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: "/user/delete-user",
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["allUsers"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useUpdateRoleMutation,
} = userApi;
