import { FaArrowRight } from "react-icons/fa";
import EarningImg from '../../assets/tiny-deliveryman.png';
import agent1 from '../../assets/person/person1.png';
import agent2 from '../../assets/person/person2.png';
import agent3 from '../../assets/person/person3.png';
import agent4 from '../../assets/person/person4.png';
import agent5 from '../../assets/person/person5.png';
import agent6 from '../../assets/person/person6.png';
import agent7 from '../../assets/person/person7.png';
import agent8 from '../../assets/person/person8.png';

const agents = [
    { name: 'Devon Lane', city: 'Naperville', img: agent1 },
    { name: 'Jane Cooper', city: 'Fairfield', img: agent2 },
    { name: 'Savannah Nguyen', city: 'Rancho Palos', img: agent3 },
    { name: 'Darrell Steward', city: 'Orange', img: agent4 },
    { name: 'Devon Lane', city: 'Naperville', img: agent5 },
    { name: 'Jane Cooper', city: 'Fairfield', img: agent6 },
    { name: 'Savannah Nguyen', city: 'Rancho de Plas', img: agent7 },
    { name: 'Darrell Steward', city: 'Chicago', img: agent8 },
];


const BeRider = () => {
    return (
        <section className="px-4 md:px-8 lg:px-8 rounded-3xl">

            {/* How Earning Works */}
            <div className="bg-white rounded-3xl px-6 md:px-10 py-12 mb-16 shadow-sm">

                <div className="flex flex-col items-start  gap-6">

                    <img src={EarningImg} alt="Earning Icon" />

                    <div className="">
                        <h2 className="text-2xl md:text-[56px] font-bold text-[#002E2E] mb-1">
                            How Earning Works
                        </h2>
                        <p className="text-gray-600 max-w-xl">
                            Enjoy fast, reliable parcel delivery without real-time tracking and zero hassle. From personal
                            packages to business shipments — we deliver on time, every time.
                        </p>
                    </div>

                    <div className="flex items-center">
                        <button className="bg-[#C6E137] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#b0cb2f] transition text-md">
                            Be a Rider
                        </button>

                        <div className="flex w-[44px] h-[44px] rounded-full bg-black  items-center justify-center">
                            <FaArrowRight color="#CAEB66" size={24} className="-rotate-45" />
                        </div>
                    </div>

                </div>
            </div>

            {/* Our Top Agents */}
            <h3 className="text-3xl md:text-[56px] font-bold text-[#002E2E] text-center mb-10">
                Our Top Agents
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {agents.map((agent, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm  p-5 hover:shadow-md transition"
                    >
                        <img
                            src={agent.img}
                            alt={agent.name}
                            className="w-full  object-cover rounded-2xl mb-4"
                        />
                        <h4 className="font-semibold text-[#002E2E] text-lg">{agent.name}</h4>
                        <p className="text-gray-500 text-sm">{agent.city}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BeRider;
