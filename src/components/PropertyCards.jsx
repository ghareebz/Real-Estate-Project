import PalmHills1 from "../assets/images/PalmHills1.png";
import HayahCity1 from "../assets/images/HayahCity1.png";
import PalmHillsLogo from "../assets/images/PalmHillsLogo.svg";
import HayahCityLogo from "../assets/images/HayahCityLogo.svg";

const PropertyCard = ({ image, badge, logo, title, subtitle }) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 p-3 w-full max-w-[442px]">
      {/* Image & Badge Container */}
      <div className="relative w-full aspect-[1.52] rounded-xl overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {badge && (
          <div className="absolute top-3 right-0 bg-[#9b1c22] text-white text-sm px-3 py-1 rounded-l-md font-medium shadow-md">
            {badge}
          </div>
        )}
      </div>

      {/* Developer Info */}
      <div className="flex min-h-24 items-center gap-3 px-1 py-4">
        <img 
          src={logo} 
          alt={`${title} logo`} 
          className="h-12 w-20 shrink-0 object-contain"
        />
        <div className="flex flex-col">
          <h3 className="font-lato text-gray-700 font-bold text-base leading-tight">{title}</h3>
          <span className="text-gray-500 text-xs tracking-wider">{subtitle}</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="flex min-h-9 w-full items-center justify-center border rounded-lg text-[#9b1c22] border-[#9b1c22] font-medium transition hover:bg-[#9b1c22] hover:text-white mt-auto">
        View Details
      </button>
    </div>
  );
};

export default function PropertyCards() {
  const properties = [
    {
      id: 1,
      image: PalmHills1,
      badge: "New Cairo",
      logo: PalmHillsLogo,
    },
    {
      id: 2,
      image: HayahCity1,
      badge: "New Cairo",
      logo: HayahCityLogo,
      title: "Hayah City",
      subtitle: "Hayah Development"
    },
    {
      id: 3,
      image: PalmHills1,
      badge: "New Cairo",
      logo: PalmHillsLogo,
    }
  ];

  return (
    <div className="mx-auto flex max-w-[1366px] flex-col items-center px-4 py-8 sm:px-8">
      {/* Cards Grid / Carousel Track */}
      <div className="mb-8 grid w-full grid-cols-1 justify-items-center gap-x-5 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} {...prop} />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 items-center">
        <div className="w-8 h-2.5 rounded-full bg-[#9b1c22]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 transition"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 transition"></div>
      </div>
    </div>
  );
}