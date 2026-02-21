import { useEffect, useRef } from "react";
import Slider from "react-slick";
import "../../styles/slick.css";

const carouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1758691736843-90f58dce465e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzExMzg3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tagline: "Collaborate seamlessly",
    description: "Work together with your team in real-time, anywhere in the world"
  },
  {
    image: "https://images.unsplash.com/photo-1771054243997-10deea0641fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9kdWN0aXZpdHklMjB0b29sc3xlbnwxfHx8fDE3NzEwNzk0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tagline: "Boost your productivity",
    description: "Powerful tools designed to help you achieve more, faster"
  },
  {
    image: "https://images.unsplash.com/photo-1758518731027-78a22c8852ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwYWNoaWV2ZW1lbnQlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzExMDAyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tagline: "Achieve your goals",
    description: "Join thousands of successful teams transforming their workflow"
  }
];

export function SignUpCarousel() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnHover: false,
    arrows: false,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)"
  };

  return (
    <div className="h-full relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <Slider ref={sliderRef} {...settings} className="h-full">
        {carouselSlides.map((slide, index) => (
          <div key={index} className="h-screen">
            <div className="relative h-full">
              {/* Image with overlay */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.tagline}
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-pink-900/60" />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-12 pb-24">
                <div className="text-white space-y-4 max-w-md">
                  <h2 className="text-4xl font-bold">{slide.tagline}</h2>
                  <p className="text-lg text-white/90">{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      
      {/* Custom dots styling */}
      <style>{`
        .slick-dots {
          bottom: 40px;
          left: 48px;
          width: auto;
          text-align: left;
        }
        .slick-dots li {
          margin: 0 4px;
        }
        .slick-dots li button:before {
          font-size: 10px;
          color: white;
          opacity: 0.5;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1;
          color: white;
        }
      `}</style>
    </div>
  );
}
