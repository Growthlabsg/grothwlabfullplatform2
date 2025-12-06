import { baseApi } from "@/store/baseApi";
import Cookies from "js-cookie";
import { setCredentials, logout } from "@/store/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/v1/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/v1/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { access_token, refresh_token } = data;
          Cookies.set("accessToken", access_token);
          Cookies.set("refreshToken", refresh_token);
          // Fetch user data
          dispatch(setCredentials({ user: null, accessToken: access_token }));
          // Optionally dispatch getMe to fetch user
        } catch (error) {
          // handle error
        }
      },
    }),
    refresh: builder.mutation({
      query: (body) => ({
        url: "/v1/auth/refresh",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/v1/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        } catch (error) {
          // handle error
        }
      },
    }),
    resendVerification: builder.mutation({
      query: (body) => ({
        url: "/v1/auth/resend-verification",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/v1/auth/verify-email",
        method: "POST",
        body,
      }),
    }),
    verifyEmailGet: builder.query({
      query: (token) => ({
        url: "/v1/auth/verify-email",
        params: { token },
      }),
    }),
    getMe: builder.query({
      query: () => "/v1/auth/me",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data,
              accessToken: Cookies.get("accessToken") || "",
            })
          );
        } catch (error) {
          // handle error
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useResendVerificationMutation,
  useVerifyEmailMutation,
  useVerifyEmailGetQuery,
  useGetMeQuery,
} = authApi;
