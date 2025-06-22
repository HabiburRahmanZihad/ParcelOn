import deliveryIcon from '../../../assets/service.png';

const services = [
    {
        title: 'Express & Standard Delivery',
        description:
            'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
    },
    {
        title: 'Nationwide Delivery',
        description:
            'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
        highlighted: true,
    },
    {
        title: 'Fulfillment Solution',
        description:
            'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
    },
    {
        title: 'Cash on Home Delivery',
        description:
            '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
    },
    {
        title: 'Corporate Service / Contract In Logistics',
        description:
            'Customized corporate services which includes warehouse and inventory management support.',
    },
    {
        title: 'Parcel Return',
        description:
            'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
    },
];

const OurServices = () => {
    return (
        <section className="bg-[#043C3B] text-white py-24 px-14 rounded-3xl">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
                <p className="text-gray-200 max-w-2xl mx-auto mb-12">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (

                        <div
                            key={index}
                            className=' rounded-2xl p-8 text-center transition duration-300 ease-in-out
                                h-[346px] flex flex-col justify-center items-center gap-4 bg-white text-[#043C3B] hover:bg-[#CAEB66]'>

                            <img
                                src={deliveryIcon}
                                alt="Service Icon"
                                className="mb-4 w-20 h-20 object-contain  rounded-full p-3"
                            />

                            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                            <p className="text-md text-[#03373D]">
                                {service.description}
                            </p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;