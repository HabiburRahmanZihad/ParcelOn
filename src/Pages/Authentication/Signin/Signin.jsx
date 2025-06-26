import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router';
import { AuthContext } from '../../../Provider/AuthContext';

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { signInUser } = useContext(AuthContext);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        console.log('Form data:', data);

        // Here you would typically call your sign-in function from AuthContext
        signInUser(data.email, data.password)
            .then(user => {
                console.log('User signed in:', user);
            })
            .catch(error => {
                console.error('Error signing in:', error);
                // Handle sign-in error (e.g., show a notification)
            });
        // Send login request here
        reset();
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-xl p-6 lg:p-8">
                <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-800 mb-2">Welcome Back</h1>
                <p className="text-gray-600 mb-6 font-bold">
                    Login with <Link className='text-lime-600' to='/'>ParcelOn</Link>
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email format',
                                },
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-lg leading-5 text-gray-600 hover:text-gray-900 focus:outline-none"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="flex justify-end mb-6">
                        <Link to='/forget-password' className="text-lg text-green-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-lime-500 text-neutral py-2 px-4 rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Continue
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Don't have any account?{' '}
                    <Link to="/signup" className="text-green-600 hover:underline font-medium">
                        Register
                    </Link>
                </p>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-4 bg-gray-50 border border-gray-300 rounded-md py-2 px-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105"
                >
                    <FaGoogle />
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Signin;