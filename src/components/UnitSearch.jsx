

import { useEffect, useRef } from "react";

const filters = [
  { name: "bedrooms", label: "Bedrooms", options: ["Studio", "1", "2", "3", "4", "5+"] },
  { name: "developer", label: "Developer", options: ["Palm Hills", "Hayah Development"] },
  { name: "zone", label: "Zone", options: ["New Cairo"] },
  { name: "project", label: "Projects", options: ["Palm Hills", "Hayah City"] },
  { name: "status", label: "Status", options: ["Ready", "Under construction"] },
  { name: "price", label: "Price Range", options: ["Under 1M", "1M - 3M", "3M - 5M", "5M - 10M", "10M+"] },
];

export default function UnitSearch({ onSearch, filterOptions = {}, loading = false }) {
  const timerRef = useRef(null);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  function valuesFrom(form) {
    return Object.fromEntries(
      [...new FormData(form)].map(([key, value]) => [key, value.trim()])
    );
  }

  function handleTyping(event) {
    clearTimeout(timerRef.current);
    const values = valuesFrom(event.currentTarget.form);
    timerRef.current = setTimeout(() => onSearch(values), 300);
  }

  function handleSearch(event) {
    event.preventDefault();
    clearTimeout(timerRef.current);
    onSearch(valuesFrom(event.currentTarget));
  }

  return (
    <section aria-label="Find a property" className="bg-white px-4 pb-10 pt-16 sm:px-8 sm:pt-24 lg:pt-40 xl:pt-44">
      <form onSubmit={handleSearch} className="mx-auto w-full max-w-[1366px]">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-[#9b2929] sm:grid-cols-2 lg:flex lg:h-[83px] lg:items-center">
          <label className="relative flex min-w-0 items-center border-b border-[#9b2929] lg:w-[24%] lg:shrink-0 lg:border-b-0 lg:border-r">
            <span className="sr-only">Search Property</span>
            <input name="q" onChange={handleTyping} defaultValue="" placeholder="Search Property" className="h-20 w-full min-w-0 bg-transparent pl-5 pr-14 font-lato text-lg text-gray-800 placeholder:text-[#a3a3a3] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8e1616] lg:h-[81px] xl:text-xl" />
            <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" className="pointer-events-none absolute right-5 h-7 w-7 text-[#aaa]">
              <circle cx="13.5" cy="13.5" r="10.5" /><path d="m21.5 21.5 8 8" />
            </svg>
          </label>
          {filters.map(({ name, label, options }) => (
            <label key={name} className="relative flex min-w-0 items-center border-b border-[#9b2929] last:border-b-0 sm:odd:border-r lg:my-3 lg:flex-1 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <span className="sr-only">{label}</span>

                <select name={name} defaultValue="" className="h-16 w-full min-w-0 appearance-none bg-transparent pl-4 pr-9 font-lato text-base text-[#777] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8e1616] lg:h-[57px] xl:text-xl">
                  <option value="">{label}</option>
                  {(filterOptions[name] ?? options).map((option) => <option key={option} value={option}>{option}</option>)}
                </select>

              <svg aria-hidden="true" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute right-3 h-3 w-4 text-[#aaa]"><path d="m1 1 7 7 7-7" /></svg>
            </label>
          ))}
        </div>
        <button type="submit" disabled={loading} aria-busy={loading} className="mx-auto mt-10 flex h-[57px] w-full max-w-[415px] items-center justify-center rounded-lg bg-linear-to-r from-[#651010] to-[#853535] px-6 py-4 font-lato text-xl font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8e1616] sm:mt-14 lg:mt-[76px]">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
    </section>
  );
}
