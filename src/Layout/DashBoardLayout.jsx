import { Link, NavLink, Outlet } from "react-router";
import Logo from "../Components/Shared/Logo/Logo";

const DashBoardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            {/* Drawer Toggle for Mobile */}
            <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />

            {/* Main Content */}
            <div className="drawer-content flex flex-col bg-[#F9F9F9]">
                {/* Top Navbar for Mobile */}
                <div className="navbar lg:hidden bg-white/80 backdrop-blur-md shadow-md px-4 py-2 rounded-b-2xl">
                    <div className="flex items-center gap-3 w-full">
                        <label htmlFor="sidebar-toggle" className="btn btn-ghost btn-square">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <Logo></Logo>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
                {/* Page Content */}

            </div>

            {/* Sidebar Navigation */}
            <div className="drawer-side z-40">
                <label htmlFor="sidebar-toggle" className="drawer-overlay"></label>
                <aside className="w-64 bg-white text-[#606060] min-h-screen p-6 shadow-lg rounded-r-2xl flex flex-col">
                    <div className="mb-8">
                        <Logo />
                    </div>

                    <nav className="flex-1">
                        <ul className="menu space-y-2 text-base">

                            <li>
                                <NavLink to="/dashboard/my-parcels">
                                    {({ isActive }) => (
                                        <span
                                            className={`px-4 py-2 block rounded-3xl transition-all duration-200 ${isActive
                                                ? 'bg-[#CAEB66] text-[#3A3A3A] font-semibold shadow-sm'
                                                : 'hover:bg-[#f0f0f0] text-[#606060]'
                                                }`}
                                        >
                                            📤 My Parcels
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                            {/* Future nav items can go here */}
                        </ul>
                    </nav>
                </aside>
            </div>
        </div>
    );
};

export default DashBoardLayout;