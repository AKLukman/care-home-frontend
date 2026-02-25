import { useState } from "react"
import { useDeleteCareWorkerMutation } from "../../../../redux/features/admin/userManagementApi"
import { Link } from "react-router-dom"
import { FaEye, FaTrash } from "react-icons/fa6"
import CreateMedicationModal from "./CreateMedicationModal"
import { useGetAllMedicationQuery } from "../../../../redux/features/admin/medicationMangementApi"



const Medication = () => {
    const [ search, setSearch ] = useState( "" )
    const [ open, setOpen ] = useState( false )
    const [ deleteCareWorker ] = useDeleteCareWorkerMutation()

    const { data: medications, isLoading } = useGetAllMedicationQuery( search
        ? [
            {
                name: "searchTerm",
                value: search,
            },
        ]
        : undefined )




    const handleDelete = ( id: string ) => {
        console.log( id )

    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Medicine Management</h2>
                <button
                    className="btn btn-primary uppercase"
                    onClick={() => setOpen( true )}
                >
                    + Create Medicine
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search admin by name or email"
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
                            <th>Form</th>
                            <th>Strength</th>
                            <th>Descriptions</th>
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

                        {medications?.data?.map( ( medication ) => (
                            <tr key={medication?._id}>
                                <td>{medication.name}</td>
                                <td>{medication.form}</td>
                                <td>{medication.strength}</td>
                                <td>{medication.description}</td>

                                <td>
                                    <Link
                                        to={`/dashboard/admin/care-worker/${ medication?._id }`}
                                        className="flex items-center gap-2 text-primary hover:underline"
                                    >
                                        <FaEye />
                                        <span className="uppercase">View</span>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete( medication?._id )}
                                        className="text-error hover:text-red-600 cursor-pointer"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ) )}

                        {!isLoading && medications?.data?.length === 0 && (
                            <tr>
                                <td colSpan={3}>No Medicine found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <CreateMedicationModal open={open} onClose={() => setOpen( false )} />
        </div>
    )
}

export default Medication

