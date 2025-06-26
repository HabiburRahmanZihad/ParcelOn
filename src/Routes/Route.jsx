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
    }
]);