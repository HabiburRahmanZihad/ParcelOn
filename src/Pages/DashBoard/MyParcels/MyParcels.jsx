import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyParcels = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["myParcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/parcels/${id}`);
            refetch();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {parcels.map((parcel) => (
                    <div key={parcel._id} className="border rounded-lg shadow p-4 bg-white space-y-2">
                        <h2 className="text-xl font-semibold">{parcel.parcelName}</h2>
                        <p><strong>Type:</strong> {parcel.parcelType}</p>
                        <p><strong>Created On:</strong> {formatDate(parcel.creation_date)}</p>
                        <p><strong>Delivery Cost:</strong> ৳{parcel.deliveryCost}</p>
                        <p><strong>Payment Status:</strong> <span className={parcel.payment_status === "paid" ? "text-green-600" : "text-red-600"}>{parcel.payment_status}</span></p>

                        <div className="flex flex-wrap gap-2 mt-3">
                            <Link to={`/dashboard/parcels/${parcel._id}`}>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                    View Details
                                </button>
                            </Link>
                            {parcel.payment_status !== "paid" && (
                                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                    Complete Pay
                                </button>
                            )}
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