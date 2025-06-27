import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { use, useState } from "react";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentForm = ({ parcel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const { user } = use(AuthContext);

    const axiosSecure = useAxiosSecure(); // Get secured axios instance
    //CONVERT TO cents
    const amountInCents = Math.round(parcel.deliveryCost * 100);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        if (!stripe || !elements) return;


        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (!card) return;


        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            console.log(`Payment successful for ${parcel.parcelName} with amount ৳${parcel.deliveryCost}`);
        }


        //create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            email: user?.email,
            parcelId: parcel._id,
            parcelName: parcel.parcelName,
            deliveryCost: parcel.deliveryCost,
        });

        const clientSecret = res.data.clientSecret;

        console.log(clientSecret);

        if (res.data.error) {
            setError(res.data.error);
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.name || user?.email,
                },
            },
        });

        if (result.error) {
            setError(result.error);
            return;
        }
        if (result.paymentIntent.status === 'succeeded') {
            // Payment succeeded, handle success logic here
            console.log('Payment succeeded:', result.paymentIntent);
            // Optionally, you can update the parcel status in your database here
        }
        // Log the result for debugging
        console.log('Payment result:', result);

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