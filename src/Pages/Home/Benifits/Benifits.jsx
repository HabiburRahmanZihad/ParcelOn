import LiveTrack from '../../../assets/live-tracking.png';
import Delivery from '../../../assets/safe-delivery.png';

const benefitsData = [
    {
        title: 'Live Parcel Tracking',
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: LiveTrack,
        alt: 'Live parcel tracking illustration',
    },
    {
        title: '100% Safe Delivery',
        description:
            'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
        image: Delivery,
        alt: 'Safe delivery icon',
    },
    {
        title: '24/7 Call Center Support',
        description:
            'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
        image: LiveTrack,
        alt: 'Customer support icon',
    },
];

const BenefitCard = ({ title, description, image, alt }) => (
    <div
        className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row items-center gap-6
        transition duration-300 transform hover:scale-[1.02] hover:shadow-lg"
    >
        <div className="flex-shrink-0 w-28 h-28">
            <img src={image} alt={alt} className="w-full h-full object-contain" />
        </div>
        <div className="py-10 md:px-10 md:py-0 border-t md:border-t-0 md:border-l border-dashed transition-colors">
            <h3 className="text-2xl font-bold text-[#03373D] group-hover:text-[#1e4f4f] transition-colors duration-300">
                {title}
            </h3>
            <p className="mt-2 text-gray-600 text-sm">{description}</p>
        </div>
    </div>
);

const Benefits = () => {
    return (
        <section className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {benefitsData.map((benefit, index) => (
                    <BenefitCard key={index} {...benefit} />
                ))}
            </div>
        </section>
    );
};

export default Benefits;