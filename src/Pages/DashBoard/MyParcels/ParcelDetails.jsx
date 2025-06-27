import { useParams } from "react-router"; // To access the parcel ID from the URL
import { useQuery } from "@tanstack/react-query"; // For data fetching and caching
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Custom hook for secure Axios instance

const ParcelDetails = () => {
    const { id } = useParams(); // Get parcel ID from the route
    const axiosSecure = useAxiosSecure(); // Get the secured axios instance

    // Fetch parcel details with React Query using the parcel ID
    const { data: parcel, isLoading, error } = useQuery({
        queryKey: ["parcel", id], // Unique query key
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        },
        enabled: !!id, // Only run the query if `id` exists
    });

    // Loading state
    if (isLoading)
        return <div className="text-center py-10 text-gray-500">Loading...</div>;

    // Error state
    if (error)
        return (
            <div className="text-center py-10 text-red-500">
                Error fetching parcel details
            </div>
        );

    // Main UI: Render parcel details after successful data fetch
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md space-y-6">
            {/* Header */}
            <h2 className="text-3xl font-semibold text-gray-800 border-b pb-3">
                📦 Parcel Details
            </h2>

            {/* Basic Info Section */}
            <section className="space-y-2">
                <h3 className="text-xl font-medium text-gray-700 mb-1">
                    🔍 Basic Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 text-gray-600">
                    <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
                    <p><strong>Parcel Name:</strong> {parcel.parcelName}</p>
                    <p><strong>Parcel Type:</strong> {parcel.parcelType}</p>
                    <p><strong>Weight:</strong> {parcel.parcelWeight} kg</p>
                </div>
            </section>

            {/* Sender Info Section */}
            <section className="space-y-2">
                <h3 className="text-xl font-medium text-gray-700 mb-1">
                    📤 Sender Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 text-gray-600">
                    <p><strong>Name:</strong> {parcel.senderName}</p>
                    <p><strong>Region:</strong> {parcel.senderRegion}</p>
                    <p><strong>District:</strong> {parcel.senderDistrict}</p>
                    <p><strong>City:</strong> {parcel.senderCity}</p>
                    <p><strong>Covered Area:</strong> {parcel.senderCoveredArea}</p>
                    <p><strong>Address:</strong> {parcel.senderAddress}</p>
                    <p><strong>Contact:</strong> {parcel.senderContact}</p>
                    <p><strong>Pickup Instruction:</strong> {parcel.pickupInstruction}</p>
                </div>
            </section>

            {/* Receiver Info Section */}
            <section className="space-y-2">
                <h3 className="text-xl font-medium text-gray-700 mb-1">
                    📥 Receiver Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 text-gray-600">
                    <p><strong>Name:</strong> {parcel.receiverName}</p>
                    <p><strong>Region:</strong> {parcel.receiverRegion}</p>
                    <p><strong>District:</strong> {parcel.receiverDistrict}</p>
                    <p><strong>City:</strong> {parcel.receiverCity}</p>
                    <p><strong>Covered Area:</strong> {parcel.receiverCoveredArea}</p>
                    <p><strong>Address:</strong> {parcel.receiverAddress}</p>
                    <p><strong>Contact:</strong> {parcel.receiverContact}</p>
                    <p><strong>Delivery Instruction:</strong> {parcel.deliveryInstruction}</p>
                </div>
            </section>

            {/* Status & Meta Info Section */}
            <section className="space-y-2">
                <h3 className="text-xl font-medium text-gray-700 mb-1">
                    📊 Status & Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 text-gray-600">
                    <p><strong>Delivery Status:</strong> {parcel.delivery_status}</p>
                    <p><strong>Payment Status:</strong> {parcel.payment_status}</p>
                    <p><strong>Delivery Cost:</strong> ৳{parcel.deliveryCost}</p>
                    <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(parcel.creation_date).toLocaleString()}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ParcelDetails;