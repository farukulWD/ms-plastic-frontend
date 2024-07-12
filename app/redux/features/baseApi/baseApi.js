import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setUser } from "../auth/authSlice";
import RemoveCookie from "@/components/common/RemoveCookie";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;
    if (token) {
      headers.set("authorization", token);
    }

    return headers;
  },
});

const customBaseQueryWithRefreshToken = async (arg, api, extraOption) => {
  let result = await baseQuery(arg, api, extraOption);
  if (result?.error?.status === 404) {
    toast.error(result.error.data.message);
  }
  if (result?.error?.status === 403) {
    toast.error(result.error.data.message);
  }

  if (result?.error?.status === 401) {
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = api.getState().user.user;
      api.dispatch(setUser({ user, token: data?.data?.accessToken }));
      result = await baseQuery(arg, api, extraOption);
    } else {
      api.dispatch(logOut());
      RemoveCookie("refreshToken");
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQueryWithRefreshToken,
  endpoints: () => ({}),
});
