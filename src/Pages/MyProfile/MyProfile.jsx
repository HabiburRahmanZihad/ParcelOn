import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import {
    FiUser,
    FiMail,
    FiCheckCircle,
    FiCalendar,
    FiEdit2,
    FiLogOut
} from 'react-icons/fi';
import { Link } from 'react-router';

const MyProfile = () => {
    const { user, loading, signOutUser } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-gray-500 text-lg font-medium">
                Loading profile...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-gray-500 text-lg font-medium">
                You are not logged in. Please sign in to view your profile.
            </div>
        );
    }

    const handleSignOut = async () => {
        try {
            await signOutUser();
            // Optionally, you can redirect or show a success message here
        } catch (error) {
            console.error('Sign out failed:', error);
            // Handle sign out error (e.g., show a notification)
        }
    }

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-10 bg-gray-50">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 lg:p-10 text-center transition-all duration-300">
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-6">
                    Great to see you again, {user?.displayName || 'User'}!
                </h2>


                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="h-32 w-32 rounded-full object-cover border-4 border-lime-500 shadow-md hover:shadow-lime-300 transition duration-300"
                        />
                    ) : (
                        <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-dashed">
                            <FiUser className="w-10 h-10" />
                        </div>
                    )}
                </div>

                {/* User Basic Info */}
                <p className="text-xl font-semibold text-gray-800 mb-1 flex items-center justify-center gap-2">
                    <FiUser className="w-5 h-5 text-lime-500" />
                    {user?.displayName || 'No name set'}
                </p>

                <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
                    <FiMail className="w-4 h-4 text-gray-400" />
                    {user?.email}
                </p>

                {/* Extra Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                        <FiCheckCircle className="w-5 h-5 text-lime-500" />
                        Email Verified: <strong>{user?.emailVerified ? 'Yes' : 'No'}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiCalendar className="w-5 h-5 text-lime-500" />
                        Created:{' '}
                        <strong>
                            {user?.metadata?.creationTime
                                ? new Date(user.metadata.creationTime).toLocaleDateString()
                                : 'N/A'}
                        </strong>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                        <span className="text-gray-500">UID:</span>
                        <span className="break-words">{user?.uid}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/update-profile"
                        className="flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-white py-2 px-6 rounded-full font-semibold transition duration-200 shadow-sm"
                    >
                        <FiEdit2 className="w-5 h-5" />
                        Update Profile
                    </Link>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full font-semibold transition duration-200 shadow-sm"
                    >
                        <FiLogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;