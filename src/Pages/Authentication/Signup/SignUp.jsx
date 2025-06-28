import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff, FiImage, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../../Provider/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import uploadImageToImgbb from '../../../hooks/uploadImageToImgbb';

const SignUp = () => {
    const { register, handleSubmit, watch, setError, clearErrors, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile, loginGoogle } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to the previous page or home after successful sign-in
    const from = location.state?.from?.pathname || '/';

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const profilePhoto = watch('profilePhoto');

    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    useEffect(() => {
        setPasswordCriteria({
            minLength: password?.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    }, [password]);

    useEffect(() => {
        if (profilePhoto && profilePhoto[0]) {
            setPhotoPreview(URL.createObjectURL(profilePhoto[0]));
            clearErrors('profilePhoto');
        }
    }, [profilePhoto, clearErrors]);

    useEffect(() => {
        if (confirmPassword && password !== confirmPassword) {
            setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
        } else {
            clearErrors('confirmPassword');
        }
    }, [confirmPassword, password, setError, clearErrors]);

    const PasswordRequirement = ({ met, text }) => (
        <li className={`flex items-center transition-colors duration-300 ${met ? 'text-green-600' : 'text-gray-500'}`}>
            {met ? <FiCheckCircle className="mr-2 w-4 h-4" /> : <FiXCircle className="mr-2 w-4 h-4" />}
            <span>{text}</span>
        </li>
    );

    //handle form submission
    const onSubmit = async (data) => {
        // Check if password meets all defined criteria
        const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
        if (!allCriteriaMet) {
            setError('password', { type: 'manual', message: 'Password does not meet all criteria.' });
            return;
        }

        // Ensure a profile photo was selected
        if (!data.profilePhoto || data.profilePhoto.length === 0) {
            setError('profilePhoto', { type: 'manual', message: 'Profile photo is required.' });
            return;
        }

        // Check image size limit (2MB)
        if (data.profilePhoto[0].size > 2 * 1024 * 1024) {
            setError('profilePhoto', { type: 'manual', message: 'Profile photo must be less than 2MB.' });
            return;
        }

        // Log form data before processing (for debugging)
        console.log("📋 Form Data:", data);

        try {
            // 1️⃣ Create the user account with email & password
            await createUser(data.email, data.password);

            // 2️⃣ Upload the profile photo to imgbb and get the image URL
            const imageUrl = await uploadImageToImgbb(data.profilePhoto[0]);

            // 3️⃣ Update the user's profile (display name and photo URL)
            await updateUserProfile({
                displayName: data.name,
                photoURL: imageUrl, // ✅ This sets the photo in Firebase user profile
            });

            // 4️⃣ Prepare user data to save in your own database
            const userInfo = {
                name: data.name,
                email: data.email,
                profilePhoto: imageUrl,
            };

            // Log user info to be sent to the database
            console.log("✅ User info to be saved:", userInfo);

            // 5️⃣ Save the user data in your external DB
            await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

            // 6️⃣ Notify the user and redirect
            Swal.fire("Success", "User created successfully!", "success");
            reset();               // Clear form fields
            setPhotoPreview(null); // Reset image preview
            navigate(from, { replace: true }); // Redirect to the desired route

        } catch (error) {
            // Handle errors (from Firebase or imgbb or API)
            console.error("❌ Signup error:", error);

            Swal.fire("Error", error.message || "Something went wrong", "error");

            // Optionally show the error message near the email field
            setError("email", { type: "manual", message: error.message });
        }
    };

    const handleGoogleSignIn = async () => {
        // Step-01: User clicks Google Sign-In button
        console.log('🟡 Google Sign-In clicked');

        try {
            // Step-02: Trigger Firebase Google login via popup
            const res = await loginGoogle(); // From AuthContext
            const firebaseUser = res.user;

            console.log("✅ Google sign-in result:", firebaseUser);

            // Step-03: Extract the email safely
            const userEmail = firebaseUser.email;

            // Step-04: Handle missing email (can occur with anonymous/disabled Google accounts)
            if (!userEmail) {
                throw new Error("❌ No email found in Google account. Cannot proceed with registration.");
            }

            // Step-05: Prepare user info object to be saved in your own backend DB
            const userInfo = {
                name: firebaseUser.displayName,
                email: userEmail,
                profilePhoto: firebaseUser.photoURL,
            };

            // Step-06: Check if the user already exists in your backend
            const checkRes = await axios.get(`${import.meta.env.VITE_API_URL}/users?email=${encodeURIComponent(userEmail)}`);

            if (!checkRes.data.exists) {
                // Step-07: If user doesn't exist → Create new user in DB
                await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
                console.log("✅ New Google user saved to DB");
            } else {
                // Step-08: If user exists → Update profile photo if missing or outdated
                const dbUser = checkRes.data.user;

                if (!dbUser.profilePhoto || dbUser.profilePhoto !== firebaseUser.photoURL) {
                    await axios.patch(`${import.meta.env.VITE_API_URL}/users/${encodeURIComponent(userEmail)}`, {
                        profilePhoto: firebaseUser.photoURL
                    });
                    console.log("🔄 Google user profile photo updated in DB");
                } else {
                    console.log("ℹ️ Google user already exists and profile is up to date");
                }
            }

            // Step-09: Notify user and redirect to the intended page
            await Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: `Welcome back, ${userInfo.name}!`,
                confirmButtonColor: "#3085d6",
            });

            navigate(from, { replace: true }); // Go to previous route or home

        } catch (error) {
            // Step-10: Catch all possible errors and show feedback
            console.error('❌ Google Sign-In error:', error);

            let errorMessage = "Something went wrong. Please try again.";

            if (error.code === "auth/popup-closed-by-user") {
                errorMessage = "You closed the sign-in popup before completing the process.";
            } else if (error.code === "auth/network-request-failed") {
                errorMessage = "Network error. Please check your internet connection and try again.";
            } else if (error.code === "auth/user-disabled") {
                errorMessage = "This Google account has been disabled.";
            } else if (error.code === "auth/account-exists-with-different-credential") {
                errorMessage = "An account already exists with this email using a different sign-in method.";
            } else if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || "Database error. Please try again.";
            } else if (error.message) {
                errorMessage = error.message;
            }

            // Step-11: Show error alert to the user
            await Swal.fire({
                icon: "error",
                title: "Google Sign-In Failed",
                text: errorMessage,
                confirmButtonColor: "#d33",
            });
        }
    };



    return (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-xl p-6 lg:p-8">
                <div className="text-center">
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2">Create an Account</h1>
                    <p className="text-gray-600 font-bold">
                        Register with <Link className='text-lime-600' to='/'>ParcelOn</Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

                    {/* Legal Name */}
                    <div className='mt-8'>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Enter your Legal name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', {
                                required: 'Name is required.',
                                minLength: {
                                    value: 4,
                                    message: 'Name must be at least 4 characters.',
                                }
                            })}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'
                                }`}
                            placeholder="Your full legal name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required.',
                                pattern: {
                                    value: /^\S+@\S+$/,
                                    message: 'Invalid email format.',
                                },
                            })}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'
                                }`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            {...register('password', { required: 'Password is required.' })}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 pr-12 transition-colors ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'
                                }`}
                            placeholder="Enter a secure password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 top-7 pr-4 flex items-center text-gray-500 hover:text-gray-800"
                        >
                            {showPassword ? <FiEyeOff className="w-6 h-6" /> : <FiEye className="w-6 h-6" />}
                        </button>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Password Criteria */}
                    <ul className="text-sm space-y-1">
                        <PasswordRequirement met={passwordCriteria.minLength} text="At least 8 characters" />
                        <PasswordRequirement met={passwordCriteria.uppercase} text="Contains an uppercase letter" />
                        <PasswordRequirement met={passwordCriteria.lowercase} text="Contains a lowercase letter" />
                        <PasswordRequirement met={passwordCriteria.number} text="Contains a number" />
                        <PasswordRequirement met={passwordCriteria.specialChar} text="Contains a special character (!@#...)" />
                    </ul>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password.',
                                validate: (value) =>
                                    value === password || 'Passwords do not match.',
                            })}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 pr-12 transition-colors ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'
                                }`}
                            placeholder="Re-enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 top-7 pr-4 flex items-center text-gray-500 hover:text-gray-800"
                        >
                            {showConfirmPassword ? <FiEyeOff className="w-6 h-6" /> : <FiEye className="w-6 h-6" />}
                        </button>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>


                    {/* Profile Photo */}
                    <div className="pb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Profile Photo</label>
                        <div className="mt-2 flex justify-center items-center">
                            <label htmlFor="profilePhoto" className={`relative cursor-pointer rounded-full h-32 w-32 flex items-center justify-center border-2 ${errors.profilePhoto ? 'border-red-500' : 'border-dashed border-gray-300'
                                } hover:border-lime-500 transition-all duration-300`}>
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" className="h-full w-full object-cover rounded-full" />
                                ) : (
                                    <div className="text-gray-400 text-center">
                                        <FiImage className="mx-auto h-8 w-8" />
                                        <span className="text-xs">Upload Photo</span>
                                    </div>
                                )}
                                <input
                                    id="profilePhoto"
                                    type="file"
                                    accept="image/*"
                                    {...register('profilePhoto')}
                                    className="sr-only"
                                />
                            </label>
                        </div>
                        {errors.profilePhoto && <p className="text-red-500 text-xs mt-2 text-center">{errors.profilePhoto.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-lime-500 text-white font-bold py-3 px-4 rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-sm">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="w-full flex items-center justify-center gap-4 bg-white border border-gray-300 rounded-md py-3 px-4 text-gray-700 font-bold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                    <FcGoogle className="w-5 h-5" />
                    Register with Google
                </button>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-green-600 hover:underline font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;