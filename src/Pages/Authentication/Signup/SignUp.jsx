import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff, FiImage, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';


const SignUp = () => {
    // State for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    // State for UI control
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    // State for real-time password validation feedback
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    // --- Handlers ---
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
            if (errors.photo) {
                setErrors(prev => ({ ...prev, photo: null }));
            }
        }
    };

    // Real-time password validation check
    useEffect(() => {
        setPasswordCriteria({
            minLength: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    }, [password]);


    const validateForm = () => {
        const newErrors = {};

        // Email validation (using a simple regex)
        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid.';
        }

        // Password validation (all criteria must be met)
        const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (!allCriteriaMet) {
            newErrors.password = 'Password does not meet all criteria.';
        }

        // Confirm password validation
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        // Photo validation
        if (!profilePhoto) {
            newErrors.photo = 'Profile photo is required.';
        }

        setErrors(newErrors);
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // --- Form submission logic goes here ---
            // For demonstration, we'll just log the data.
            console.log('Form submitted successfully!');
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Photo:', profilePhoto);
            // You would typically send this data to a server here.
            alert('Account created successfully! Check the console for data.');
        } else {
            console.log('Form has errors:', errors);
        }
    };

    // --- Password Requirement Item Component ---
    const PasswordRequirement = ({ met, text }) => (
        <li className={`flex items-center transition-colors duration-300 ${met ? 'text-green-600' : 'text-gray-500'}`}>
            {met ? <FiCheckCircle className="mr-2 w-4 h-4" /> : <FiXCircle className="mr-2 w-4 h-4" />}
            <span>{text}</span>
        </li>
    );


    return (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-xl  p-6 lg:p-8">

                {/* --- Header --- */}
                <div className="text-center">
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2">Create an Account</h1>
                    <p className="text-gray-600 font-bold">Register with <Link className='text-lime-600' to='/'>ParcelOn</Link> </p>
                </div>

                {/* --- Form --- */}
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                    {/* --- Email Input --- */}
                    <div className='mt-8'>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'}`}
                            placeholder="you@example.com"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* --- Password Input --- */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors pr-12 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'}`}
                            placeholder="Enter a secure password"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 top-7 pr-4 flex items-center text-gray-500 hover:text-gray-800">
                            {showPassword ? <FiEyeOff className="w-6 h-6" /> : <FiEye className="w-6 h-6" />}
                        </button>

                    </div>

                    {/* --- Password Criteria --- */}
                    <ul className="text-sm space-y-1">
                        <PasswordRequirement met={passwordCriteria.minLength} text="At least 8 characters" />
                        <PasswordRequirement met={passwordCriteria.uppercase} text="Contains an uppercase letter" />
                        <PasswordRequirement met={passwordCriteria.lowercase} text="Contains a lowercase letter" />
                        <PasswordRequirement met={passwordCriteria.number} text="Contains a number" />
                        <PasswordRequirement met={passwordCriteria.specialChar} text="Contains a special character (!@#...)" />
                    </ul>

                    {/* --- Confirm Password Input --- */}
                    <div className="relative">
                        <label htmlFor="confirm-password" className="block text-sm font-bold text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors pr-12 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'}`}
                            placeholder="Re-enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 top-7 pr-4 flex items-center text-gray-500 hover:text-gray-800"
                        >
                            {showConfirmPassword ? <FiEyeOff className="w-6 h-6" /> : <FiEye className="w-6 h-6" />}
                        </button>


                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* --- Photo Upload --- */}
                    <div className="pb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Profile Photo
                        </label>
                        <div className="mt-2 flex justify-center items-center">
                            <label htmlFor="photo-upload" className={`relative cursor-pointer rounded-full h-32 w-32 flex items-center justify-center border-2 ${errors.photo ? 'border-red-500' : 'border-dashed border-gray-300'} hover:border-lime-500 transition-all duration-300`}>
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" className="h-full w-full object-cover rounded-full" />
                                ) : (
                                    <div className="text-gray-400 text-center">
                                        <FiImage className="mx-auto h-8 w-8" />
                                        <span className="text-xs">Upload Photo</span>
                                    </div>

                                )}
                                <input id="photo-upload" name="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handlePhotoChange} />
                            </label>
                        </div>
                        {errors.photo && <p className="text-red-500 text-xs mt-2 text-center">{errors.photo}</p>}
                    </div>

                    {/* --- Submit Button --- */}
                    <button
                        type="submit"
                        className="w-full bg-lime-500 text-white font-bold py-3 px-4 rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                        Create Account
                    </button>
                </form>

                {/* --- Or Separator --- */}
                <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-sm">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* --- Register with Google Button --- */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-4 bg-white border border-gray-300 rounded-md py-3 px-4 text-gray-700 font-bold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                    <FcGoogle className="w-5 h-5" />
                    Register with google
                </button>

                {/* --- Login Link --- */}
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


// To make this a runnable app, we'll export it as the default App component.
export default SignUp;