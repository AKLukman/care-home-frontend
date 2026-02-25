import type { TQueryParams, TResponseRedux } from "../../../types/global";
import type { TMedication } from "../../../types/medicationTypes";
import { baseApi } from "../../api/baseApi";
import { apiTags } from "../../tag-types";

const medicationMangemetApi = baseApi.injectEndpoints( {
    endpoints: ( builder ) => ( {
        addMedication: builder.mutation( {
            query: ( data ) => ( {
                url: "/medication",
                method: "POST",
                body: data
            } ),
            invalidatesTags: [ apiTags.medication ]
        } ),
        getAllMedication: builder.query( {
            query: ( args ) => {
                const params = new URLSearchParams();
                if ( args ) {
                    args.forEach( ( item: TQueryParams ) => {
                        params.append( item.name, item.value as string );
                    } );
                }
                return {
                    url: "/medication",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [ apiTags.medication ],
            transformResponse: ( response: TResponseRedux<TMedication[]> ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        } ),
    } )
} )

export const {
    useAddMedicationMutation,
    useGetAllMedicationQuery
} = medicationMangemetApi