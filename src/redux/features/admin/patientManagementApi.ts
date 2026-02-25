import type { TQueryParams, TResponseRedux } from "../../../types/global";
import type { TPatient } from "../../../types/userManagementType";
import { baseApi } from "../../api/baseApi";
import { apiTags } from "../../tag-types";

const patientMangemetApi = baseApi.injectEndpoints( {
    endpoints: ( builder ) => ( {
        addPatient: builder.mutation( {
            query: ( data ) => ( {
                url: "/patient/create-patient",
                method: "POST",
                body: data
            } ),
            invalidatesTags: [ apiTags.patient ]
        } ),
        getAllPatient: builder.query( {
            query: ( args ) => {
                const params = new URLSearchParams();
                if ( args ) {
                    args.forEach( ( item: TQueryParams ) => {
                        params.append( item.name, item.value as string );
                    } );
                }
                return {
                    url: "/patient",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [ apiTags.patient ],
            transformResponse: ( response: TResponseRedux<TPatient[]> ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        } ),
        getPatientById: builder.query( {
            query: ( id ) => ( {
                url: `/patient/${ id }`,
                method: "GET"
            } ),
            providesTags: [ apiTags.careWorker ],
            transformResponse: ( response: TResponseRedux<TPatient> ) => {
                return {
                    data: response.data,
                };
            },
        } ),

    } )
} )

export const {
    useAddPatientMutation,
    useGetAllPatientQuery,
    useGetPatientByIdQuery,

} = patientMangemetApi