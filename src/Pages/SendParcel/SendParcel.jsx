import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form"; // Form management
import { FiBox } from "react-icons/fi"; // Box icon
import Swal from "sweetalert2"; // Alert/confirmation dialog
import { AuthContext } from "../../Provider/AuthContext"; // Auth info from context
import warehouseData from "../../assets/warehouses.json"; // Static warehouse location data


// ✅ Add custom styles for SweetAlert2 (instead of importing CSS)
const swalStyles = document.createElement("style");
swalStyles.innerHTML = `
.swal2-popup {
    font-size: 1rem !important;
    border-radius: 0.5rem !important;
}
.swal2-title {
    font-weight: 600 !important;
    color: #002E25 !important;
}
.swal2-confirm {
    background-color: #84cc16 !important;
}
.swal2-cancel {
    background-color: #f87171 !important;
}
`;
document.head.appendChild(swalStyles);



// ✅ Component to show error messages
const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
};

const SendParcel = () => {

    const { user } = useContext(AuthContext); // Get current logged-in user

    // ✅ Initialize form with default values using react-hook-form
    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            parcelType: "document",
            parcelName: "",
            parcelWeight: "",
            senderName: user?.displayName || "",
            senderRegion: "",
            senderDistrict: "",
            senderCity: "",
            senderCoveredArea: "",
            senderAddress: "",
            senderContact: "",
            pickupInstruction: "",
            receiverName: "",
            receiverRegion: "",
            receiverDistrict: "",
            receiverCity: "",
            receiverCoveredArea: "",
            receiverAddress: "",
            receiverContact: "",
            deliveryInstruction: "",
        },
    });





    // ✅ Watching form fields for dynamic updates
    const parcelType = watch("parcelType");
    const senderRegion = watch("senderRegion");
    const senderDistrict = watch("senderDistrict");
    const senderCity = watch("senderCity");
    const receiverRegion = watch("receiverRegion");
    const receiverDistrict = watch("receiverDistrict");
    const receiverCity = watch("receiverCity");





    // ✅ Extract unique regions from warehouse data
    const regions = [...new Set(warehouseData.map(item => item.region))];

    // ✅ Utility to get districts based on region
    const getDistrictsByRegion = (region) => {
        if (!region) return [];
        return [...new Set(warehouseData.filter(item => item.region === region).map(item => item.district))];
    };

    // ✅ Utility to get cities based on district
    const getCitiesByDistrict = (region, district) => {
        if (!region || !district) return [];
        return [...new Set(warehouseData.filter(item => item.region === region && item.district === district).map(item => item.city))];
    };

    // ✅ Utility to get covered areas based on city
    const getCoveredAreasByCity = (region, district, city) => {
        if (!region || !district || !city) return [];
        const warehouse = warehouseData.find(item => item.region === region && item.district === district && item.city === city);
        return warehouse ? warehouse.covered_area : [];
    };

    // ✅ Clear dependent fields when parent field changes (cascading dropdown)
    useEffect(() => {
        setValue("senderDistrict", "");
        setValue("senderCity", "");
        setValue("senderCoveredArea", "");
    }, [senderRegion, setValue]);

    useEffect(() => {
        setValue("senderCity", "");
        setValue("senderCoveredArea", "");
    }, [senderDistrict, setValue]);

    useEffect(() => {
        setValue("senderCoveredArea", "");
    }, [senderCity, setValue]);

    useEffect(() => {
        setValue("receiverDistrict", "");
        setValue("receiverCity", "");
        setValue("receiverCoveredArea", "");
    }, [receiverRegion, setValue]);

    useEffect(() => {
        setValue("receiverCity", "");
        setValue("receiverCoveredArea", "");
    }, [receiverDistrict, setValue]);

    useEffect(() => {
        setValue("receiverCoveredArea", "");
    }, [receiverCity, setValue]);

    // ✅ Automatically scroll to the first validation error
    useEffect(() => {
        const keys = Object.keys(errors);
        if (keys.length > 0) {
            const fieldName = keys[0];
            const fieldElement = document.querySelector(`[name="${fieldName}"]`);
            if (fieldElement?.scrollIntoView) {
                fieldElement.scrollIntoView({ behavior: "smooth", block: "center" });
                fieldElement.focus({ preventScroll: true });
            }
        }
    }, [errors]);







    // ✅ Calculate delivery cost based on parcel type and weight
    const calculateCost = (data) => {
        const { parcelType, parcelWeight, senderCity, receiverCity } = data;

        const isSameCity = senderCity && receiverCity && senderCity === receiverCity;

        if (parcelType === "document") {
            return isSameCity ? 60 : 80;
        }

        const weight = parseFloat(parcelWeight || 0);

        if (weight <= 3) {
            return isSameCity ? 110 : 150;
        }

        // Weight above 3kg
        const additionalKg = Math.ceil(weight - 3); // Round up
        const extraCost = additionalKg * 40;
        return isSameCity ? 110 + extraCost : 150 + extraCost + 40;
    };


    // ✅ Handle form submission
    const onSubmit = (data) => {
        const cost = calculateCost(data);

        const FormData = {
            ...data,
            deliveryCost: cost,
            creation_date: new Date().toISOString(),
        };

        Swal.fire({
            icon: "info",
            title: `Estimated Delivery Cost: ৳${cost}`,
            text: "Click Confirm to finalize booking.",
            showCancelButton: true,
            confirmButtonText: "Confirm Booking",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) confirmBooking(FormData);
        });
    };

    // ✅ Final confirmation and reset form
    const confirmBooking = (bookingData) => {
        console.log("Saving parcel:", bookingData || "No booking data!");
        if (!bookingData) {
            Swal.fire("Error!", "No booking data found.", "error");
            return;
        }

        Swal.fire("Success!", "Your parcel has been booked.", "success");
        reset();
    };


    // ✅ Render form UI
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            <h1 className="text-4xl font-bold text-[#002E25] flex items-center gap-2">
                <FiBox className="text-lime-500" /> Add Parcel
            </h1>

            <hr className="my-6 border-gray-800 border-dashed" />

            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Parcel Type */}
                <fieldset className="flex flex-wrap items-center gap-6 mb-8">
                    {["document", "non-document"].map((type) => (
                        <label
                            key={type}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="radio"
                                value={type}
                                {...register("parcelType", { required: "Select parcel type" })}
                                className="accent-lime-500"
                                defaultChecked={type === "document"}
                            />
                            <span className="text-[#002E25]">
                                {type === "document" ? "Document" : "Non-Document"}
                            </span>
                        </label>
                    ))}
                </fieldset>
                <ErrorMessage error={errors.parcelType} />

                {/* Parcel Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Parcel Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Parcel Name"
                            {...register("parcelName", {
                                required: "Parcel Name is required",
                            })}
                            className={`border p-2 w-full rounded ${errors.parcelName ? "border-red-500" : "border-gray-300"
                                } focus:ring-lime-500`}
                        />
                        <ErrorMessage error={errors.parcelName} />
                    </div>

                    {/* Parcel Weight */}
                    <div>
                        <input
                            type="number"
                            placeholder="Parcel Weight (KG) — default 0"
                            min="0"
                            step="0.01"
                            disabled={parcelType === "document"}
                            {...register("parcelWeight", {
                                validate: (v) => {
                                    if (parcelType === "non-document") {
                                        if (!v) return "Weight is required for non-document";
                                        if (parseFloat(v) < 0) return "Weight must be non-negative";
                                    }
                                    return true;
                                },
                            })}
                            className={`border p-2 w-full rounded ${errors.parcelWeight ? "border-red-500" : "border-gray-300"}
        ${parcelType === "document" ? "bg-gray-100 cursor-not-allowed" : ""}
        focus:ring-lime-500`}
                        />
                        <ErrorMessage error={errors.parcelWeight} />
                    </div>
                </div>

                {/* Sender & Receiver */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Sender */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-[#002E25] text-lg">
                            Sender Details
                        </h3>

                        {/* Sender Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Sender Name"
                                disabled
                                {...register("senderName", { required: true })}
                                className="border border-gray-300 p-2 w-full rounded bg-gray-100 cursor-not-allowed"
                            />
                            <ErrorMessage error={errors.senderName} />
                        </div>

                        {/* Sender Location Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <select
                                    {...register("senderRegion", {
                                        required: "Select a region",
                                    })}
                                    className={`border p-2 w-full rounded ${errors.senderRegion
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-lime-500`}
                                >
                                    <option value="">Select Region</option>
                                    {regions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage error={errors.senderRegion} />
                            </div>
                            <div>
                                <select
                                    {...register("senderDistrict", {
                                        required: "Select a district",
                                    })}
                                    className={`border p-2 w-full rounded ${errors.senderDistrict
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-lime-500`}
                                    disabled={!senderRegion}
                                >
                                    <option value="">Select District</option>
                                    {getDistrictsByRegion(senderRegion).map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage error={errors.senderDistrict} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <select
                                    {...register("senderCity", {
                                        required: "Select a city",
                                    })}
                                    className={`border p-2 w-full rounded ${errors.senderCity
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-lime-500`}
                                    disabled={!senderDistrict}
                                >
                                    <option value="">Select City</option>
                                    {getCitiesByDistrict(senderRegion, senderDistrict).map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage error={errors.senderCity} />
                            </div>
                            <div>
                                <select
                                    {...register("senderCoveredArea", {
                                        required: "Select a covered area",
                                    })}
                                    className={`border p-2 w-full rounded ${errors.senderCoveredArea
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-lime-500`}
                                    disabled={!senderCity}
                                >
                                    <option value="">Select Covered Area</option>
                                    {getCoveredAreasByCity(senderRegion, senderDistrict, senderCity).map((area) => (
                                        <option key={area} value={area}>
                                            {area}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage error={errors.senderCoveredArea} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    {...register("senderAddress", {
                                        required: "Address is required",
                                    })}
                                    className={`border p-2 w-full rounded ${errors.senderAddress ? "border-red-500" : "border-gray-300"
                                        } focus:ring-lime-500`}
                                />
                                <ErrorMessage error={errors.senderAddress} />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Sender Contact No"
                                    {...register("senderContact", {
                                        required: "Contact no is required",
                                        pattern: {
                                            value: /^(?:\+?88)?01[3-9]\d{8}$/,
                                            message: "Enter valid Bangladeshi number",
                                        },
                                    })}
                                    className={`border p-2 w-full rounded ${errors.senderContact ? "border-red-500" : "border-gray-300"
                                        } focus:ring-lime-500`}
                                />
                                <ErrorMessage error={errors.senderContact} />
                            </div>
                        </div>

                        <div>
                            <textarea
                                rows={3}
                                placeholder="Pickup Instruction"
                                {...register("pickupInstruction", {
                                    required: "Pickup instruction is required",
                                })}
                                className={`border p-2 w-full rounded resize-none ${errors.pickupInstruction
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } focus:ring-lime-500`}
                            />
                            <ErrorMessage error={errors.pickupInstruction} />
                        </div>
                    </div>

                    {/* Receiver */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-[#002E25] text-lg">
                            Receiver Details
                        </h3>

                        <div>
                            <input
                                type="text"
                                placeholder="Receiver Name"
                                {...register("receiverName", {
                                    required: "Receiver name is required",
                                })}
                                className={`border p-2 w-full rounded ${errors.receiverName ? "border-red-500" : "border-gray-300"
                                    } focus:ring-lime-500`}
                            />
                            <ErrorMessage error={errors.receiverName} />
                        </div>

                        {/* Receiver Location Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <select
                                    {...register("receiverRegion", {
                                        required: "Select a region",
                                    })}
                                    className={`border p-2 w-full rounded ${errors.receiverRegion
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-lime-500`}
                                >
                                    <option value="">Select Region</option>
                                    {regions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage error={errors.receiverRegion} />
                            </div>
                            <div>
                                <select
                                    {...register("receiverDistrict", {
                                        required: "Select a district",
                                    })}
                                    className={`border p-2 w-full rounded ${errors.receiverDistrict
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-lime-500`}
                                    disabled={!receiverRegion}
                                >
                                    <option value="">Select District</option>
                                    {getDistrictsByRegion(receiverRegion).map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage error={errors.receiverDistrict} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <select
                                    {...register("receiverCity", {
                                        required: "Select a city",
                                    })}
                                    className={`border p-2 w-full rounded ${errors.receiverCity
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-lime-500`}
                                    disabled={!receiverDistrict}
                                >
                                    <option value="">Select City</option>
                                    {getCitiesByDistrict(receiverRegion, receiverDistrict).map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage error={errors.receiverCity} />
                            </div>
                            <div>
                                <select
                                    {...register("receiverCoveredArea", {
                                        required: "Select a covered area",
                                    })}
                                    className={`border p-2 w-full rounded ${errors.receiverCoveredArea
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-lime-500`}
                                    disabled={!receiverCity}
                                >
                                    <option value="">Select Covered Area</option>
                                    {getCoveredAreasByCity(receiverRegion, receiverDistrict, receiverCity).map((area) => (
                                        <option key={area} value={area}>
                                            {area}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage error={errors.receiverCoveredArea} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    {...register("receiverAddress", {
                                        required: "Address is required",
                                    })}
                                    className={`border p-2 w-full rounded ${errors.receiverAddress
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-lime-500`}
                                />
                                <ErrorMessage error={errors.receiverAddress} />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Receiver Contact No"
                                    {...register("receiverContact", {
                                        required: "Contact no is required",
                                        pattern: {
                                            value: /^(?:\+?88)?01[3-9]\d{8}$/,
                                            message: "Enter valid Bangladeshi number",
                                        },
                                    })}
                                    className={`border p-2 w-full rounded ${errors.receiverContact
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-lime-500`}
                                />
                                <ErrorMessage error={errors.receiverContact} />
                            </div>
                        </div>

                        <div>
                            <textarea
                                rows={3}
                                placeholder="Delivery Instruction"
                                {...register("deliveryInstruction", {
                                    required: "Delivery instruction is required",
                                })}
                                className={`border p-2 w-full rounded resize-none ${errors.deliveryInstruction
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } focus:ring-lime-500`}
                            />
                            <ErrorMessage error={errors.deliveryInstruction} />
                        </div>
                    </div>

                </div>

                <p className="text-sm font-bold mt-6 text-lime-800 italic">
                    * Pickup time is approximately between 4 PM and 7 PM.
                </p>

                {/* Display estimated cost for document & non-document parcels */}
                {receiverCity && senderCity && (
                    <p className="text-md font-semibold text-blue-600 mt-4">
                        💰 Estimated Delivery Cost: ৳{calculateCost(watch())}
                    </p>
                )}

                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-md font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    >
                        Proceed to Confirm Booking
                    </button>
                </div>

            </form>

        </div>
    );
};

export default SendParcel;