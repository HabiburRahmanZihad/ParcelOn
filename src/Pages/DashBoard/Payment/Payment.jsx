import { useParams } from "react-router"; // Hook to access route parameters (e.g., parcel ID)
import { useQuery } from "@tanstack/react-query"; // React Query for data fetching and caching
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Custom hook for secure Axios instance
import { Elements } from "@stripe/react-stripe-js"; // Stripe wrapper component for context
import { loadStripe } from "@stripe/stripe-js"; // Stripe loader function
import PaymentForm from "./PaymentForm"; // Payment form component

// Load Stripe with publishable test key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const { id } = useParams(); // Extract parcel ID from the URL
    const axiosSecure = useAxiosSecure(); // Get secured axios instance

    // Fetch parcel data based on ID
    const { data: parcel, isLoading, error } = useQuery({
        queryKey: ['parcel', id], // Unique query key for caching
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`); // API call to get parcel
            return res.data;
        },
        enabled: !!id, // Only run the query if `id` exists
    });

    // Show loading state while data is being fetched
    if (isLoading) return <p>Loading...</p>;

    // Show error message if fetch fails
    if (error) return <p>Error loading parcel.</p>;

    // Log parcel data to console (for debugging)
    // console.log(parcel);

    // Render Stripe Elements provider and payment form
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm parcel={parcel} />
        </Elements>
    );
};

export default Payment;