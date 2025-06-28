import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { use, useState } from "react";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

// PaymentForm component receives a parcel object as a prop
const PaymentForm = ({ parcel }) => {
    const stripe = useStripe(); // Initialize Stripe.js
    const elements = useElements(); // Get Stripe Elements instance
    const [error, setError] = useState(null); // Local state to handle payment errors

    const { user } = use(AuthContext); // Access authenticated user info from context
    const navigate = useNavigate(); // Hook for navigation after successful payment
    const axiosSecure = useAxiosSecure(); // Custom hook for secured axios instance

    // Stripe requires amount in cents (for USD-like currencies)
    const amountInCents = Math.round(parcel.deliveryCost * 100);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return; // Ensure Stripe.js is loaded

        const card = elements.getElement(CardElement); // Get card input element
        if (!card) return;

        try {
            // Step 1: Create PaymentIntent on the backend
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                email: user?.email,
                parcelId: parcel._id,
                parcelName: parcel.parcelName,
                deliveryCost: parcel.deliveryCost,
            });

            const clientSecret = res.data.clientSecret; // Retrieve client secret

            if (!clientSecret) {
                setError({ message: "Failed to create payment intent." });
                return;
            }

            // Step 2: Confirm the card payment using client secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.name || "Anonymous",
                        email: user?.email,
                    },
                },
            });

            if (result.error) {
                // Handle Stripe error (e.g., declined card)
                setError(result.error);
            } else if (result.paymentIntent.status === "succeeded") {
                console.log("✅ Payment succeeded:", result.paymentIntent);

                // Step 3: Save payment details in backend
                const paymentData = {
                    parcelId: parcel._id,
                    parcelName: parcel.parcelName,
                    deliveryCost: parcel.deliveryCost,
                    userEmail: user?.email,
                    transactionId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types[0],
                };

                await axiosSecure.post('/payments', paymentData); // Store payment record

                // Notify user of success
                Swal.fire({
                    title: "Payment Successful",
                    text: `Your payment of ৳${parcel.deliveryCost} was successful!`,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Redirect to user's parcel dashboard after success
                    navigate("/dashboard/my-parcels");
                });
            }
        } catch (err) {
            console.error(err);
            setError({ message: "Payment failed. Please try again." });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            {/* Header Info */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Pay for: <span className="text-indigo-600">{parcel?.parcelName}</span>
            </h2>

            {/* Parcel cost and user info */}
            <div className="mb-2 text-gray-700">
                <strong>Amount:</strong> ৳{parcel?.deliveryCost}
            </div>
            <div className="mb-4 text-gray-700">
                <strong>From:</strong> {user?.name || user?.email}
            </div>

            {/* Payment form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Card input field */}
                <div className="border border-gray-300 p-3 rounded-md">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                {/* Display error messages if any */}
                {error && (
                    <div className="text-red-600 text-sm">{error.message}</div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full bg-yellow-500 text-white font-medium py-2 rounded-md hover:bg-yellow-600 transition duration-200"
                >
                    Pay ৳ {parcel?.deliveryCost}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;