import { motion } from "framer-motion";
import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaEnvelope,
    FaPhoneAlt,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

const team = [
    {
        name: "Rohit Ahemed",
        role: "Product Lead & UX Strategist",
        location: "Chittagong, Bangladesh",
        specialty: "User-Centered Design",
        email: "rohit@readrack.com",
        phone: "+880 1319 ******",
        image: "https://i.ibb.co/KjTSPwGY/Rohitahemed-1.jpg",
        socials: {
            facebook: "https://facebook.com/",
            instagram: "https://instagram.com/",
            twitter: "https://twitter.com/",
            youtube: "https://youtube.com/",
        },
    },
    {
        name: "Habibur Rahman Zihad",
        role: "Founder & CEO",
        location: "Chittagong, Bangladesh",
        specialty: "Leadership & Vision",
        email: "habib@readrack.com",
        phone: "+880 1329 ******",
        image: "https://i.ibb.co/7xY4NYdf/Whats-App-Image-2025-06-09-at-13-14-46-80573a92.jpg",
        socials: {
            facebook: "https://www.facebook.com/habiburrahmanzihad.zihad",
            instagram: "https://instagram.com/",
            twitter: "https://x.com/xihad_xihad",
            youtube: "https://www.youtube.com/@xihadxone",
        },
    },
    {
        name: "Saimon Uddin Imam",
        role: "Community Manager & Content Creator",
        location: "Chittagong, Bangladesh",
        specialty: "Engagement & Curation",
        email: "saimon@readrack.com",
        phone: "+880 1879 ******",
        image: "https://i.ibb.co/bRMrj8zq/Saimon-1.jpg",
        socials: {
            facebook: "https://facebook.com/",
            instagram: "https://instagram.com/",
            twitter: "https://twitter.com/",
            youtube: "https://youtube.com/",
        },
    },
];

const TeamSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h3 className="text-2xl font-bold text-[#03373D] text-center mt-16">Meet Our Team</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
                {team.map((member, index) => (
                    <motion.article
                        key={index}
                        className="group relative flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border border-[#03373D] transition-all duration-300 hover:shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.2 }}
                    >
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-[#03373D] transition-all duration-300 group-hover:w-48 group-hover:h-48">
                            <img
                                src={member.image}
                                alt={`Portrait of ${member.name}`}
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                        </div>

                        <h4 className="text-lg font-semibold text-[#03373D] mb-1">{member.name}</h4>
                        <p className="text-sm text-base-400 italic mb-4 tracking-wide">{member.role}</p>

                        <ul className="text-sm text-neutral space-y-3 w-full">
                            <li className="flex items-center space-x-2">
                                <FaMapMarkerAlt className="w-5 h-5 text-[#03373D]" />
                                <span>{member.location}</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaBriefcase className="w-5 h-5 text-[#03373D]" />
                                <span>{member.specialty}</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaEnvelope className="w-5 h-5 text-[#03373D]" />
                                <a
                                    href={`mailto:${member.email}`}
                                    className="text-base-400 hover:text-[#03373D] transition-colors"
                                >
                                    {member.email}
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaPhoneAlt className="w-5 h-5 text-[#03373D]" />
                                <span>{member.phone}</span>
                            </li>
                        </ul>

                        <div className="flex justify-center space-x-4 mt-4">
                            {member.socials.facebook && (
                                <a href={member.socials.facebook} target="_blank" className="text-[#03373D] hover:text-blue-600">
                                    <FaFacebookF />
                                </a>
                            )}
                            {member.socials.instagram && (
                                <a href={member.socials.instagram} target="_blank" className="text-[#03373D] hover:text-pink-500">
                                    <FaInstagram />
                                </a>
                            )}
                            {member.socials.twitter && (
                                <a href={member.socials.twitter} target="_blank" className="text-[#03373D] hover:text-blue-400">
                                    <FaTwitter />
                                </a>
                            )}
                            {member.socials.youtube && (
                                <a href={member.socials.youtube} target="_blank" className="text-[#03373D] hover:text-red-500">
                                    <FaYoutube />
                                </a>
                            )}
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.div>
    );
};

export default TeamSection;