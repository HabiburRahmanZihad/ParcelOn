import { Link } from 'react-router';
import waveOverlay from '../../../assets/be-a-merchant-bg.png';
import Parcel from '../../../assets/location-merchant.png';

const MerchantSatisfaction = () => {
    return (
        <section className="max-w-7xl mx-auto bg-[#003b3f] text-white rounded-2xl px-6 py-10 md:py-14 lg:px-16 overflow-hidden relative">
            <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                {/* Left Text Content */}
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-gray-200">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-wrap gap-4">

                        <Link to='/become-merchant' className="bg-lime-400 text-black font-semibold py-2 px-6 rounded-full transition">
                            Become a Merchant
                        </Link>

                        <Link to='/earn-in-parcelOn' className="border border-lime-400 text-lime-400 hover:bg-lime-500 hover:text-black font-semibold py-2 px-6 rounded-full transition">
                            Earn with ParcelOn Courier
                        </Link>
                    </div>
                </div>

                {/* Right Image / Illustration */}
                <div className="flex justify-center md:justify-end w-full h-full">
                    <img
                        src={Parcel} // Replace this with your actual image path
                        alt="Parcel Illustration"
                        className="w-60 sm:w-72 md:w-80 lg:w-96"
                    />
                </div>
            </div>

            {/* Optional Decorative Background (wave or gradient) */}
            <div className="absolute top-0 left-0 w-full ">
                <img
                    src={waveOverlay}
                    alt="waveOverlay"
                    className="  object-cover  w-full h-full"
                />
            </div>
        </section>
    );
};

export default MerchantSatisfaction;