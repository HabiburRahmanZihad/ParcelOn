import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

const moreFaqs = [
    {
        question: 'What services does ParcelOn offer?',
        answer: 'ParcelOn provides fast and secure delivery services including same-day, next-day, and international shipping.',
    },
    {
        question: 'How can I track my shipment?',
        answer: 'You can track your package in real-time using the ParcelOn tracking number provided via SMS or email after dispatch.',
    },
    {
        question: 'What makes ParcelOn different from other courier services?',
        answer: 'Our core values—Speed, Simplicity, and Security—set us apart. We deliver on time, every time, with full transparency.',
    },
    {
        question: 'Can I reschedule or redirect a delivery?',
        answer: 'Yes, you can reschedule or change the delivery address through your ParcelOn dashboard or mobile app.',
    },
    {
        question: 'Does ParcelOn offer bulk or business shipping solutions?',
        answer: 'Absolutely! We provide custom logistics solutions and discounts for eCommerce stores and businesses with high-volume shipping.',
    },
    {
        question: 'Is my package insured with ParcelOn?',
        answer: 'Yes, all ParcelOn deliveries include basic insurance. You can opt for additional coverage during checkout.',
    },
    {
        question: 'What areas does ParcelOn operate in?',
        answer: 'ParcelOn operates nationwide and offers international shipping to select countries. Check our service coverage page for details.',
    },
    {
        question: 'How do I contact ParcelOn support?',
        answer: 'You can reach our customer support team 24/7 through live chat, phone, or email via the support page.',
    },
    {
        question: 'What is the average delivery time?',
        answer: 'Delivery time depends on the service type. Same-day and next-day options are available, and standard shipping typically takes 2–4 business days.',
    },
    {
        question: 'How do I schedule a pickup?',
        answer: 'Log into your ParcelOn account and select “Schedule Pickup” to choose a time and date that works best for you.',
    },
    {
        question: 'Can I send fragile or perishable items?',
        answer: 'Yes, we offer packaging and handling options for fragile and temperature-sensitive items. Please refer to our guidelines before sending.',
    },
    {
        question: 'What happens if my parcel is delayed?',
        answer: 'Delays are rare, but if they occur, you’ll be notified immediately. Our support team will assist you in resolving any issues quickly.',
    },
    {
        question: 'Are there weight or size limits for parcels?',
        answer: 'ParcelOn accepts most sizes, but for anything over 30kg or unusually large dimensions, special handling may be required.',
    },
    {
        question: 'How do I create a business account?',
        answer: 'Click “Business” on our homepage and follow the steps to register. You’ll get access to volume discounts and dedicated support.',
    },
    {
        question: 'Is my data secure with ParcelOn?',
        answer: 'Absolutely. We use encrypted systems to protect your personal and shipment data. Your privacy and trust are top priorities.',
    },
];


const MoreFAQs = () => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const toggleIndex = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-[#00332E] mb-4 text-center">
                    More Frequently Asked Questions
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base text-center">
                    Learn more about ParcelOn's reliable and secure delivery service, built on our promise: On Time. Every Time.
                </p>

                <div className="flex flex-col gap-4 text-left">
                    {moreFaqs.map((item, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <div
                                key={index}
                                className={`rounded-lg border ${isActive ? 'border-[#1E5650] bg-[#F0FAF9]' : 'border-gray-200 bg-white'
                                    } transition-all duration-300`}
                            >
                                <button
                                    onClick={() => toggleIndex(index)}
                                    className="w-full flex justify-between items-center px-5 py-4 font-medium text-[#00332E] text-left"
                                >
                                    {item.question}
                                    <FaChevronDown
                                        className={`ml-4 transition-transform duration-300 ${isActive ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-40 py-4 border-t border-[#C3DFE2]' : 'max-h-0'
                                        }`}
                                >
                                    <p className="text-gray-700 text-sm sm:text-base">{item.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default MoreFAQs;