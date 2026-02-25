import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaPhoneAlt, FaUserTie, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmergency } from "react-icons/md";
import { useAppSelector } from "../../../../redux/hooks";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useGetCareWorkerByIdQuery } from "../../../../redux/features/admin/userManagementApi";


const CareWorkerDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetCareWorkerByIdQuery( id as string );

    // const [ updateWorker ] = useUpdateCareWorkerMutation();
    const currentUser = useAppSelector( useCurrentUser )
    const worker = data?.data



    const isAdmin =
        currentUser?.role === "admin" || currentUser?.role === "super_admin";

    const [ isEditOpen, setIsEditOpen ] = useState( false );
    const [ preview, setPreview ] = useState<string | null>( null );

    if ( isLoading ) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }



    if ( !worker ) {
        return <p className="text-center text-error">Care worker not found</p>;
    }

    // const handleUpdate = async ( formData: FormData ) => {
    //     try {
    //         const res = await updateWorker( { id: worker._id, data: formData } ).unwrap();
    //         toast.success( "Care Worker updated successfully!" );
    //         setIsEditOpen( false );
    //     } catch ( err: any ) {
    //         toast.error( err?.data?.message || "Something went wrong!" );
    //     }
    // };

    return (
        <div className="max-w-6xl mx-auto p-4 lg:p-8 space-y-6">
            {/* ===== Header Card ===== */}
            <div className="card bg-base-100 shadow-md">
                <div className="card-body flex flex-col md:flex-row items-center gap-6">
                    {/* Profile Image */}
                    <div className="avatar">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                                src={preview || worker.profileImg || "/avatar-placeholder.png"}
                                alt={worker.name.firstName}
                            />
                        </div>
                        {isAdmin && (
                            <label className="btn btn-sm btn-outline mt-2 cursor-pointer w-full text-xs">
                                Change Photo
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={( e ) => {
                                        const file = e.target.files?.[ 0 ];
                                        if ( !file ) return;
                                        setPreview( URL.createObjectURL( file ) );
                                    }}
                                />
                            </label>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 text-center md:text-left space-y-1">
                        <h2 className="text-2xl font-bold">
                            {worker.name.firstName} {worker.name.lastName}
                        </h2>
                        <p className="badge badge-primary badge-outline flex items-center gap-1">
                            <FaUserTie />
                            {worker.designation}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">{worker.gender}</p>

                        {/* Edit Button */}
                        {isAdmin && (
                            <button
                                className="btn btn-sm btn-outline btn-primary mt-2"
                                onClick={() => setIsEditOpen( true )}
                            >
                                ✏️ Edit Care Worker
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== Details Grid ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body space-y-3">
                        <h3 className="text-lg font-semibold">Contact Information</h3>
                        <p className="flex items-center gap-2">
                            <FaEnvelope className="text-primary" /> {worker.email}
                        </p>
                        <p className="flex items-center gap-2">
                            <FaPhoneAlt className="text-primary" /> {worker.contactNo}
                        </p>
                        <p className="flex items-center gap-2 text-error">
                            <MdEmergency /> {worker.emergencyContactNo ? worker.emergencyContactNo : "N/A"}
                        </p>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body space-y-3">
                        <h3 className="text-lg font-semibold">Personal Details</h3>
                        <p>
                            <span className="font-medium">Date of Birth:</span>{" "}
                            {new Date( worker.dateOfBirth ).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-medium">Status:</span>{" "}
                            <span
                                className={`badge ${ worker.isDeleted ? "badge-error" : "badge-success"
                                    }`}
                            >
                                {worker.isDeleted ? "Inactive" : "Active"}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Address */}
                <div className="card bg-base-100 shadow md:col-span-2">
                    <div className="card-body space-y-3">
                        <h3 className="text-lg font-semibold">Address</h3>
                        <p className="flex items-start gap-2">
                            <FaMapMarkerAlt className="text-primary mt-1" />

                            <span className="text-sm">
                                <span className="font-bold">Address:</span>{" "}
                                {worker?.address?.address1}
                                <br />

                                <span className="font-bold">Town:</span>{" "}
                                {worker?.address?.town}
                                <br />

                                <span className="font-bold">Postcode:</span>{" "}
                                {worker?.address?.postcode}
                                <br />

                                <span className="font-bold">County:</span>{" "}
                                {worker?.address?.county}
                            </span>
                        </p>

                    </div>
                </div>
            </div>

            {/* Activity Log */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
                    {/* {worker.activities?.length ? (
                        <ul className="space-y-3">
                            {worker.activities.map( ( log ) => (
                                <li
                                    key={log._id}
                                    className="flex justify-between text-sm border-b pb-2"
                                >
                                    <span>{log.action}</span>
                                    <span className="text-gray-400">
                                        {new Date( log.createdAt ).toLocaleString()}
                                    </span>
                                </li>
                            ) )}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No activity recorded</p>
                    )} */}
                </div>
            </div>

            {/* Edit Modal */}
            {isAdmin && isEditOpen && (
                <dialog open className="modal modal-middle">
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-lg mb-4">Edit Care Worker</h3>

                        {/* <CareWorkerEditForm
                            worker={worker}
                            preview={preview}
                            setPreview={setPreview}
                            // onSubmit={handleUpdate}
                            onClose={() => setIsEditOpen( false )}
                        /> */}

                        <div className="modal-action">
                            <button
                                className="btn btn-ghost"
                                onClick={() => setIsEditOpen( false )}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default CareWorkerDetails;

