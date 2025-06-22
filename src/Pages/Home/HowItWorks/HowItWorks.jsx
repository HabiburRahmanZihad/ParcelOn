import BookingIcon from '../../../assets/bookingIcon.png';

const steps = [
    {
        title: 'Book Pickup & Drop',
        description: 'Schedule your pickup through our app or website. Choose the time and location that works best for you.',
    },
    {
        title: 'Cash On Delivery',
        description: 'We collect payment from your customers upon delivery, ensuring a secure transaction for all parties.',
    },
    {
        title: 'Delivery Hub Processing',
        description: 'Your package is routed through our delivery hub for quality checks, sorting, and dispatch.',
    },
    {
        title: 'Corporate & SME Services',
        description: 'Tailored logistics solutions for small businesses and enterprises, with dedicated account support.',
    },
];

const HowItWorks = () => {
    return (
        <section className="bg-gray-100 py-14 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">How it Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 border border-[#CAEB66] hover:bg-[#CAEB66] space-y-4 shadow-md hover:shadow-xl transition"
                        >
                            <img src={BookingIcon} alt={`${step.title} icon`} className="h-12 w-12 object-contain" />
                            <h3 className="text-lg font-semibold text-teal-900">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;