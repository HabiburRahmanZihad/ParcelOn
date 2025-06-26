import { Link, NavLink } from "react-router";
import { GiHamburgerMenu } from 'react-icons/gi';
import Logo from "../Logo/Logo";
import { FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthContext";
import { useContext } from "react";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    console.log('user in navbar', user);


    const links = (
        <div className="flex flex-col lg:flex-row gap-2">
            <NavLink to="/services">
                {({ isActive }) => (
                    <p className={`px-4 py-2 my-1 text-[16px] hover:bg-[#CAEB66] rounded-3xl ${isActive ? 'bg-primary  text-[#606060]  font-bold' : 'text-[#606060] '}`}>Services</p>
                )}
            </NavLink>
            <NavLink to="/coverage">
                {({ isActive }) => (
                    <p className={`px-4 py-2 my-1 text-[16px] hover:bg-[#CAEB66] rounded-3xl  ${isActive ? 'bg-primary  text-[#606060]  font-bold' : 'text-[#606060] '}`}>Coverage</p>
                )}
            </NavLink>
            <NavLink to="/about-us">
                {({ isActive }) => (
                    <p className={`px-4 py-2 my-1 text-[16px] hover:bg-[#CAEB66] rounded-3xl  ${isActive ? 'bg-primary  text-[#606060]  font-bold' : 'text-[#606060] '}`}>About Us</p>
                )}
            </NavLink>
            <NavLink to="/pricing">
                {({ isActive }) => (
                    <p className={`px-4 py-2 my-1 text-[16px] hover:bg-[#CAEB66] rounded-3xl  ${isActive ? 'bg-primary  text-[#606060]  font-bold' : 'text-[#606060] '}`}>Pricing</p>
                )}
            </NavLink>
            <NavLink to="/be-a-rider">
                {({ isActive }) => (
                    <p className={`px-4 py-2 my-1 text-[16px] hover:bg-[#CAEB66] rounded-3xl  ${isActive ? 'bg-primary  text-[#606060]  font-bold' : 'text-[#606060] '}`}>Be a Rider</p>
                )}
            </NavLink>
        </div>
    );

    return (
        <div className="navbar sticky top-0 z-50 bg-transparent backdrop-blur-lg bg-opacity-80  rounded-b-2xl shadow-lg">

            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <GiHamburgerMenu size={24} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Logo></Logo>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end space-x-2">
                {user ? (
                    <NavLink to="/my-Profile">
                        {({ isActive }) => (
                            <button
                                className={`px-3 py-2 cursor-crosshair rounded-2xl  md:text-xl font-bold transition flex items-center gap-2 hover:bg-[#CAEB66]
                                    
                                    ${isActive ? 'text-black bg-[#CAEB66]' : ' text-[#606060] border-2 border-[#CAEB66] '}`}
                            >
                                Profile <FiUser size={20} />
                            </button>
                        )}
                    </NavLink>
                ) : (
                    <>
                        <NavLink to="/signin">
                            {({ isActive }) => (
                                <button
                                    className={`px-3 py-2 rounded-2xl  md:text-xl font-bold transition hover:bg-[#CAEB66] ${isActive ? 'text-black bg-[#CAEB66]' : ' text-[#606060] border border-[#DADADA]'}`}
                                >
                                    Sign In
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/signup">
                            {({ isActive }) => (
                                <button
                                    className={`hidden lg:block px-2 py-2 rounded-2xl  text-xl font-bold transition hover:bg-[#CAEB66] ${isActive ? 'text-black bg-[#CAEB66]' : ' text-[#606060] border border-[#DADADA]'}`}
                                >
                                    Sign Up
                                </button>
                            )}
                        </NavLink>
                        <Link
                            to="/signup"
                            className="hidden lg:flex w-[50px] h-[50px] rounded-full bg-black  items-center justify-center">
                            <FaArrowRight color="#CAEB66" size={24} className="-rotate-45" />
                        </Link>
                    </>
                )}
            </div>

        </div>
    );
};

export default Navbar;