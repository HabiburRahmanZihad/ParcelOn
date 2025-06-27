import { useParams } from "react-router"; // To access route parameters (like parcel ID)
import { useQuery } from "@tanstack/react-query"; // For data fetching and caching
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Custom hook for authenticated Axios requests

const ParcelDetails = () => {
    // Extract parcel ID from the URL
    const { id } = useParams();

    // Get secured axios instance
    const axiosSecure = useAxiosSecure();

    // Fetch specific parcel details using React Query
    const { data: parcel, isLoading, error } = useQuery({
        queryKey: ["parcel", id], // Unique cache key for this parcel
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        },
        enabled: !!id, // Ensures the query only runs if 'id' is present
    });

    // Show loading indicator while data is being fetched
    if (isLoading) return <div>Loading...</div>;

    // Show error message if fetch fails
    if (error) return <div>Error fetching parcel details</div>;

    // Render parcel details after successful fetch
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Parcel Details</h2>

            {/* Parcel Basic Info */}
            <div className="space-y-2 text-gray-700">
                <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
                <p><strong>Parcel Name:</strong> {parcel.parcelName}</p>
                <p><strong>Parcel Type:</strong> {parcel.parcelType}</p>
                <p><strong>Weight:</strong> {parcel.parcelWeight} kg</p>

                <hr className="my-3" />

                {/* Sender Information */}
                <p><strong>Sender:</strong> {parcel.senderName}</p>
                <p><strong>Region:</strong> {parcel.senderRegion}</p>
                <p><strong>District:</strong> {parcel.senderDistrict}</p>
                <p><strong>City:</strong> {parcel.senderCity}</p>
                <p><strong>Covered Area:</strong> {parcel.senderCoveredArea}</p>
                <p><strong>Address:</strong> {parcel.senderAddress}</p>
                <p><strong>Contact:</strong> {parcel.senderContact}</p>
                <p><strong>Pickup Instruction:</strong> {parcel.pickupInstruction}</p>

                <hr className="my-3" />

                {/* Receiver Information */}
                <p><strong>Receiver:</strong> {parcel.receiverName}</p>
                <p><strong>Region:</strong> {parcel.receiverRegion}</p>
                <p><strong>District:</strong> {parcel.receiverDistrict}</p>
                <p><strong>City:</strong> {parcel.receiverCity}</p>
                <p><strong>Covered Area:</strong> {parcel.receiverCoveredArea}</p>
                <p><strong>Address:</strong> {parcel.receiverAddress}</p>
                <p><strong>Contact:</strong> {parcel.receiverContact}</p>
                <p><strong>Delivery Instruction:</strong> {parcel.deliveryInstruction}</p>

                <hr className="my-3" />

                {/* Status and Meta Info */}
                <p><strong>Delivery Status:</strong> {parcel.delivery_status}</p>
                <p><strong>Payment Status:</strong> {parcel.payment_status}</p>
                <p><strong>Delivery Cost:</strong> ৳{parcel.deliveryCost}</p>
                <p><strong>Created At:</strong> {new Date(parcel.creation_date).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ParcelDetails;