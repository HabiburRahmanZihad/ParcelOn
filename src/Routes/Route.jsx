import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import MoreFAQs from '../Pages/MoreFAQs/MoreFAQs';
import Error from '../Pages/Error/Error';
import About from '../Pages/AboutUs/About';
import Coverage from '../Pages/Coverage/Coverage';
import BeRider from '../Pages/BeARider/BeRider';
import AuthLayout from '../Layout/AuthLayout';
import Signin from '../Pages/Authentication/Signin/Signin';
import SignUp from '../Pages/Authentication/Signup/SignUp';
import ForgetPass from '../Pages/Authentication/ForgetPassword/ForgetPass';
import UpdateProfile from '../Pages/Authentication/UpdateProfile/UpdateProfile';
import RiderForm from '../Pages/BeARider/RiderForm';
import MyProfile from '../Pages/MyProfile/MyProfile';
import PrivateRoute from './PrivateRoute';
import SendParcel from '../Pages/SendParcel/SendParcel';
import DashBoardLayout from '../Layout/DashBoardLayout';
import MyParcels from '../Pages/DashBoard/MyParcels/MyParcels';
import DashboardHome from '../Pages/DashBoard/DashboardHome/DashboardHome';
import ParcelDetails from '../Pages/DashBoard/MyParcels/ParcelDetails';
import Payment from '../Pages/DashBoard/Payment/Payment';
import PaymentHistory from '../Pages/DashBoard/PaymentHistory/PaymentHistory';
import TrackParcel from '../Pages/DashBoard/TrackParcel/TrackParcel';
import PendingRiders from '../Pages/DashBoard/PendingRiders/PendingRiders';
import ActiveRiders from '../Pages/DashBoard/ActiveRiders/ActiveRiders';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,


        children: [

            { index: true, element: <Home></Home> },

            { path: '/more-faq', Component: MoreFAQs },

            { path: '/about-us', Component: About },

            { path: '/coverage', element: <Coverage></Coverage> },

            { path: '/be-a-rider', element: <BeRider></BeRider> },

            { path: '/be-rider', element: <RiderForm></RiderForm> },

            { path: '/my-Profile', element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute> },

            { path: '/update-profile', element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute> },

            { path: '/send-a-parcel', element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute> },

            { path: '*', Component: Error },
        ]
    },

    {
        path: '/',
        element: <AuthLayout></AuthLayout>,


        children: [
            { path: '/signin', element: <Signin></Signin> },

            { path: '/signup', element: <SignUp></SignUp> },

            { path: '/forget-password', element: <ForgetPass></ForgetPass> },

            { path: '*', Component: Error },
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout /></PrivateRoute>,
        children: [
            { index: true, element: <DashboardHome /> },
            { path: 'my-parcels', element: <MyParcels /> },
            { path: 'payment-history', element: <PaymentHistory /> },
            { path: 'track', element: <TrackParcel /> },
            { path: 'parcels/:id', element: <PrivateRoute><ParcelDetails /></PrivateRoute> },
            { path: 'payment/:id', element: <PrivateRoute><Payment /></PrivateRoute> },

            // ✅ New Rider Routes
            { path: 'riders/pending', element: <PrivateRoute><PendingRiders /></PrivateRoute> },
            { path: 'riders/active', element: <PrivateRoute><ActiveRiders /></PrivateRoute> },
        ]
    }


]);