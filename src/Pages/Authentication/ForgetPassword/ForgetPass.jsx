import { Link } from "react-router";
import { useForm } from "react-hook-form";

const ForgetPass = () => {
    const {register,handleSubmit,formState: { errors },reset} = useForm();

    const onSubmit = (data) => {
        console.log("Reset link sent to:", data.email);
        // TODO: implement backend request
        reset();
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-xl p-6 lg:p-8">
                <h2 className="text-4xl font-extrabold text-gray-900">
                    Forgot Password !!!
                </h2>
                <p className="mt-2 text-sm text-black">
                    Enter your email address and we'll send you a reset link.
                </p>

                <form className="space-y-6 mt-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                className={`appearance-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-lime-500 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition duration-150 ease-in-out"
                        >
                            Continue
                        </button>
                    </div>
                </form>

                {/* Link to Login */}
                <div className="text-center text-sm mt-6">
                    <p className="text-gray-600">
                        Remember your password?{' '}
                        <Link to="/signin" className="font-medium text-lime-600 hover:text-lime-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;