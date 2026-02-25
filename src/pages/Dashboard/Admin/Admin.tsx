import { useState } from "react"

import { useGetAllAdminQuery } from "../../../redux/features/admin/userManagementApi"
import CreateAdminModal from "./CreateAdminModal"

const Admin = () => {
    const [ search, setSearch ] = useState( "" )
    const [ open, setOpen ] = useState( false )

    const { data: admins, isLoading } = useGetAllAdminQuery( search
        ? [
            {
                name: "searchTerm",
                value: search,
            },
        ]
        : undefined )



    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Admin Management</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setOpen( true )}
                >
                    + Create Admin
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
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={3}>Loading...</td>
                            </tr>
                        )}

                        {admins?.data?.map( ( admin ) => (
                            <tr key={admin?._id}>
                                <td>{admin.name.firstName} {admin?.name?.middleName} {admin.name.lastName}</td>
                                <td>{admin.email}</td>
                                <td>
                                    <span className="badge badge-outline">
                                        {admin?.user?.role}
                                    </span>
                                </td>
                            </tr>
                        ) )}

                        {!isLoading && admins?.data?.length === 0 && (
                            <tr>
                                <td colSpan={3}>No admins found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <CreateAdminModal open={open} onClose={() => setOpen( false )} />
        </div>
    )
}

export default Admin

