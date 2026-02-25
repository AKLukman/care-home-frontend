import type { TQueryParams, TResponseRedux } from "../../../types/global";
import type { TMarRecord } from "../../../types/medicationRecordTypes";
import { baseApi } from "../../api/baseApi";
import { apiTags } from "../../tag-types";


const medicationRecordApi = baseApi.injectEndpoints( {
    endpoints: ( builder ) => ( {

        getAllMediRecord: builder.query( {
            query: ( args ) => {
                const params = new URLSearchParams();
                if ( args ) {
                    args.forEach( ( item: TQueryParams ) => {
                        params.append( item.name, item.value as string );
                    } );
                }
                return {
                    url: "/medicationRecord/today",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [ apiTags.medicationRecord ],
            transformResponse: ( response: TResponseRedux<TMarRecord[]> ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        } ),

        updateStatus: builder.mutation( {
            query: ( { id, data } ) => ( {
                url: `/medicationRecord/${ id }`,
                method: "PATCH",
                body: data,
            } ),
            invalidatesTags: [ apiTags.medicationRecord ],
        } ),



    } )
} )

export const {
    // useGetAllMedicationRecordQuery,
    useGetAllMediRecordQuery,
    useUpdateStatusMutation

} = medicationRecordApi