import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import OurServices from "./OurServices/OurServices";

const Home = () => {
    return (
        <div className="space-y-15">
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>

            <ul>
                <li>3. Our Services</li>
                <li>4. We've helped thousands of sales teams</li>
                <li>5. Live Parcel Tracking</li>
                <li>6. Become a Merchant</li>
                <li>7. What our customers are sayings</li>
                <li>8. Frequently Asked Question (FAQ)</li>
            </ul>
        </div>
    );
};

export default Home;