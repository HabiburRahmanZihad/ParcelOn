import { Link } from 'react-router';
import {
    FaLinkedinIn,
    FaXTwitter,
    FaFacebookF,
    FaYoutube
} from 'react-icons/fa6';
import Logo from '../Logo/Logo';

const Footer = () => {
    return (
        <footer className="bg-black text-white px-4 py-10 md:py-14 mt-4 md:rounded-3xl md:my-10">
            <div className="max-w-6xl mx-auto text-center space-y-6">
                {/* Logo & Description */}
                <div className='flex flex-col items-center space-y-4'>
                    <Logo></Logo>
                    <p className="mt-2 text-sm md:text-base max-w-xl mx-auto text-gray-300">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                {/* Navigation Links */}
                <hr className="border-t border-dashed border-gray-600" />
                <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base font-medium text-gray-200">
                    <Link to="/services">Services</Link>
                    <Link to="/coverage">Coverage</Link>
                    <Link to="/about-us">About Us</Link>
                    <Link to="/pricing">Pricing</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <hr className="border-t border-dashed border-gray-600" />

                {/* Social Icons */}
                <div className="flex justify-center items-center gap-5 mt-4">
                    <Link to="https://linkedin.com/ParcelOn" target='_blank' className="bg-white text-blue-700 p-2 rounded-full text-lg">
                        <FaLinkedinIn />
                    </Link>
                    <Link to="https://twitter.com/ParcelOn" target='_blank' className="bg-white text-black p-2 rounded-full text-lg">
                        <FaXTwitter />
                    </Link>
                    <Link to="https://facebook.com/ParcelOn" target='_blank' className="bg-white text-blue-600 p-2 rounded-full text-lg">
                        <FaFacebookF />
                    </Link>
                    <Link to="https://youtube.com/ParcelOn" target='_blank' className="bg-white text-red-600 p-2 rounded-full text-lg">
                        <FaYoutube />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;