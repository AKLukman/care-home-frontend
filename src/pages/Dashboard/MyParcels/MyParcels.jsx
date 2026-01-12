import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [ selectedParcel, setSelectedParcel ] = useState( null );



    const { data, loading, refetch } = useQuery( {
        queryKey: [ 'my-parcels', user?.email ],
        queryFn: async () => {
            const res = await axiosSecure.get( `/my-parcels?email=${ user?.email }` )
            return res.data
        }
    } )



    // delete
    const handleDelete = ( id ) => {
        toast( ( t ) => (
            <div className="space-y-3">

                {/* Warning Header */}
                <div className="flex items-center gap-2 text-warning">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.451 11.473c.75 1.334-.213 2.999-1.742 2.999H3.548c-1.53 0-2.492-1.665-1.743-2.999L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 7v4a1 1 0 001.993.117L11 11V7a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <p className="font-semibold text-base">
                        This action cannot be undone
                    </p>
                </div>

                <p className="text-sm text-gray-500">
                    Are you sure you want to delete this parcel?
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        className="btn btn-sm btn-error"
                        onClick={async () => {
                            try {
                                const res = await axiosSecure.delete( `/parcels/${ id }` );

                                if ( res.data?.success ) {
                                    toast.success( "Parcel deleted successfully" );
                                    refetch();
                                } else {
                                    toast.error( res.data?.message || "Delete failed" );
                                }
                            } catch ( error ) {
                                toast.error(
                                    error.response?.data?.message ||
                                    "Something went wrong"
                                );
                            } finally {
                                toast.dismiss( t.id );
                            }
                        }}
                    >
                        Delete
                    </button>

                    <button
                        className="btn btn-sm"
                        onClick={() => toast.dismiss( t.id )}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ) );
    };



    if ( loading ) {
        return <div className="text-center py-10">Loading parcels...</div>;
    }

    return (
        <div className="bg-base-100 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">📦 My Parcels</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Parcel</th>
                            <th>Parcel Id</th>
                            <th>Weight</th>
                            <th>Parcel Status</th>
                            <th>Route</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.map( ( parcel, index ) => (
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                <td className="font-semibold">
                                    {parcel.parcelName}
                                </td>
                                <td className="capitalize">{parcel._id}</td>
                                <td>{parcel.parcelWeight} kg</td>
                                <td>{parcel.parcelStatus}</td>
                                <td>
                                    {parcel.senderDistrict} → {parcel.receiverDistrict}
                                </td>
                                <td className="font-bold text-blue">
                                    ৳{parcel.cost}
                                </td>
                                <td>
                                    {parcel.paymentStatus === "paid" ? (
                                        <span className="badge badge-success w-20 gap-1">
                                            ✅ Paid
                                        </span>
                                    ) : (
                                        <Link to={`/dashboard/payment/${ parcel?._id }`} className="btn btn-xs w-25 btn-warning">
                                            💳 Pay Now
                                        </Link>
                                    )}
                                </td>
                                <td>
                                    {new Date( parcel.createdAt ).toLocaleDateString()}
                                </td>
                                <td className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        className="btn btn-xs btn-outline w-full sm:w-auto"
                                        onClick={() => setSelectedParcel( parcel )}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-xs btn-error w-full sm:w-auto"
                                        onClick={() => handleDelete( parcel._id )}
                                    >
                                        Delete
                                    </button>
                                </td>


                            </tr>
                        ) )}
                    </tbody>
                </table>
            </div>

            {/* ================= VIEW MODAL ================= */}
            {selectedParcel && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-xl mb-4">
                            📦 Parcel Details
                        </h3>

                        <div className="space-y-2 text-sm">
                            <p><strong>Parcel:</strong> {selectedParcel.parcelName}</p>
                            <p><strong>Type:</strong> {selectedParcel.parcelType}</p>
                            <p><strong>Weight:</strong> {selectedParcel.parcelWeight} kg</p>
                            <p><strong>Parcel Status:</strong> {selectedParcel.parcelStatus}</p>
                            <p><strong>Payment Status:</strong> {selectedParcel.paymentStatus}</p>
                            <p><strong>Sender:</strong> {selectedParcel.senderName}</p>
                            <p><strong>Receiver:</strong> {selectedParcel.receiverName}</p>
                            <p><strong>Route:</strong> {selectedParcel.senderDistrict} → {selectedParcel.receiverDistrict}</p>
                            <p><strong>Cost:</strong> ৳{selectedParcel.cost}</p>
                            <p><strong>Date:</strong> {new Date( selectedParcel.createdAt ).toLocaleString()}</p>
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={() => setSelectedParcel( null )}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    )
}

export default MyParcels
