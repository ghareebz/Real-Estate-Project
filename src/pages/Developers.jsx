import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import DevelopersImage from "../assets/images/developers-image.png";
import api from "../assets/utils/axios-instance";

function DeveloperCard({ developer, zones }) {
  const [failedCover, setFailedCover] = useState(false);
  const [failedLogo, setFailedLogo] = useState(false);
  const projects = Array.isArray(developer.projects) ? developer.projects : [];
  const name = developer.name_en || developer.name_ar || "Developer";
  const cover = projects.find((project) => project.images?.length)?.images[0] || developer.images?.[0];
  const logo = developer.logo || developer.logoUrl || developer.images?.[0];
  const locations = [...new Set(projects.map((project) => project.zone?.name_en || zones.find((zone) => zone.id === project.zoneId)?.name_en).filter(Boolean))];
  return (
    <article className="flex w-full max-w-[442px] flex-col rounded-2xl border border-[#eaeaea] bg-white p-3 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="relative aspect-[1.52] overflow-hidden rounded-xl bg-stone-100 shadow-sm">
        {typeof cover === "string" && !failedCover ? <img src={cover} alt={name + " development"} loading="lazy" onError={() => setFailedCover(true)} className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-stone-500">Image unavailable</span>}
        {locations.length > 0 && <span title={locations.join(", ")} className="absolute right-2 top-6 max-w-[85%] truncate rounded bg-[#9b1c22] px-4 py-1 font-lato text-sm text-white">{locations.join(" / ")}</span>}
      </div>
      <div className="flex min-h-24 items-center gap-3 px-1 py-4">
        {typeof logo === "string" && !failedLogo && <img src={logo} alt={name + " brand image"} loading="lazy" onError={() => setFailedLogo(true)} className="h-12 w-20 shrink-0 object-contain" />}
        <div className="min-w-0"><h2 className="font-playfair text-lg font-semibold text-[#262222]">{name}</h2><p className="mt-1 font-lato text-xs text-stone-500">{projects.length} {projects.length === 1 ? "Project" : "Projects"}</p></div>
      </div>
      <Link to={`/developers/${developer.id}`} className="mt-auto flex min-h-9 items-center justify-center rounded-lg border border-[#a41515] px-4 text-sm text-[#8e1616] transition-colors hover:bg-[#8e1616] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e1616]">View Details</Link>
    </article>
  );
}

export default function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    api.get("/developer", { signal: controller.signal, timeout: 20000 })
      .then((response) => {
        const data = response.data?.data ?? response.data;
        if (!Array.isArray(data)) throw new Error("Invalid developers response");
        if (!controller.signal.aborted) setDevelopers(data);
      })
      .catch(() => { if (!controller.signal.aborted) setError("Unable to load developers. Please try again."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    // Locations are resolved from project zone IDs; developer cards still load if this request fails.
    api.get("/zone", { signal: controller.signal, timeout: 20000 })
      .then((response) => {
        const data = response.data?.data ?? response.data;
        if (!controller.signal.aborted && Array.isArray(data)) setZones(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [retry]);
  useEffect(() => { document.title = "Developers"; }, []);

  return (
    <>
      <Hero backgroundImage={DevelopersImage} title="Defining the Future Skyline." description="Great developments require more than just capital; they require a narrative. We provide the elite marketing and specialized brokerage services needed to position your landmark projects in front of the world's most discerning buyers." showButton={false} buttonText="Explore Now" />
      <section aria-label="Our developers" aria-busy={loading} className="mx-auto max-w-[1366px] px-4 py-14 sm:px-8 sm:py-20">
        {loading ? <p role="status" className="py-12 text-center text-stone-500">Loading developers...</p>
          : error ? <div role="alert" className="py-12 text-center"><p>{error}</p><button onClick={() => { setLoading(true); setError(""); setRetry((value) => value + 1); }} className="mt-4 rounded border border-[#8e1616] px-6 py-2 text-[#8e1616]">Try again</button></div>
          : developers.length === 0 ? <p className="py-12 text-center text-stone-500">No developers available yet.</p>
          : <div className="grid grid-cols-1 justify-items-center gap-x-5 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
            {developers.map((developer) => <DeveloperCard key={developer.id} developer={developer} zones={zones} />)}
          </div>}
      </section>
    </>
  );
}
