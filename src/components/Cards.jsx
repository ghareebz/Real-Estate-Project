import Apartment from "../assets/images/Apartment.svg";
import investment from "../assets/images/investment.svg";
import happy from "../assets/images/Happy.svg";
import award from "../assets/images/award.svg";
export default function Cards() {
return (
    <div className="grid grid-cols-1 items-center justify-items-center gap-5.5 pt-12 px-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex h-35.75 w-full max-w-81.25 flex-col items-center justify-center rounded-xl border border-gray-300 bg-white-700 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <img src={Apartment} alt="apartment" />
            <h3 className="text-black-700 text-[24px] font-semibold pt-3">48</h3>
            <p className="text-[#554E4E] text-[16px]">Properties Managed</p>
        </div>
        <div className="flex h-35.75 w-full max-w-81.25 flex-col items-center justify-center rounded-xl border border-gray-300 bg-white-700 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <img src={investment} alt="investment" />
            <h3 className="text-black-700 text-[24px] font-semibold pt-3">90M</h3>
            <p className="text-[#554E4E] text-[16px]">Total Managed Investments</p>
        </div>
        <div className="flex h-35.75 w-full max-w-81.25 flex-col items-center justify-center rounded-xl border border-gray-300 bg-white-700 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <img src={happy} alt="happy" />
            <h3 className="text-black-700 text-[24px] font-semibold pt-3">500</h3>
            <p className="text-[#554E4E] text-[16px]">Happy Clients</p>
        </div>
        <div className="flex h-35.75 w-full max-w-81.25 flex-col items-center justify-center rounded-xl border border-gray-300 bg-white-700 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <img src={award} alt="award" />
            <h3 className="text-black-700 text-[24px] font-semibold pt-3">99%</h3>
            <p className="text-[#554E4E] text-[16px]">Client Satisfaction</p>
        </div>
       
    </div>
);
}