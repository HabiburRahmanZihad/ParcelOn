import { Outlet } from "react-router";
import DeliveryImg from "../assets/DeliveryImg.png";
import Logo from "../Components/Shared/Logo/Logo";

const AuthLayout = () => {

    return (
        <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-gray-50 font-inter relative">
            {/* Left Section:  */}
            <div className="absolute top-2 left-12 z-10 hidden lg:block">
                <Logo></Logo>
            </div>

            <Outlet></Outlet>



            {/* Right Section: Illustration - subtle light green background */}
            <div className="hidden lg:flex flex-1  items-center justify-center">
                <img
                    src={DeliveryImg}
                    alt="Delivery Illustration"
                    className="w-full min-h-screen object-cover"
                />
            </div>
        </div>
    );
};

export default AuthLayout;