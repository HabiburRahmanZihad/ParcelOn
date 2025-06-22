import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import MoreFAQs from '../Pages/MoreFAQs/MoreFAQs';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,


        children: [

            { index: true, element: <Home></Home> },

            { path: '/more-faq', Component: MoreFAQs },

            { path: '*', element: <div className='text-center text-2xl font-bold'>404 Not Found</div> },
        ]
    },
]);