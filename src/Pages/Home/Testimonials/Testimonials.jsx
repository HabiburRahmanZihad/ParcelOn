import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaArrowRight, FaArrowLeft, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import customerTop from '../../../assets/customer-top.png';

const testimonials = [
  {
    quote:
      'ParcelOn never disappoints. My packages always arrive on time and in perfect condition!',
    name: 'Ayesha Rahman',
    role: 'E-commerce Store Owner',
  },
  {
    quote:
      'We switched to ParcelOn for our business deliveries and it’s been a game-changer. Reliable and super fast.',
    name: 'Md. Fahim',
    role: 'Operations Manager',
  },
  {
    quote:
      'The simplicity of the ParcelOn tracking system makes logistics feel effortless. Highly recommended.',
    name: 'Sarah Ahmed',
    role: 'Customer Experience Lead',
  },
  {
    quote:
      'Exceptional service with top-notch security. I never worry about sensitive deliveries anymore.',
    name: 'Imran Hossain',
    role: 'Legal Consultant',
  },
  {
    quote:
      'ParcelOn’s efficiency saved us during our peak season. Truly lives up to the “On Time. Every Time.” promise.',
    name: 'Rehana Siddique',
    role: 'Supply Chain Analyst',
  },
  {
    quote:
      'I was amazed at how quickly my international shipment arrived. ParcelOn is now my go-to courier.',
    name: 'Tanvir Chowdhury',
    role: 'Freelance Photographer',
  },
  {
    quote:
      'From pickup to delivery, everything was smooth and professional. Fantastic experience with ParcelOn!',
    name: 'Lubna Karim',
    role: 'Small Business Owner',
  },
  {
    quote:
      'Their customer support team is incredibly helpful and responsive. Made the whole process stress-free.',
    name: 'Shahriar Zaman',
    role: 'Tech Startup Founder',
  },
  {
    quote:
      'I trust ParcelOn for all my high-value shipments. Their secure handling is unmatched.',
    name: 'Mahira Islam',
    role: 'Luxury Goods Retailer',
  },
  {
    quote:
      'Fast, affordable, and dependable. ParcelOn is everything a delivery service should be.',
    name: 'Jahidul Hasan',
    role: 'Logistics Coordinator',
  },
];


const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#F5F7F6] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <img
          src={customerTop}
          alt="testimonial icon"
          className="mx-auto mb-8"
          loading="lazy"
        />
        <h2 className="text-3xl md:text-4xl font-bold text-[#03373D] mb-2">
          What our customers are saying
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            slidesPerView={1.1}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.next-arrow',
              prevEl: '.prev-arrow',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
            className="!pb-14"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`transition-all duration-300 ${activeIndex === index
                      ? 'opacity-100 scale-100'
                      : 'opacity-40 scale-[0.95]'
                    } bg-white rounded-2xl p-6 md:p-8 shadow-md min-h-[280px] max-w-sm mx-auto flex flex-col justify-between`}
                >
                  <FaQuoteRight className="text-[#80CBC4] text-[26px] mb-4" />
                  <p className="text-gray-600 text-start text-sm sm:text-base">{item.quote}</p>
                  <hr className="border-dashed border-t border-gray-300 my-4" />
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-[#00332E]"></div>
                    <div className="text-left">
                      <div className="font-semibold text-[#00332E]">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom arrows */}
          <div className="absolute left-1/2 -translate-x-[160px] -bottom-1 z-10">
            <button
              className="prev-arrow bg-white border border-[#D1D5DB] p-2 rounded-full hover:bg-lime-400 transition duration-200"
              aria-label="Previous testimonial"
            >
              <FaArrowLeft className="text-[#00332E]" />
            </button>
          </div>

          <div className="absolute left-1/2 translate-x-[130px] -bottom-1 z-10">
            <button
              className="next-arrow bg-white border border-[#D1D5DB] p-2 rounded-full hover:bg-lime-400 transition duration-200"
              aria-label="Next testimonial"
            >
              <FaArrowRight className="text-[#00332E]" />
            </button>
          </div>
        </div>
      </div>

      {/* Swiper Pagination Custom Styling */}
      <style>
        {`
          .swiper-pagination-bullets {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
            gap: 8px;
          }
          .swiper-pagination-bullet {
            background: #cbd5e1;
            opacity: 1;
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            transition: background 0.3s;
          }
          .swiper-pagination-bullet-active {
            background: #80CBC4;
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;
