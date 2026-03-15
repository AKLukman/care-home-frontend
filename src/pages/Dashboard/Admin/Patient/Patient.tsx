import { useState } from "react"
import { useGetAllPatientQuery } from "../../../../redux/features/admin/patientManagementApi"
import CreatePatientModal from "./CreatePatientModal"
import { FaEye } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../../../redux/hooks"
import { useCurrentUser } from "../../../../redux/features/auth/authSlice"


const Patient = () => {
    const [ search, setSearch ] = useState( "" )
    const [ open, setOpen ] = useState( false )
    const user = useAppSelector( useCurrentUser )
    const [ page, setPage ] = useState( 1 );
    const limit = 10;

    const { data, isLoading } = useGetAllPatientQuery(
        [
            { name: "page", value: page },
            { name: "limit", value: limit },
            ...( search
                ? [
                    {
                        name: "searchTerm",
                        value: search,
                    },
                ]
                : [] ),
        ]
    );


    const patients = data?.data || [];

    const meta = data?.meta;

    const totalPage = Math.ceil( ( meta?.total || 0 ) / limit );

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

                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={3}>Loading...</td>
                            </tr>
                        )}

                        {patients?.map( ( patient ) => (
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
                                {/* <td>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete( patient?._id )}
                                        className="text-error hover:text-red-600 cursor-pointer flex items-center gap-2"
                                    >
                                        <FaTrash />
                                        <span className="uppercase">Delete</span>
                                    </button>
                                </td> */}

                            </tr>
                        ) )}

                        {!isLoading && patients?.length === 0 && (
                            <tr>
                                <td colSpan={3}>No patients found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* paginations */}
            <div className="flex items-center justify-center mt-8">

                <div className="flex items-center gap-1 bg-white border rounded-lg shadow-sm p-1">

                    {/* Prev */}
                    <button
                        disabled={page === 1}
                        onClick={() => setPage( page - 1 )}
                        className="px-3 py-2 text-sm rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        ← Prev
                    </button>

                    {/* Page Numbers */}
                    {[ ...Array( totalPage ) ].map( ( _, index ) => {
                        const pageNumber = index + 1;

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setPage( pageNumber )}
                                className={`min-w-[36px] h-9 text-sm rounded-md cursor-pointer transition ${ page === pageNumber
                                    ? "bg-blue-600 text-white shadow"
                                    : "hover:bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    } )}

                    {/* Next */}
                    <button
                        disabled={page === totalPage}
                        onClick={() => setPage( page + 1 )}
                        className="px-3 py-2 text-sm rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next →
                    </button>

                </div>

            </div>

            {/* Modal */}
            <CreatePatientModal open={open} onClose={() => setOpen( false )} />
        </div>
    )
}

export default Patient

