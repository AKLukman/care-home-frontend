import type { TQueryParams, TResponseRedux } from "../../../types/global";
import type { TAdmin, TCareworker } from "../../../types/userManagementType";
import { baseApi } from "../../api/baseApi";
import { apiTags } from "../../tag-types";


const userManagementApi = baseApi.injectEndpoints( {
    endpoints: ( builder ) => ( {
        addAdmin: builder.mutation( {
            query: ( data ) => ( {
                url: "/users/create-admin",
                method: "POST",
                body: data,
            } ),
            invalidatesTags: [ apiTags.admin ],
        } ),

        getAllAdmin: builder.query( {
            query: ( args ) => {
                const params = new URLSearchParams();
                if ( args ) {
                    args.forEach( ( item: TQueryParams ) => {
                        params.append( item.name, item.value as string );
                    } );
                }
                return {
                    url: "/admin",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [ apiTags.admin ],
            transformResponse: ( response: TResponseRedux<TAdmin[]> ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        } ),
        addCareworker: builder.mutation( {
            query: ( data ) => ( {
                url: "/users/create-careWorker",
                method: "POST",
                body: data,
            } ),
            invalidatesTags: [ apiTags.careWorker ],
        } ),
        getAllCareworkers: builder.query( {
            query: ( args ) => {
                const params = new URLSearchParams();
                if ( args ) {
                    args.forEach( ( item: TQueryParams ) => {
                        params.append( item.name, item.value as string );
                    } );
                }
                return {
                    url: "/care-worker",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [ apiTags.careWorker ],
            transformResponse: ( response: TResponseRedux<TCareworker[]> ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        } ),
        getCareWorkerById: builder.query( {
            query: ( id ) => ( {
                url: `/care-worker/${ id }`,
                method: "GET"
            } ),
            providesTags: [ apiTags.careWorker ],
            transformResponse: ( response: TResponseRedux<TCareworker> ) => {
                return {
                    data: response.data,
                };
            },
        } ),
        deleteCareWorker: builder.mutation( {
            query: ( id ) => ( {
                url: `/care-worker/${ id }`,
                method: "DELETE",
            } ),
            invalidatesTags: [ apiTags.careWorker ]
        } ),
    } ),

} );
export const {
    useAddAdminMutation,
    useGetAllAdminQuery,
    useAddCareworkerMutation,
    useGetAllCareworkersQuery,
    useGetCareWorkerByIdQuery,
    useDeleteCareWorkerMutation,

} =
    userManagementApi;