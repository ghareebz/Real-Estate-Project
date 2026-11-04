import Hero from "../components/Hero";
import zonesImage from "../assets/images/zones-image.png";
import api from "../assets/utils/axios-instance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Zones() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    api.get("/zone", { signal: controller.signal, timeout: 20000 })
      .then((response) => {
        const data = response.data?.data ?? response.data;
        if (!Array.isArray(data)) throw new Error("Invalid zones response");
        if (!controller.signal.aborted) setZones(data);
      })
      .catch(() => { if (!controller.signal.aborted) setError("Unable to load zones. Please try again."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [retry]);

  return (
    <>
      <Hero backgroundImage={zonesImage} title="Destinations Defined by Distinction" description="Experience a collection of residences designed as personal sanctuaries. Each unit balances expansive city views with artisanal textures and quiet, light-filled interiors to create the ultimate retreat from the world" showButton={false} buttonText="Explore Now" />
      <section aria-label="Explore zones" aria-busy={loading} className="mx-auto max-w-[1366px] px-4 py-12 sm:px-8 sm:py-16">
        {loading ? <p role="status" className="py-12 text-center text-stone-500">Loading zones...</p>
          : error ? <div role="alert" className="py-12 text-center"><p>{error}</p><button onClick={() => { setLoading(true); setError(""); setRetry((value) => value + 1); }} className="mt-4 rounded border border-[#8e1616] px-6 py-2 text-[#8e1616]">Try again</button></div>
          : zones.length === 0 ? <p className="py-12 text-center text-stone-500">No zones available yet.</p>
          : <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {zones.map((zone) => {
              const first = zone.images?.[0];
              const image = typeof first === "string" ? first : first?.url ?? first?.image_url ?? first?.path;
              return <Link key={zone.id} to={`/zones/${zone.id}`} aria-label={`Explore ${zone.name_en || zone.name_ar}`} title={zone.name_en || zone.name_ar} className="group relative block aspect-[1.48] overflow-hidden rounded-lg bg-stone-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8e1616]">
                {image ? <img src={image} alt={zone.name_en || zone.name_ar} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" /> : <span className="flex h-full items-center justify-center text-stone-600">{zone.name_en || zone.name_ar}</span>}
              </Link>;
            })}
          </div>}
      </section>
    </>
  );
}
