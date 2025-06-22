import { Outlet, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer/Footer';


const Root = () => {
    const location = useLocation();

    return (
        <div className='container mx-auto'>
            <Navbar></Navbar>


            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='min-h-[calc(100vh-560px)]'
            >
                <Outlet />
            </motion.div>

            <Footer></Footer>
        </div>
    );
};

export default Root;