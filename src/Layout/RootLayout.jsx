import { Outlet, useLocation } from 'react-router';
import { motion } from 'framer-motion';

const Root = () => {
    const location = useLocation();

    return (
        <div className='container mx-auto'>
            <h1>navbar</h1>


            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                // className='min-h-[calc(100vh-381px)]'
            >
                <Outlet />
            </motion.div>

            <h1>footer</h1>
        </div>
    );
};

export default Root;