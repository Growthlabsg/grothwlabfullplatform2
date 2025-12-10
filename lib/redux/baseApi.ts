import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

// Create a mutex to prevent multiple refresh token requests
const mutex = new Mutex();

// Base URL from Authentication.md
const BASE_URL = "http://localhost:8888/api";

// Define the refresh token response type
interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// Custom base query with refresh token logic
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state first, then fall back to localStorage
      let token = (getState() as any).auth?.accessToken;

      // If no token in Redux state, check localStorage
      if (!token && typeof window !== "undefined") {
        token = localStorage.getItem("accessToken");
      }

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // Only set Content-Type if not already set (preserve endpoint-specific headers)
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  })(args, api, extraOptions);

  // If we get a 401, try to refresh the token
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // Get refresh token from Redux state first, then localStorage
        let refreshToken = (api.getState() as any).auth?.refreshToken;
        if (!refreshToken && typeof window !== "undefined") {
          refreshToken = localStorage.getItem("refreshToken");
        }

        if (refreshToken) {
          // Try to refresh the token
          const refreshResult = await fetchBaseQuery({
            baseUrl: BASE_URL,
          })(
            {
              url: "/v1/auth/refresh",
              method: "POST",
              body: { refresh_token: refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const refreshData = refreshResult.data as RefreshTokenResponse;

            // Store the new tokens in Redux and localStorage
            api.dispatch({
              type: "auth/setTokens",
              payload: {
                accessToken: refreshData.access_token,
                refreshToken: refreshData.refresh_token,
                expiresIn: refreshData.expires_in,
              },
            });

            // Also store in localStorage for persistence
            if (typeof window !== "undefined") {
              localStorage.setItem("accessToken", refreshData.access_token);
              localStorage.setItem("refreshToken", refreshData.refresh_token);
            }

            // Retry the original request with new token
            result = await fetchBaseQuery({
              baseUrl: BASE_URL,
              prepareHeaders: (headers) => {
                headers.set(
                  "Authorization",
                  `Bearer ${refreshData.access_token}`
                );
                headers.set("Content-Type", "application/json");
                return headers;
              },
            })(args, api, extraOptions);
          } else {
            // Refresh failed, logout user
            api.dispatch({ type: "auth/logout" });
          }
        } else {
          // No refresh token, logout user
          api.dispatch({ type: "auth/logout" });
        }
      } finally {
        release();
      }
    } else {
      // Wait for the mutex to be released and retry
      await mutex.waitForUnlock();
      result = (await baseQueryWithReauth(
        args,
        api,
        extraOptions
      )) as typeof result;
    }
  }

  return result;
};

// Create the base API
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "Auth",
    "Feed",
    "Post",
    "Comments",
    "Pages",
    "Page",
    "PageMembers",
    "PricingTiers",
    "OfficeLocations",
    "Milestones",
    "SavedPosts",
    "ConnectionRecommendations",
    "TrendingTopics",
  ],
});

// Export the base API hooks
export const { usePrefetch } = baseApi;
