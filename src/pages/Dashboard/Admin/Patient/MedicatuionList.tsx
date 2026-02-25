import { useState } from "react";
import { useDeleteMedicationScheduleMutation, useGetPatientMedicationScheduleByIdQuery } from "../../../../redux/features/admin/medicationScheduleApi";
import dateFormat from "../../../../utils/dateFormat";
import Swal from "sweetalert2";
import EditMedicationSchedule from "../Medication/EditMedicationSchedule";

const MedicationList = ( { patientId }: { patientId: string } ) => {
    const [ isModalOpen, setIsModalOpen ] = useState( false );
    const [ selectedScheduleId, setSelectedScheduleId ] = useState<string | null>( null );
    const { data, isLoading } = useGetPatientMedicationScheduleByIdQuery( patientId )
    const [ deleteSchedule ] = useDeleteMedicationScheduleMutation()
    const patientMedicationSchedules = data?.data

    if ( isLoading ) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const handleDelete = async ( id: string ) => {
        try {
            const result = await Swal.fire( {
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            } );

            if ( result.isConfirmed ) {
                const res = await deleteSchedule( id );

                if ( res.data.deletedCount > 0 ) {
                    await Swal.fire( {
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    } );
                }

                console.log( res );
            }
        } catch ( error ) {
            console.error( error );
        }
    };



    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Dosage</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {patientMedicationSchedules?.length > 0 ? (
                        patientMedicationSchedules.map( ( medicationSchedule ) => (
                            <tr key={medicationSchedule?._id}>
                                <td>{medicationSchedule.medication?.name}</td>
                                <td>
                                    <div className="flex flex-wrap gap-2">
                                        {medicationSchedule?.doses.map( ( d, index ) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700"
                                            >
                                                {d.time}: {d.dose}
                                            </span>
                                        ) )}
                                    </div>
                                </td>
                                <td>{dateFormat( medicationSchedule?.startDate )}</td>
                                <td>{dateFormat( medicationSchedule?.endDate )}</td>
                                <td><button className="btn btn-secondary"
                                    onClick={() => {
                                        setSelectedScheduleId( medicationSchedule?._id );
                                        setIsModalOpen( true );
                                    }}>
                                    EDIT
                                </button>
                                </td>
                                <td><button className="btn btn-error" onClick={() => handleDelete( medicationSchedule?._id )}>DELETE</button>

                                </td>

                            </tr>
                        ) )
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-6 text-red-500">
                                This patient doesn’t have any medication scheduled yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Modal */}
            {isModalOpen && <EditMedicationSchedule medicationScheduleId={selectedScheduleId as string} open onClose={() => setIsModalOpen( false )} />}
        </div>
    );
}

export default MedicationList