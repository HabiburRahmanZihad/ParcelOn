import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { use, useState } from "react";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


const PaymentForm = ({ parcel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const { user } = use(AuthContext);
    const navigate = useNavigate(); // Hook to navigate programmatically

    const axiosSecure = useAxiosSecure(); // Get secured axios instance
    //CONVERT TO cents
    const amountInCents = Math.round(parcel.deliveryCost * 100);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        try {
            // 1. Create PaymentIntent from backend
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                email: user?.email,
                parcelId: parcel._id,
                parcelName: parcel.parcelName,
                deliveryCost: parcel.deliveryCost,
            });

            const clientSecret = res.data.clientSecret;

            if (!clientSecret) {
                setError({ message: "Failed to create payment intent." });
                return;
            }

            // 2. Confirm the card payment
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
                setError(result.error);
            } else if (result.paymentIntent.status === "succeeded") {
                console.log("✅ Payment succeeded:", result.paymentIntent);

                // mark parcel paid also create payment history
                // const { parcelId, parcelName, deliveryCost, userEmail, transactionId, paymentMethod } = req.body;

                const paymentData = {
                    parcelId: parcel._id,
                    parcelName: parcel.parcelName,
                    deliveryCost: parcel.deliveryCost,
                    userEmail: user?.email,
                    transactionId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types[0],
                };
                await axiosSecure.post('/payments', paymentData);

                console.log("Payment recorded successfully");
                // Optional: show success message or redirect
                Swal.fire({
                    title: "Payment Successful",
                    text: `Your payment of ৳${parcel.deliveryCost} was successful!`,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Optionally, redirect to another page or reset form
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Pay for: <span className="text-indigo-600">{parcel?.parcelName}</span>
            </h2>

            <div className="mb-2 text-gray-700">
                <strong>Amount:</strong> ৳{parcel?.deliveryCost}
            </div>
            <div className="mb-4 text-gray-700">
                <strong>From:</strong> {user?.name || user?.email}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

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

                {error && (
                    <div className="text-red-600 text-sm">{error.message}</div>
                )}

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