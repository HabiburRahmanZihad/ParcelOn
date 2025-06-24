import { useState } from 'react';
import AgentImg from '../../assets/agent-pending.png';

const RiderForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        nid: '',
        vehicleType: '',
        region: '',
        warehouse: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const regions = [
        "Dhaka", "Chattogram", "Khulna", "Rajshahi",
        "Barisal", "Sylhet", "Rangpur", "Mymensingh"
    ];

    const warehouses = ["Wire-house X", "Wire-house Y", "Wire-house Z"];

    return (
        <div className=" bg-white p-4 md:p-6 lg:p-12 flex justify-center items-center">

            <div className="w-full">
                <div className="mb-10 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Be a Rider
                    </h1>
                    <p className="text-md lg:text-lg text-gray-600 max-w-3xl mx-auto lg:mx-0">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-gray-900">Tell us about yourself</h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="01XXXXXXXXX"
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="nid" className="block text-sm font-medium text-gray-700">NID Number</label>
                                    <input
                                        type="text"
                                        name="nid"
                                        id="nid"
                                        value={formData.nid}
                                        onChange={handleChange}
                                        placeholder="1234567890"
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                                    <input
                                        type="text"
                                        name="vehicleType"
                                        id="vehicleType"
                                        value={formData.vehicleType}
                                        onChange={handleChange}
                                        placeholder="Bike, Scooter, etc."
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">Your Region</label>
                                    <select
                                        name="region"
                                        id="region"
                                        value={formData.region}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                    >
                                        <option value="">Select your region</option>
                                        {regions.map((region) => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700">
                                    Which wire-house you want to work?
                                </label>
                                <select
                                    name="warehouse"
                                    id="warehouse"
                                    value={formData.warehouse}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 lg:text-sm"
                                >
                                    <option value="">Select wire-house</option>
                                    {warehouses.map((w) => (
                                        <option key={w} value={w}>{w}</option>
                                    ))}
                                </select>
                            </div>

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
