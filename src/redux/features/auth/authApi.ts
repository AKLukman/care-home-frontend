import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints( {
    endpoints: ( builder ) => ( {
        login: builder.mutation( {
            query: ( userInfo ) => ( {
                url: "/auth/login",
                method: "POST",
                body: userInfo,
            } ),
        } ),
        changePassword: builder.mutation( {
            query: ( data ) => ( {
                url: "/auth/change-password",
                method: "POST",
                body: data
            } )
        } ),
        forgotPassword: builder.mutation( {
            query: ( data ) => ( {
                url: "/auth/forget-password",
                method: "POST",
                body: data
            } )
        } ),
        resetPassword: builder.mutation( {
            query: ( { email, token, newPassword } ) => ( {
                url: "/auth/reset-password",
                method: "POST",
                body: { email, newPassword },
                headers: {
                    Authorization: token,
                },
            } ),
        } ),

    } ),
} );

export const {
    useLoginMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} =
    authApi;