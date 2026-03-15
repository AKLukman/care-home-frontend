import type { TResponseRedux } from "../../../types/global";
import type { TCareworker } from "../../../types/userManagementType";
import { baseApi } from "../../api/baseApi";
import { apiTags } from "../../tag-types";


const profileManagementApi = baseApi.injectEndpoints( {
    endpoints: ( builder ) => ( {

        getMe: builder.query( {
            query: () => ( {
                url: `/users/me`,
                method: "GET"
            } ),
            providesTags: [ apiTags.profile ],
            transformResponse: ( response: TResponseRedux<TCareworker> ) => {
                return {
                    data: response.data,
                };
            },
        } ),

        updateProfile: builder.mutation( {
            query: ( data ) => ( {
                url: "/users/updateProfile",
                method: "PATCH",
                body: data,
            } ),
            invalidatesTags: [ apiTags.profile ]

        } ),
    } ),

} );
export const {
    useGetMeQuery,
    useUpdateProfileMutation

} =
    profileManagementApi;