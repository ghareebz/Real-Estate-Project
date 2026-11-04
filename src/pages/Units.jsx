import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import unitsImage from "../assets/images/unit-image.png";
// import Counter from "./Counter";
import UnitSearch from "../components/UnitSearch";
import UnitCard from "../components/UnitCard";
import api from "../assets/utils/axios-instance";

const ranges = { "Under 1M": [0, 1000000], "1M - 3M": [1000000, 3000000], "3M - 5M": [3000000, 5000000], "5M - 10M": [5000000, 10000000], "10M+": [10000000, Infinity] };
function unpack(response) {
  const data = response.data?.data ?? response.data;
  if (!Array.isArray(data)) throw new Error("Unexpected units response");
  return data;
}
function optionsFrom(units) {
  const unique = (field) => [...new Set(units.map((unit) => unit[field]).filter(Boolean))].sort();
  return { developer: unique("developerName_en"), zone: unique("zoneName_en"), project: unique("projectName_en"), status: unique("status") };
}
export default function Units() {
  const [units, setUnits] = useState([]);
  const [filterOptions, setFilterOptions] = useState({ developer: [], zone: [], project: [], status: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastFilters, setLastFilters] = useState({});
  const requestRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    requestRef.current = controller;
    api.get("/unit", { params: { sort: "asc" }, signal: controller.signal, timeout: 20000 })
      .then((response) => {
        const data = unpack(response);
        setUnits(data);
        setFilterOptions(optionsFrom(data));
      })
      .catch(() => { if (!controller.signal.aborted) setError("Unable to load properties. Please try again."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => { controller.abort(); requestRef.current?.abort(); };
  }, []);

  async function search(filters) {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setError("");
    setLastFilters(filters);
    const params = { sort: "asc" };
    for (const [field, parameter] of Object.entries({ developer: "developerName", zone: "zoneName", project: "projectName", status: "status" })) {
      if (filters[field]) params[parameter] = filters[field];
    }
    if (filters.bedrooms && filters.bedrooms !== "5+") params.bedrooms = filters.bedrooms === "Studio" ? 0 : Number(filters.bedrooms);
    const range = ranges[filters.price];
    if (range) {
      params.minPrice = range[0];
      if (Number.isFinite(range[1])) params.maxPrice = range[1];
    }
    try {
      let data = unpack(await api.get("/unit", { params, signal: controller.signal, timeout: 20000 }));
      // Enforce exact dropdown matches and nonoverlapping price bands.
      data = data.filter((unit) =>
        (!filters.q || [unit.title_en, unit.title_ar].some((title) => String(title || "").toLocaleLowerCase().includes(filters.q.toLocaleLowerCase()))) &&
        (!filters.developer || unit.developerName_en === filters.developer) &&
        (!filters.zone || unit.zoneName_en === filters.zone) &&
        (!filters.project || unit.projectName_en === filters.project) &&
        (!filters.status || unit.status === filters.status) &&
        (filters.bedrooms !== "5+" || Number(unit.bedrooms) >= 5) &&
        (!range || (Number(unit.price) >= range[0] && Number(unit.price) < range[1]))
      );
      if (!controller.signal.aborted) {
        setUnits(data);
        if (!Object.values(filters).some(Boolean)) setFilterOptions(optionsFrom(data));
      }
    } catch {
      if (!controller.signal.aborted) setError("Unable to load properties. Please try again.");
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  return (
    <>
      {/* <Counter /> */}
      <Hero backgroundImage={unitsImage} title="Where Visionary Design Meets Daily Life" description="Experience a collection of residences designed as personal sanctuaries. Each unit balances expansive city views with artisanal textures and quiet, light-filled interiors to create the ultimate retreat from the world" showButton={false} buttonText="Explore Now" />
      <UnitSearch onSearch={search} filterOptions={filterOptions} loading={loading} />
      <section aria-label="Property results" aria-busy={loading} className="px-4 pb-24 sm:px-8">
        <div className="mx-auto max-w-[1366px]">
          <p role="status" className="mb-6 font-lato text-stone-500">{loading ? "Loading properties..." : error ? "" : `${units.length} ${units.length === 1 ? "property" : "properties"} found`}</p>
          {error ? <div role="alert" className="rounded-xl border border-red-200 p-8 text-center"><p>{error}</p><button onClick={() => search(lastFilters)} className="mt-4 rounded border border-[#8e1616] px-6 py-2 text-[#8e1616]">Try again</button></div>
            : !loading && units.length === 0 ? <p className="py-12 text-center text-stone-500">No properties match your search. Try fewer filters.</p>
            : !loading && <div className="grid grid-cols-1 justify-items-center gap-x-5 gap-y-16 md:grid-cols-2 xl:grid-cols-3 xl:gap-y-28">{units.map((unit) => <UnitCard key={unit.id} unit={unit} />)}</div>}
        </div>
      </section>
    </>
  );
}
