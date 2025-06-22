import Banner from "./Banner/Banner";
import Benifits from "./Benifits/Benifits";
import ClientLogosMarque from "./ClientLogosMarque/ClientLogosMarque";
import HowItWorks from "./HowItWorks/HowItWorks";
import OurServices from "./OurServices/OurServices";

const Home = () => {
    return (
        <div className="space-y-15 bg-gray-100">
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <ClientLogosMarque></ClientLogosMarque>
            <Benifits></Benifits>

            <ul>
                <li>6. Become a Merchant</li>
                <li>7. What our customers are sayings</li>
                <li>8. Frequently Asked Question (FAQ)</li>
            </ul>
        </div>
    );
};

export default Home;