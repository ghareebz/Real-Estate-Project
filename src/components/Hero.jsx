
import facebookIcon from "../assets/images/facebook.svg";
import xIcon from "../assets/images/x.svg";
import instagramIcon from "../assets/images/insta.svg";
import tiktokIcon from "../assets/images/tiktok.svg";

export default function Hero({
    backgroundImage ,
    title ,
    description ,
    showButton ,
    buttonText ,
}) {
return (
    <div className="relative">
        <img
        src={backgroundImage}
        alt="Hero"
        className="relative block h-[70vh] min-h-130 w-full object-cover sm:h-screen"
        />

    <div className="absolute left-6 bottom-6 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {/* Facebook */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-3 border-white">
        <img
            src={facebookIcon}
            alt="Facebook"
            className="w-4 h-4 object-contain"
        />
        </div>

        {/* X (Twitter) */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-3 border-white">
        <img
            src={xIcon}
            alt="X"
            className="w-4 h-4 object-contain"
        />
        </div>

        {/* Instagram */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-3 border-white">
            <img
            src={instagramIcon}
            alt="Instagram"
            className="w-4 h-4 object-contain"
            />
        </div>

        {/* TikTok */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-3 border-white">
            <img
            src={tiktokIcon}
            alt="TikTok"
            className="w-4 h-4 object-contain"
            />
        </div>
        </div>

    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="font-playfair max-w-142.75 text-3xl font-bold sm:text-4xl md:text-[48px]">
            {title}
        </h1>
        <p className="font-lato mt-6 max-w-200 text-sm leading-6 sm:mt-10 md:mt-12.5 md:text-base">
            {description}
        </p>

        {showButton && (
            <button className="mt-6 flex h-11.75 w-full max-w-64.5 items-center justify-center rounded-lg bg-linear-to-r from-[#8E1616] to-[#C34B4B] text-white transition-opacity hover:opacity-90 sm:mt-8">
            {buttonText}
            </button>
        )}
    </div>
    </div>
    );
}