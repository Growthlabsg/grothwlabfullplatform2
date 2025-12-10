// Redux store and configuration
export { store } from "./store";
export type { RootState, AppDispatch } from "./store";

// Hooks
export { useAppDispatch, useAppSelector } from "./hooks";

// API
export { baseApi } from "./baseApi";
export { authApi } from "./authApi";
export { feedApi } from "./feedApi";
export { pagesApi } from "./pagesApi";

// Auth API hooks
export {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useResendVerificationMutation,
  useVerifyEmailMutation,
  useGetCurrentUserQuery,
} from "./authApi";

// Feed API hooks
export {
  useGetFeedQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useGetPostCommentsQuery,
  useCreateCommentMutation,
  useUploadFileMutation,
  useAddPostAttachmentMutation,
  useRemovePostAttachmentMutation,
  useSavePostMutation,
  useReportPostMutation,
  useLikeCommentMutation,
} from "./feedApi";

// Pages API hooks
export {
  useGetMyPagesQuery,
  useGetPageQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
  useGetCurrentContextQuery,
  useGetPageMembersQuery,
  useAddPageMemberMutation,
  useUpdatePageMemberMutation,
  useRemovePageMemberMutation,
  useToggleFollowPageMutation,
  useGetPageFollowersQuery,
  useGetPagePricingTiersQuery,
  useAddPricingTierMutation,
  useUpdatePricingTierMutation,
  useDeletePricingTierMutation,
  useGetPageOfficesQuery,
  useAddOfficeLocationMutation,
  useUpdateOfficeLocationMutation,
  useDeleteOfficeLocationMutation,
  useGetPageMilestonesQuery,
  useAddMilestoneMutation,
  useUpdateMilestoneMutation,
  useDeleteMilestoneMutation,
  useGetUserStatsQuery,
  useGetPageStatsQuery,
  useGetUserProfileQuery,
  useGetUserPostsQuery,
  useGetPagePostsQuery,
  useGetPageAnalyticsQuery,
  useToggleFollowUserMutation,
  useSendConnectionRequestMutation,
} from "./pagesApi";

// Auth slice
export { default as authReducer } from "./authSlice";
export * from "./authSlice";

// Provider
export { ReduxProvider } from "./ReduxProvider";

// Types
export * from "./types";
