import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery( {
        queryKey: [ "payments-history", user?.email ],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get( `/payments?email=${ user.email }` );
            return res.data;
        }
    } );


    if ( isLoading ) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="bg-base-100 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">💳 Payment History</h2>

            {/* Mobile Cards */}
            <div className="grid gap-4 md:hidden">
                {data?.payments?.map( payment => (
                    <div
                        key={payment._id}
                        className="border rounded-lg p-4 space-y-2"
                    >
                        <p>
                            <span className="font-semibold">Parcel ID:</span>{" "}
                            {payment.parcelId}
                        </p>

                        <p>
                            <span className="font-semibold">Amount:</span>{" "}
                            ৳{payment.amount}
                        </p>

                        <p>
                            <span className="font-semibold">Status:</span>{" "}
                            <span className="badge badge-success">
                                Paid
                            </span>
                        </p>

                        <p className="text-sm text-gray-500">
                            {new Date( payment.paid_at ).toLocaleString()}
                        </p>

                        <p className="text-xs break-all text-gray-400">
                            TXN: {payment.transactionId}
                        </p>
                    </div>
                ) )}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Transaction</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.payments.map( ( payment, index ) => (
                            <tr key={payment._id}>
                                <td>{index + 1}</td>

                                <td className="font-mono text-sm">
                                    {payment.parcelId}
                                </td>

                                <td className="font-semibold">
                                    ৳{payment.amount}
                                </td>

                                <td>
                                    <span className="badge badge-success">
                                        Paid
                                    </span>
                                </td>

                                <td className="text-xs font-mono max-w-[180px] truncate">
                                    {payment.transactionId}
                                </td>

                                <td className="text-sm">
                                    {new Date( payment.paid_at ).toLocaleDateString()}
                                </td>
                            </tr>
                        ) )}
                    </tbody>
                </table>
            </div>

            {data.payments.length === 0 && (
                <p className="text-center text-gray-500 mt-6">
                    No payment history found
                </p>
            )}
        </div>
    );
};

export default PaymentHistory;
