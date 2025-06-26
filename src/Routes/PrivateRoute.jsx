import { use } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { Navigate, useLocation } from 'react-router';


const PrivateRoute = ({ children }) => {

    const location = useLocation();

    const { user, loading } = use(AuthContext);


    if (loading) {
        return <p className="text-center py-10 text-gray-500">Loading...</p>;
    }

    if (!user) {
        // return <Navigate state={location?.pathname} to="/signin" />;
        // When redirecting unauthenticated user to signin:
        return <Navigate to="/signin" state={{ from: location }} replace />;

    }

    return children;
};

export default PrivateRoute;