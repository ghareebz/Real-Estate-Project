import Frame2 from "../assets/images/Frame2.png";
export default function FrameInfo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 pt-16 md:flex-row md:gap-12 lg:gap-17.5">
        <img src={Frame2} alt="frame1" className="h-auto w-full max-w-168.25 rounded-t-[60px] border-5 border-[#8E1616] md:rounded-t-[100px]" />
        <div className="flex w-full max-w-156 flex-col justify-end gap-8 md:gap-12 lg:gap-20">
            <p className="font-lato text-base leading-[150%] text-[#554E4E] sm:text-lg md:text-[24px]">
                We began with a singular, uncompromising vision: to bridge the gap between world-class architecture and the individuals who define our global culture.
                We recognized that for the discerning client, a home is rarely just a physical structure; it is a curated environment, a private gallery, and the ultimate expression of a life well-lived.
                Our journey started not in the pursuit of transactions, but in the pursuit of excellence. We set out to dismantle the traditional, high-volume real estate model in favor of a bespoke,
                'private office' approach—one where quality always supersedes quantity, and where every client is treated as the sole focus of our firm,  
                We don't just find you a home; we secure your peace of mind through a veil of absolute professional confidentiality.</p>
            <button className="flex h-11.75 w-full max-w-64.5 items-center justify-center rounded-lg bg-linear-to-r from-[#8E1616] to-[#C34B4B] text-white transition-opacity hover:opacity-90">
            View More
            </button>
        </div>
    </div>
  );
}