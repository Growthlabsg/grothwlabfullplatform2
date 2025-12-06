import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "@/store/authSlice";
import { RootState } from "@/store";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.accessToken || Cookies.get("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/v1/auth/refresh",
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // store the new token
        const { access_token, refresh_token } = refreshResult.data as any;
        Cookies.set("accessToken", access_token);
        Cookies.set("refreshToken", refresh_token);
        // update state
        api.dispatch(
          setCredentials({
            user: (api.getState() as RootState).auth.user,
            accessToken: access_token,
          })
        );
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // refresh failed, logout
        api.dispatch(logout());
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
