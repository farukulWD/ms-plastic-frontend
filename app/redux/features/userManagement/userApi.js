const { baseApi } = require("../baseApi/baseApi");

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `/user/user/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
