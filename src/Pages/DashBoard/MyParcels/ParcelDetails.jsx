// src/pages/Dashboard/ParcelDetails/ParcelDetails.jsx
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ParcelDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: parcel, isLoading, error } = useQuery({
        queryKey: ["parcel", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        },
        enabled: !!id, // only run query if id is available
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching parcel details</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Parcel Details</h2>
            <div className="space-y-2 text-gray-700">
                <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
                <p><strong>Parcel Name:</strong> {parcel.parcelName}</p>
                <p><strong>Parcel Type:</strong> {parcel.parcelType}</p>
                <p><strong>Weight:</strong> {parcel.parcelWeight} kg</p>

                <hr className="my-3" />

                <p><strong>Sender:</strong> {parcel.senderName}</p>
                <p><strong>Region:</strong> {parcel.senderRegion}</p>
                <p><strong>District:</strong> {parcel.senderDistrict}</p>
                <p><strong>City:</strong> {parcel.senderCity}</p>
                <p><strong>Covered Area:</strong> {parcel.senderCoveredArea}</p>
                <p><strong>Address:</strong> {parcel.senderAddress}</p>
                <p><strong>Contact:</strong> {parcel.senderContact}</p>
                <p><strong>Pickup Instruction:</strong> {parcel.pickupInstruction}</p>

                <hr className="my-3" />

                <p><strong>Receiver:</strong> {parcel.receiverName}</p>
                <p><strong>Region:</strong> {parcel.receiverRegion}</p>
                <p><strong>District:</strong> {parcel.receiverDistrict}</p>
                <p><strong>City:</strong> {parcel.receiverCity}</p>
                <p><strong>Covered Area:</strong> {parcel.receiverCoveredArea}</p>
                <p><strong>Address:</strong> {parcel.receiverAddress}</p>
                <p><strong>Contact:</strong> {parcel.receiverContact}</p>
                <p><strong>Delivery Instruction:</strong> {parcel.deliveryInstruction}</p>

                <hr className="my-3" />

                <p><strong>Delivery Status:</strong> {parcel.delivery_status}</p>
                <p><strong>Payment Status:</strong> {parcel.payment_status}</p>
                <p><strong>Delivery Cost:</strong> ৳{parcel.deliveryCost}</p>
                <p><strong>Created At:</strong> {new Date(parcel.creation_date).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ParcelDetails;