import { Link } from 'react-router';
import ErrorImg from '../../assets/Error-img.png';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center  px-4  text-center bg-white">
            <img 
                className="w-full max-w-md " 
                src={ErrorImg} 
                alt="Error - Page not found" 
            />
            
            <Link
                to="/"
                className="text-lg md:text-xl font-bold text-[#1F1F1F] bg-[#CAEB66] px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-[#b7da5e] transition-all duration-300 mb-4"
            >
                Go Home
            </Link>
        </div>
    );
};

export default Error;