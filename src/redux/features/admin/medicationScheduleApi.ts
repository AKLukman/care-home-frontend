import type { TQueryParams, TResponseRedux } from "../../../types/global";
import type { TPatient } from "../../../types/userManagementType";
import { baseApi } from "../../api/baseApi";
import { apiTags } from "../../tag-types";

const medicationScheduleMangemetApi = baseApi.injectEndpoints( {
    endpoints: ( builder ) => ( {
        addSchedule: builder.mutation( {
            query: ( data ) => ( {
                url: "/medication-schedule",
                method: "POST",
                body: data
            } ),
            invalidatesTags: [ apiTags.schedule ]
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
        getMedicationScheduleById: builder.query( {
            query: ( id ) => ( {
                url: `/medication-schedule/${ id }`,
                method: "GET"
            } ),
            providesTags: [ apiTags.schedule ],
            transformResponse: ( response: TResponseRedux<string> ) => {
                return {
                    data: response.data,
                };
            },
        } ),
        getPatientMedicationScheduleById: builder.query( {
            query: ( id ) => ( {
                url: `/medication-schedule/${ id }`,
                method: "GET"
            } ),
            providesTags: [ apiTags.schedule ],
            transformResponse: ( response: TResponseRedux<any> ) => {
                return {
                    data: response.data,
                };
            },
        } ),
        deleteMedicationSchedule: builder.mutation( {
            query: ( id ) => ( {
                url: `/medication-schedule/${ id }`,
                method: "DELETE",
            } ),
            invalidatesTags: [ apiTags.schedule ]
        } ),
    } )
} )

export const {
    useAddScheduleMutation,
    useGetAllPatientQuery,
    useGetMedicationScheduleByIdQuery,
    useGetPatientMedicationScheduleByIdQuery,
    useDeleteMedicationScheduleMutation

} = medicationScheduleMangemetApi