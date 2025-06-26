import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiImage } from 'react-icons/fi';
import { AuthContext } from '../../../Provider/AuthContext';
import axios from 'axios';

const UpdateProfile = () => {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            photo: null,
        }
    });

    const { user, loading, updateUserProfile } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            reset({
                name: user.displayName || '',
                photo: null,
            });
        }
    }, [user, reset]);

    const photo = watch('photo');
    const photoPreview =
        photo && typeof photo === 'object' && photo.length > 0
            ? URL.createObjectURL(photo[0])
            : null;

    const onSubmit = (data) => {
        const file = data.photo?.[0];

        if (!file) {
            setError('photo', {
                type: 'manual',
                message: 'Profile photo is required',
            });
            return;
        }

        console.log('Updating profile with:', {
            name: data.name,
            photo: file,
        });

        const profileData = {
            displayName: data.name
        };
        updateUserProfile(profileData)
            .then(() => {
                // update profile data in the database
                axios.patch(`${import.meta.env.VITE_API_URL}/users/${user.email}`, {
                    name: data.name
                })
                    .then(() => {
                        console.log('✅ Name updated in database');
                    })
                    .catch((error) => {
                        console.error('❌ Error updating name:', error);
                    });

                console.log('Profile updated successfully');
                reset({
                    name: data.name,
                    photo: null,
                });
                // redirect to my profile
                window.location.href = '/my-profile';
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
                setError('photo', {
                    type: 'manual',
                    message: 'Failed to update profile photo',
                });
            });
    };

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading...</div>;
    }

    return (
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-xl bg-white shadow-md rounded-md p-6 lg:p-8"
            >
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Update Your Profile
                </h2>

                {/* Name Field */}
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 4,
                                message: 'Name must be at least 4 characters long',
                            },
                        })}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Profile Photo Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Profile Photo
                    </label>
                    <div className="flex justify-center">
                        <label
                            htmlFor="photo-upload"
                            className={`relative cursor-pointer rounded-full h-32 w-32 flex items-center justify-center border-2 ${errors.photo ? 'border-red-500' : 'border-dashed border-gray-300'
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
                                type="file"
                                accept="image/*"
                                {...register('photo', {
                                    validate: (value) =>
                                        value?.length > 0 || 'Profile photo is required',
                                })}
                                className="sr-only"
                            />
                        </label>
                    </div>
                    {errors.photo && (
                        <p className="text-red-500 text-xs mt-2 text-center">{errors.photo.message}</p>
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