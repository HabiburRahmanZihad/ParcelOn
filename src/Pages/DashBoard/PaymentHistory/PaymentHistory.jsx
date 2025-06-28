import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthContext";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    // Fetch payment history using React Query
    const { data: payments = [], isLoading, isError, error } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email // Don't run until user email is available
    });

    // Loading state
    if (isLoading) {
        return <div className="text-center mt-10">Loading payment history...</div>;
    }

    // Error state
    if (isError) {
        return <div className="text-center text-red-600 mt-10">Error: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">💳 Payment History</h2>

            {payments.length === 0 ? (
                <p className="text-gray-600">You haven’t made any payments yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Parcel</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount (৳)</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Transaction ID</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Method</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {payments.map(payment => (
                                <tr key={payment._id}>
                                    <td className="px-4 py-2 text-sm">{payment.parcelName}</td>
                                    <td className="px-4 py-2 text-sm">{payment.deliveryCost}</td>
                                    <td className="px-4 py-2 text-sm">{payment.transactionId}</td>
                                    <td className="px-4 py-2 text-sm capitalize">{payment.paymentMethod}</td>
                                    <td className="px-4 py-2 text-sm">
                                        {new Date(payment.paidAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;