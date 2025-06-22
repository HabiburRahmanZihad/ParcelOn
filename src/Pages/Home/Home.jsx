import Banner from "./Banner/Banner";
import Benifits from "./Benifits/Benifits";
import ClientLogosMarque from "./ClientLogosMarque/ClientLogosMarque";
import FAQ from "./FAQ/FAQ";
import HowItWorks from "./HowItWorks/HowItWorks";
import MerchantSatisfaction from "./MerchantSatisfaction/MerchantSatisfaction";
import OurServices from "./OurServices/OurServices";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="space-y-15 bg-gray-100">
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <ClientLogosMarque></ClientLogosMarque>
            <Benifits></Benifits>
            <MerchantSatisfaction></MerchantSatisfaction>
            <Testimonials></Testimonials>
            <FAQ></FAQ>

            <ul>
                <li>8. Frequently Asked Question (FAQ)</li>
            </ul>
        </div>
    );
};

export default Home;