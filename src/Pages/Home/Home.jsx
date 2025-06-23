import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import useIsLargeScreen from "../../hooks/useIsLargeScreen";

import Banner from "./Banner/Banner";
import Benifits from "./Benifits/Benifits";
import ClientLogosMarque from "./ClientLogosMarque/ClientLogosMarque";
import FAQ from "./FAQ/FAQ";
import HowItWorks from "./HowItWorks/HowItWorks";
import MerchantSatisfaction from "./MerchantSatisfaction/MerchantSatisfaction";
import OurServices from "./OurServices/OurServices";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
    const isLargeScreen = useIsLargeScreen();

    useEffect(() => {
        if (isLargeScreen) {
            AOS.init({
                once: true,
                offset: 100,
                duration: 1000,
                easing: "ease-in-out",
            });
        }
    }, [isLargeScreen]);

    return (
        <div className="lg:space-y-24 bg-gray-100">
            <div {...(isLargeScreen ? { 'data-aos': 'zoom-in-up' } : {})}>
                <Banner />
            </div>

            <div {...(isLargeScreen ? { 'data-aos': 'fade-right', 'data-aos-duration': '1000' } : {})}>
                <HowItWorks />
            </div>

            <div {...(isLargeScreen ? { 'data-aos': 'flip-up', 'data-aos-duration': '1000' } : {})}>
                <OurServices />
            </div>

            <div {...(isLargeScreen ? { 'data-aos': 'fade-up' } : {})}>
                <ClientLogosMarque />
            </div>

            <div {...(isLargeScreen ? { 'data-aos': 'fade-left' } : {})}>
                <Benifits />
            </div>

            <div {...(isLargeScreen ? { 'data-aos': 'zoom-in-up' } : {})}>
                <MerchantSatisfaction />
            </div>

            <div {...(isLargeScreen ? { 'data-aos': 'flip-left' } : {})}>
                <Testimonials />
            </div>

            <div {...(isLargeScreen ? { 'data-aos': 'fade-down' } : {})}>
                <FAQ />
            </div>
        </div>
    );
};

export default Home;