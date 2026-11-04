export default function Title({
  title = "Benchmarks of Success",
  titleMarginTop = "mt-30.75",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2
        className={`font-playfair ${titleMarginTop} px-4 text-center text-2xl font-semibold text-black-600 sm:text-[32px]`}
      >
        {title}
      </h2>
      <div className="mt-1 h-1.5 w-41 rounded-xs bg-[#C34B4B]" />
    </div>
  );
}