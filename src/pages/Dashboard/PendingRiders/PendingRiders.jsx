import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import RiderModal from "./RiderModal";
import { FiEye, FiCheckCircle, FiXCircle } from "react-icons/fi";


const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [ riders, setRiders ] = useState( [] );
    const [ selectedRider, setSelectedRider ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    const fetchRiders = async () => {
        try {
            setLoading( true );
            const res = await axiosSecure.get( "/riders/pending" );
            setRiders( res.data.riders || [] );
        } catch ( error ) {
            toast.error( "Failed to load riders" );
        } finally {
            setLoading( false );
        }
    };

    useEffect( () => {
        fetchRiders();
    }, [] );

    const updateStatus = async ( id, status ) => {
        try {
            const res = await axiosSecure.patch( `/riders/${ id }`, { status } );

            if ( res.data?.success ) {
                toast.success( `Rider ${ status }` );
                fetchRiders();
                setSelectedRider( null );
            }
        } catch {
            toast.error( "Failed to update status" );
        }
    };

    if ( loading ) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="bg-base-100 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">🚴 Pending Riders</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {riders.map( ( rider, index ) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>
                                    <span className="badge badge-warning">
                                        Pending
                                    </span>
                                </td>
                                <td>
                                    <div className="flex flex-row gap-2">
                                        {/* View */}
                                        <button
                                            className="btn btn-xs btn-outline"
                                            title="View Rider"
                                            onClick={() => setSelectedRider( rider )}
                                        >
                                            <FiEye className="text-base" />
                                        </button>

                                        {/* Approve */}
                                        <button
                                            className="btn btn-xs btn-success"
                                            title="Approve Rider"
                                            onClick={() => updateStatus( rider._id, "active" )}
                                        >
                                            <FiCheckCircle className="text-base" />
                                        </button>

                                        {/* Reject */}
                                        <button
                                            className="btn btn-xs btn-error"
                                            title="Reject Rider"
                                            onClick={() => updateStatus( rider._id, "rejected" )}
                                        >
                                            <FiXCircle className="text-base" />
                                        </button>
                                    </div>
                                </td>


                            </tr>
                        ) )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedRider && (
                <RiderModal
                    rider={selectedRider}
                    onClose={() => setSelectedRider( null )}
                />
            )}
        </div>
    );
};

export default PendingRiders;
