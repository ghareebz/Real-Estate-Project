import { useState, useRef } from 'react';
import palmHillsOffice from '../assets/images/PalmHillsOfficeNo.3.png';
import haciendaDuplex from '../assets/images/HaciendaDuplexNo.4.png';
import sawaryVilla from '../assets/images/SawaryFamillyVilla.png';

const properties = [
  { id: 1, title: '01. Palm Hills Office No.3', image: palmHillsOffice },
  { id: 2, title: '02.Hacienda Duplex No.4', image: haciendaDuplex },
  { id: 3, title: '03.Sawary Family Villa', image: sawaryVilla },
  { id: 4, title: '04. Upcoming Project', image: sawaryVilla },
];
const photosPerDot = 2;
const dotCount = Math.ceil(properties.length / photosPerDot);

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleSlideChange = (index) => {
    const container = sliderRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({
      left: maxScroll * index / Math.max(1, dotCount - 1),
      behavior: 'smooth',
    });
  };

  const handleScroll = (event) => {
    const container = event.currentTarget;
    const maxScroll = container.scrollWidth - container.clientWidth;
    setActiveIndex(maxScroll > 0
      ? Math.round(Math.max(0, Math.min(1, container.scrollLeft / maxScroll)) * (dotCount - 1))
      : 0);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' && activeIndex < dotCount - 1) {
      event.preventDefault();
      handleSlideChange(activeIndex + 1);
    }
    if (event.key === 'ArrowLeft' && activeIndex > 0) {
      event.preventDefault();
      handleSlideChange(activeIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto pt-9 px-4 font-serif">
      <div
        ref={sliderRef}
        tabIndex={0}
        role="region"
        aria-label="Property slider. Use the left and right arrow keys to change slides."
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        className="flex gap-6 overflow-hidden pb-8"
      >
        {properties.map((property) => (
          <div key={property.id} className="shrink-0 w-[85%] md:w-100">
            <div className="aspect-4/3 w-full overflow-hidden rounded-2xl mb-4 shadow-sm">
              <img
                src={property.image}
                alt={property.title}
                draggable={false}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 ml-2">
              {property.title}
            </h3>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 mt-2">
        {Array.from({ length: dotCount }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide group ${index + 1}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${activeIndex === index ? 'w-8 bg-[#9b2c2c]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}
