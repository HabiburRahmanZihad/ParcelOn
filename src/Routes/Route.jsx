import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import MoreFAQs from '../Pages/MoreFAQs/MoreFAQs';
import Error from '../Pages/Error/Error';
import About from '../Pages/AboutUs/About';
import Coverage from '../Pages/Coverage/Coverage';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,


        children: [

            { index: true, element: <Home></Home> },

            { path: '/more-faq', Component: MoreFAQs },

            { path: '/about-us', Component: About },

            { path: '/coverage', element: <Coverage></Coverage> },

            { path: '*', Component: Error },
        ]
    },
]);