import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Link } from 'react-router';

const faqs = [
    {
        question: 'How does this posture corrector work?',
        answer:
            'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
    },
    {
        question: 'Is it suitable for all ages and body types?',
        answer:
            'Yes, posture correctors are designed to be adjustable and can fit a wide range of body types and ages.',
    },
    {
        question: 'Does it really help with back pain and posture improvement?',
        answer:
            'Absolutely! Regular use helps reduce strain on your back and encourages muscle memory for better posture.',
    },
    {
        question: 'Does it have smart features like vibration alerts?',
        answer:
            'Yes, some models include vibration reminders when you slouch to help train your posture habits.',
    },
    {
        question: 'How will I be notified when the product is back in stock?',
        answer:
            'You can sign up with your email to get instant back-in-stock notifications.',
    },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(-1); // Start with none open

    const toggleIndex = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <section className="bg-[#EFF1F0] py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#00332E] mb-3">
                    Frequently Asked Question (FAQ)
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>

                <div className="flex flex-col gap-4 text-left">
                    {faqs.map((item, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <div
                                key={index}
                                className={`rounded-lg border ${isActive ? 'border-[#1E5650] bg-[#E6F1EF]' : 'border-transparent bg-white'
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

                <div className="mt-10 flex justify-center">
                    <Link to="/more-faq">
                        <button className="bg-lime-300 hover:bg-lime-400 text-[#00332E] font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition">
                            See More FAQ's <FaArrowUpRightFromSquare />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FAQ;