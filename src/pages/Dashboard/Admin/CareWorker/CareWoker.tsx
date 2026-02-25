import { useState } from "react"
import { useDeleteCareWorkerMutation, useGetAllCareworkersQuery } from "../../../../redux/features/admin/userManagementApi"
import CreateCareWorkerModal from "./CreateCareWokerModal"
import { Link } from "react-router-dom"
import { FaEye, FaTrash } from "react-icons/fa6"



const CareWoker = () => {
    const [ search, setSearch ] = useState( "" )
    const [ open, setOpen ] = useState( false )
    const [ deleteCareWorker ] = useDeleteCareWorkerMutation()

    const { data: careWorkers, isLoading } = useGetAllCareworkersQuery( search
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
                <h2 className="text-2xl font-bold">Care worker Management</h2>
                <button
                    className="btn btn-primary uppercase"
                    onClick={() => setOpen( true )}
                >
                    + Create Care Worker
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
                            <th>Email</th>
                            <th>Designation</th>
                            <th>Role</th>
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

                        {careWorkers?.data?.map( ( careworker ) => (
                            <tr key={careworker?._id}>
                                <td>{careworker.name.firstName} {careworker?.name?.middleName} {careworker.name.lastName}</td>
                                <td>{careworker.email}</td>
                                <td>{careworker.designation}</td>
                                <td>
                                    <span className="badge badge-outline">
                                        {careworker?.user?.role}
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        to={`/dashboard/care-worker/${ careworker?._id }`}
                                        className="flex items-center gap-2 text-primary hover:underline"
                                    >
                                        <FaEye />
                                        <span className="uppercase">View</span>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete( careworker?._id )}
                                        className="text-error hover:text-red-600 cursor-pointer"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ) )}

                        {!isLoading && careWorkers?.data?.length === 0 && (
                            <tr>
                                <td colSpan={3}>No care worker found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <CreateCareWorkerModal open={open} onClose={() => setOpen( false )} />
        </div>
    )
}

export default CareWoker

