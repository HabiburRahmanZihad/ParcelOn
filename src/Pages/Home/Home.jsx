import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "./Banner/Banner";
import Benifits from "./Benifits/Benifits";
import ClientLogosMarque from "./ClientLogosMarque/ClientLogosMarque";
import FAQ from "./FAQ/FAQ";
import HowItWorks from "./HowItWorks/HowItWorks";
import MerchantSatisfaction from "./MerchantSatisfaction/MerchantSatisfaction";
import OurServices from "./OurServices/OurServices";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
    useEffect(() => {
        AOS.init({
            once: true,
            offset: 80,
            duration: 10000,
            easing: "ease-in-out",
        });
    }, []);

    return (
        <div className="space-y-24 bg-gray-100">
            {/* Banner: Hero impact entrance */}
            <div data-aos="zoom-in-up" data-aos-duration="1000">
                <Banner />
            </div>

            {/* How it Works: Clean slide from left */}
            <div data-aos="fade-right" data-aos-duration="900" data-aos-delay="100">
                <HowItWorks />
            </div>

            {/* Our Services: Flip-style dynamic pop-in */}
            <div data-aos="flip-up" data-aos-duration="2000" data-aos-delay="150">
                <OurServices />
            </div>

            {/* Client Logos: Smooth upward scroll */}
            <div data-aos="fade-up" data-aos-duration="900" data-aos-delay="100">
                <ClientLogosMarque />
            </div>

            {/* Benefits: Pop from left, fast but smooth */}
            <div data-aos="fade-left" data-aos-duration="900" data-aos-delay="150">
                <Benifits />
            </div>

            {/* Merchant Satisfaction: Zoom and rise */}
            <div data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="200">
                <MerchantSatisfaction />
            </div>

            {/* Testimonials: Eye-catching flip */}
            <div data-aos="flip-left" data-aos-duration="1100" data-aos-delay="250">
                <Testimonials />
            </div>

            {/* FAQ: Clean scroll in from top */}
            <div data-aos="fade-down" data-aos-duration="900" data-aos-delay="150">
                <FAQ />
            </div>
        </div>
    );
};

export default Home;