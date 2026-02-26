import { useState } from "react";
import { FaPlus, FaPills, FaUser, FaAllergies } from "react-icons/fa";
import { useGetPatientByIdQuery } from "../../../../redux/features/admin/patientManagementApi";
import { Link, useParams } from "react-router-dom";
import dateFormat from "../../../../utils/dateFormat";
import MedicationList from "./MedicatuionList";
import CreateSchedule from "./CreateSchedule";
import { useAppSelector } from "../../../../redux/hooks";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";



const PatientDetails = () => {

    const [ isModalOpen, setIsModalOpen ] = useState( false );
    const user = useAppSelector( useCurrentUser )
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetPatientByIdQuery( id )
    const patient = data?.data;



    if ( isLoading ) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                    <FaUser /> Patient Details
                </h1>
                <Link to={`/dashboard/patient/medications-records/${ id }`} className="btn btn-primary">Medication records</Link>
            </div>

            {/* Overview */}
            <section className="bg-base-100 rounded-xl p-5 shadow">
                <h2 className="font-semibold mb-3">Overview</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><strong>Name: </strong>{patient?.name?.firstName} {patient?.name?.middleName} {patient?.name?.lastName}</p>
                    <p><strong>DOB: </strong>{dateFormat( patient?.dateOfBirth as string )}</p>
                    <p><strong>Gender: </strong>{patient?.gender}</p>
                    <p><strong>Blood Group: </strong>{patient?.bloodGroup}</p>
                    <p><strong>Contact Number: </strong>{patient?.contactNo}</p>
                </div>
            </section>

            {/* Allergies */}
            <section className="bg-base-100 rounded-xl p-5 shadow">
                <h2 className="font-semibold mb-3 flex items-center gap-2">
                    <FaAllergies /> Allergies
                </h2>
                <div className="flex gap-2 flex-wrap">
                    {patient?.allergies?.map( a => (
                        <span key={a} className="badge badge-error badge-outline">{a}</span>
                    ) )}
                </div>
            </section>

            {/* Medications */}
            <section className="bg-base-100 rounded-xl p-5 shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold flex items-center gap-2">
                        <FaPills /> Medications
                    </h2>
                    {
                        ( user?.role === 'admin' || user?.role === 'superAdmin' ) && <>

                            <button
                                className="btn btn-primary btn-sm gap-2"
                                onClick={() => setIsModalOpen( true )}
                            >
                                <FaPlus /> Add Medication
                            </button>
                        </>
                    }



                </div>

                <MedicationList patientId={id as string} />
            </section>

            {/* Modal */}
            {isModalOpen && <CreateSchedule patientId={id as string} open onClose={() => setIsModalOpen( false )} />}
        </div>
    );
}
export default PatientDetails





