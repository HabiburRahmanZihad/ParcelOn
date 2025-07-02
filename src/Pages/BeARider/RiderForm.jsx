import { useForm } from 'react-hook-form';
import AgentImg from '../../assets/agent-pending.png';
import axios from 'axios';

const RiderForm = () => {
    // Initializing useForm hook from react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Function to handle form submission
    const onSubmit = async (data) => {
        // Prepare the data with status and timestamp
        const newData = {
            ...data,
            status: "pending",
            appliedAt: new Date().toISOString(),
        };

        console.log('Form submitted:', newData);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/riders`, newData);
            if (response.data.insertedId) {
                alert("✅ Rider application submitted successfully!");
                // Optionally, reset form or redirect
            } else {
                alert("❌ Submission failed. Please try again.");
            }

        } catch (error) {
            console.error("🚨 Error submitting application:", error);
            alert("❌ An error occurred. Please check console or try again later.");
        }
    };


    // List of predefined regions for the select dropdown
    const regions = [
        "Dhaka", "Chattogram", "Khulna", "Rajshahi",
        "Barisal", "Sylhet", "Rangpur", "Mymensingh"
    ];

    // List of available warehouses
    const warehouses = ["Wire-house X", "Wire-house Y", "Wire-house Z"];

    return (
        <div className="bg-white p-4 md:p-6 lg:p-12 flex justify-center items-center">
            <div className="w-full">
                {/* Section: Heading and description */}
                <div className="mb-10 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Be a Rider
                    </h1>
                    <p className="text-md lg:text-lg text-gray-600 max-w-3xl mx-auto lg:mx-0">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                {/* Form and image layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Form section */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-gray-900">Tell us about yourself</h3>

                        {/* Rider application form */}
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                            {/* Row 1: Full Name and Phone Number */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* Full Name Input */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        {...register("fullName", { required: true })}
                                        placeholder="John Doe"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    />
                                    {errors.fullName && <span className="text-red-500 text-sm">Full Name is required</span>}
                                </div>

                                {/* Phone Number Input with validation */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^01[0-9]{9}$/,
                                                message: "Phone number must start with 01 and be 11 digits"
                                            }
                                        })}
                                        placeholder="01XXXXXXXXX"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    />
                                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                                </div>

                            </div>

                            {/* Row 2: Email and NID */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email", { required: true })}
                                        placeholder="you@example.com"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    />
                                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                                </div>

                                {/* NID Number Input with validation */}
                                <div>
                                    <label htmlFor="nid" className="block text-sm font-medium text-gray-700">NID Number</label>
                                    <input
                                        type="text"
                                        id="nid"
                                        {...register("nid", {
                                            required: "NID is required",
                                            pattern: {
                                                value: /^(\d{10}|\d{13}|\d{17})$/,
                                                message: "NID must be 10, 13, or 17 digits"
                                            }
                                        })}
                                        placeholder="1234567890"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    />
                                    {errors.nid && <span className="text-red-500 text-sm">{errors.nid.message}</span>}
                                </div>

                            </div>

                            {/* Row 3: Vehicle Type and Region */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* Vehicle Type Input */}
                                <div>
                                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                                    <input
                                        type="text"
                                        id="vehicleType"
                                        {...register("vehicleType", { required: true })}
                                        placeholder="Bike, Scooter, etc."
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    />
                                    {errors.vehicleType && <span className="text-red-500 text-sm">Vehicle Type is required</span>}
                                </div>

                                {/* Region Select Dropdown */}
                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">Your Region</label>
                                    <select
                                        id="region"
                                        {...register("region", { required: true })}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    >
                                        <option value="">Select your region</option>
                                        {regions.map(region => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                    {errors.region && <span className="text-red-500 text-sm">Region is required</span>}
                                </div>
                            </div>

                            {/* Warehouse Selection */}
                            <div>
                                <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700">
                                    Which wire-house you want to work?
                                </label>
                                <select
                                    id="warehouse"
                                    {...register("warehouse", { required: true })}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                >
                                    <option value="">Select wire-house</option>
                                    {warehouses.map(w => (
                                        <option key={w} value={w}>{w}</option>
                                    ))}
                                </select>
                                {errors.warehouse && <span className="text-red-500 text-sm">Warehouse is required</span>}
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-lime-500 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition duration-150 ease-in-out"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Image section visible only on large screens */}
                    <div className="hidden lg:flex justify-center items-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <img
                            src={AgentImg}
                            alt="Rider delivering parcel"
                            className="max-w-full h-auto rounded-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/400x300/F0F0F0/888888?text=Image+Unavailable";
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiderForm;