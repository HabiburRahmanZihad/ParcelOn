// React & library imports
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthContext"; // Auth context to get the logged-in user
import { useQuery } from "@tanstack/react-query"; // React Query for data fetching
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Custom hook for authenticated Axios instance
import { Link } from "react-router"; // For navigation
import Swal from "sweetalert2"; // SweetAlert2 for confirmation dialogs

const MyParcels = () => {
    // Get logged-in user from context
    const { user } = useContext(AuthContext);

    // Get secure axios instance
    const axiosSecure = useAxiosSecure();

    // Fetch parcels for the current user using React Query
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["myParcels", user?.email], // Unique cache key
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        },
    });

    // Function to handle parcel deletion with SweetAlert2 confirmation
    const handleDelete = async (id) => {
        // Show confirmation dialog before deletion
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/parcels/${id}`); // Delete parcel by ID
                refetch(); // Refresh the parcel list after deletion

                Swal.fire(
                    'Deleted!',
                    'Your parcel has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error("Delete failed:", error);
                Swal.fire(
                    'Error!',
                    'Failed to delete the parcel.',
                    'error'
                );
            }
        }
    };

    // Utility function to format date into readable format
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Parcels ({parcels.length})</h1>

            {/* Grid layout to display parcel cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {parcels.map((parcel) => (
                    <div key={parcel._id} className="border rounded-lg shadow p-4 bg-white space-y-2">
                        {/* Parcel details */}
                        <h2 className="text-xl font-semibold">{parcel.parcelName}</h2>
                        <p><strong>Type:</strong> {parcel.parcelType}</p>
                        <p><strong>Created On:</strong> {formatDate(parcel.creation_date)}</p>
                        <p><strong>Delivery Cost:</strong> ৳{parcel.deliveryCost}</p>
                        <p>
                            <strong>Payment Status:</strong>{" "}
                            <span className={parcel.payment_status === "paid" ? "text-green-600" : "text-red-600"}>
                                {parcel.payment_status}
                            </span>
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {/* View Details Button */}
                            <Link to={`/dashboard/parcels/${parcel._id}`}>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                    View Details
                                </button>
                            </Link>

                            {/* Complete Payment Button (only if not paid) */}
                            {parcel.payment_status !== "paid" && (
                                <Link to={`/dashboard/payment/${parcel._id}`}>
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                        Complete Pay
                                    </button>
                                </Link>
                            )}


                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(parcel._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyParcels;