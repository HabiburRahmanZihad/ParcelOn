import { useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { Link } from 'react-router';

const UpdateProfile = () => {
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [errors, setErrors] = useState({});

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
            setErrors((prev) => ({ ...prev, photo: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let hasError = false;
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
            hasError = true;
        }

        if (!photo) {
            newErrors.photo = "Profile photo is required";
            hasError = true;
        }

        setErrors(newErrors);

        if (!hasError) {
            // Submit logic (e.g., API call)
            console.log("Updating profile with:", { email, photo });
        }

        // Reset form after submission
        setEmail('');
        setPhoto(null);
        setPhotoPreview(null);
        setErrors({});
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl p-6 lg:p-8"
            >
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Update Profile
                </h2>

                {/* Email Field */}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-lime-500 focus:border-lime-500`}
                        placeholder="you@example.com"
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                </div>

                {/* --- Photo Upload --- */}
                <div className="pb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Profile Photo
                    </label>
                    <div className="mt-2 flex justify-center items-center">
                        <label
                            htmlFor="photo-upload"
                            className={`relative cursor-pointer rounded-full h-32 w-32 flex items-center justify-center border-2 ${errors.photo
                                    ? 'border-red-500'
                                    : 'border-dashed border-gray-300'
                                } hover:border-lime-500 transition-all duration-300`}
                        >
                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <FiImage className="mx-auto h-8 w-8" />
                                    <span className="text-xs">Upload Photo</span>
                                </div>
                            )}
                            <input
                                id="photo-upload"
                                name="photo-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handlePhotoChange}
                            />
                        </label>
                    </div>
                    {errors.photo && (
                        <p className="text-red-500 text-xs mt-2 text-center">{errors.photo}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded-md transition duration-150"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;