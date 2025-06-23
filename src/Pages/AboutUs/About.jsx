import { useState } from "react";
import { Link } from "react-router";
import TeamSection from "./TeamSection";

const tabs = ["Story", "Mission", "Success", "Team & Others"];

const content = {
    Story: `We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
    
    What began as a small local delivery operation has grown into a nationwide logistics network built on innovation, integrity, and a passion for simplifying the shipping experience. From the very first package we delivered, we knew the key to success was not just speed, but dependability and care.

    We continuously invest in technology to give our customers full visibility at every step, and we train our staff to provide exceptional support with a human touch. Each delivery is handled with the same attention to detail, whether it’s crossing a city or a country.

    As we expand our services, our story remains grounded in our founding values — trust, transparency, and tireless dedication to getting it right every time.`
    ,

    Mission: `Our mission is to redefine parcel delivery through technology, transparency, and trust. We believe that sending or receiving a package should never be a stressful experience — it should be seamless, fast, and fully trackable.

    We are committed to empowering individuals and businesses with reliable logistics solutions that prioritize speed, security, and customer satisfaction. By combining advanced routing systems, live tracking, and a responsive support team, we aim to set new standards in delivery excellence.

    Our goal is not just to deliver parcels, but to deliver peace of mind — every single time.`
    ,

    Success: `Our success is rooted in the satisfaction of our customers and the consistency of our service. With thousands of on-time deliveries completed every week, we’ve built a reputation for reliability in both urban and remote areas.

    From partnering with small businesses to supporting large-scale eCommerce operations, our platform has grown through trust, performance, and word-of-mouth. Our real-time tracking system, proactive communication, and dependable team are what keep our return rate high and complaint rate low.

    We measure success not just by numbers, but by the confidence our users have in us to handle what matters most — their packages, their timelines, and their trust.`
    ,

    "Team & Others": (
        <>
            <p className="mb-6 text-gray-700 text-base lg:text-lg leading-relaxed">
                Behind every successful delivery is a dedicated team working around the clock to ensure excellence. Our strength lies in our people — from logistics coordinators and developers to customer service and delivery experts. Get to know the individuals driving our mission forward.
            </p>
            <TeamSection />
        </>
    ),

};

const About = () => {
    const [activeTab, setActiveTab] = useState("Story");

    return (
        <div className="py-4">

            <div className=" bg-white rounded-2xl p-6 md:p-14  lg:p-24  shadow-sm">
                <h2 className="text-3xl lg:text-[56px] font-extrabold text-[#003f3f] mb-2 md:mb-4">About Us</h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-3xl">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal
                    packages to business shipments — we deliver on time, every time.
                </p>
                <hr className="border-t border-dashed border-gray-300 my-6" />

                {/* Tabs */}
                <div className="flex flex-wrap gap-6 mb-6 text-base sm:text-lg font-medium">
                    {tabs.map((tab) => (
                        <Link
                            key={tab}
                            to="#"
                            onClick={() => setActiveTab(tab)}
                            className={`${activeTab === tab
                                ? "text-green-800 font-bold"
                                : "text-gray-500"
                                } hover:text-green-700 transition-all duration-200`}
                        >
                            {tab}
                        </Link>
                    ))}
                </div>

                {/* Content */}
                <div className="space-y-6 text-gray-700 text-md lg:text-2xl leading-relaxed">
                    {typeof content[activeTab] === "string" ? (
                        <>
                            <p>{content[activeTab]}</p>
                        </>
                    ) : (
                        content[activeTab]
                    )}
                </div>

            </div>
        </div>
    );
};

export default About;