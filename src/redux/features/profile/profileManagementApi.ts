import type { TResponseRedux } from "../../../types/global";
import type { TCareworker } from "../../../types/userManagementType";
import { baseApi } from "../../api/baseApi";


const profileManagementApi = baseApi.injectEndpoints( {
    endpoints: ( builder ) => ( {

        getMe: builder.query( {
            query: () => ( {
                url: `/users/me`,
                method: "GET"
            } ),
            transformResponse: ( response: TResponseRedux<TCareworker> ) => {
                return {
                    data: response.data,
                };
            },
        } ),
        changePassword: builder.mutation( {
            query: ( data ) => ( {
                url: "/auth/change-password",
                method: "POST",
                body: data,
            } ),

        } ),
    } ),

} );
export const {
    useGetMeQuery

} =
    profileManagementApi;