import { useState } from "react"
import { useGetAllPatientQuery } from "../../../../redux/features/admin/patientManagementApi"
import CreatePatientModal from "./CreatePatientModal"
import { FaEye, FaTrash } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../../../redux/hooks"
import { useCurrentUser } from "../../../../redux/features/auth/authSlice"


const Patient = () => {
    const [ search, setSearch ] = useState( "" )
    const [ open, setOpen ] = useState( false )
    const user = useAppSelector( useCurrentUser )

    const { data: patients, isLoading } = useGetAllPatientQuery( search
        ? [
            {
                name: "searchTerm",
                value: search,
            },
        ]
        : undefined )

    const handleDelete = async ( id: string ) => {
        console.log( id )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Patient Management</h2>
                {
                    ( user?.role === 'admin' || user?.role === 'superAdmin' ) && <button
                        className="btn btn-primary"
                        onClick={() => setOpen( true )}
                    >
                        + Create Patient
                    </button>
                }

            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search patient by name or email"
                className="input input-bordered w-full max-w-md"
                value={search}
                onChange={( e ) => setSearch( e.target.value )}
            />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact Number</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={3}>Loading...</td>
                            </tr>
                        )}

                        {patients?.data?.map( ( patient ) => (
                            <tr key={patient?._id}>
                                <td>{patient.name.firstName} {patient?.name?.middleName} {patient.name.lastName}</td>
                                <td>{patient.contactNo}</td>
                                <td>
                                    <Link
                                        to={`/dashboard/patient/${ patient?._id }`}
                                        className="flex items-center gap-2 text-primary hover:underline"
                                    >
                                        <FaEye />
                                        <span className="uppercase">View</span>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete( patient?._id )}
                                        className="text-error hover:text-red-600 cursor-pointer flex items-center gap-2"
                                    >
                                        <FaTrash />
                                        <span className="uppercase">Delete</span>
                                    </button>
                                </td>

                            </tr>
                        ) )}

                        {!isLoading && patients?.data?.length === 0 && (
                            <tr>
                                <td colSpan={3}>No patients found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <CreatePatientModal open={open} onClose={() => setOpen( false )} />
        </div>
    )
}

export default Patient

